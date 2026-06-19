'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify, formatSchedule } from '@/lib/doctors'
import type { DoctorUpdate, SpecialtyUpdate, ScheduleBlock, WeekDay } from '@/lib/types'

// ─── AUTH ─────────────────────────────────────────────
export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Auth error:', error)
    const msg = error.message?.toLowerCase() ?? ''
    if (msg.includes('email not confirmed')) {
      return {
        error:
          'El usuario existe pero no está confirmado. Ve a Supabase → Authentication → Users → tu usuario → menú "..." → "Send magic link" o márcalo como confirmado manualmente.',
      }
    }
    if (msg.includes('invalid login credentials')) {
      return {
        error:
          'Email o contraseña incorrectos. Si acabas de crear el usuario, verifica que marcaste "Auto Confirm User" y que la contraseña coincide.',
      }
    }
    if (msg.includes('user not found')) {
      return { error: 'No existe un usuario con ese email en este proyecto Supabase.' }
    }
    return { error: `Error de autenticación: ${error.message}` }
  }

  redirect('/admin')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ─── HELPERS ─────────────────────────────────────────
function parseLines(input: FormDataEntryValue | null): string[] {
  if (!input) return []
  return String(input)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function parseCommaList(input: FormDataEntryValue | null): string[] {
  if (!input) return []
  return String(input)
    .split(/[,·]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function parseScheduleBlocks(formData: FormData): ScheduleBlock[] {
  const raw = formData.get('schedule_days_json')
  if (!raw) return []
  try {
    const parsed = JSON.parse(String(raw))
    if (!Array.isArray(parsed)) return []
    const result: ScheduleBlock[] = []
    for (const item of parsed) {
      if (
        typeof item === 'object' &&
        item !== null &&
        typeof (item as { day?: unknown }).day === 'string' &&
        typeof (item as { start?: unknown }).start === 'string' &&
        typeof (item as { end?: unknown }).end === 'string'
      ) {
        const obj = item as { day: string; start: string; end: string }
        result.push({
          day: obj.day as WeekDay,
          start: obj.start,
          end: obj.end,
        })
      }
    }
    return result
  } catch {
    return []
  }
}

async function uploadPhoto(file: File, slug: string): Promise<string | null> {
  if (!file || file.size === 0) return null
  const supabase = createClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${slug}-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('doctor-photos')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  const { data } = supabase.storage.from('doctor-photos').getPublicUrl(filename)
  return data.publicUrl
}

// ─── DOCTORES ─────────────────────────────────────────
export async function createDoctor(formData: FormData) {
  const supabase = createClient()

  const full_name = String(formData.get('full_name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim() || slugify(full_name)
  const specialty = String(formData.get('specialty') ?? '').trim()
  const specialty_label = String(formData.get('specialty_label') ?? '').trim()
  const subspecialty = String(formData.get('subspecialty') ?? '').trim()
  const bio = String(formData.get('bio') ?? '').trim()
  const experience = String(formData.get('experience') ?? '').trim()
  const education = parseLines(formData.get('education'))
  const languages = parseCommaList(formData.get('languages'))
  const office_number = String(formData.get('office_number') ?? '').trim() || null
  const tower = String(formData.get('tower') ?? '').trim() || null
  const contact_phone = String(formData.get('contact_phone') ?? '').trim() || null
  const display_order = Number(formData.get('display_order') ?? 999)
  const active = formData.get('active') === 'on'
  const schedule_days = parseScheduleBlocks(formData)
  const schedule = formatSchedule(schedule_days) || String(formData.get('schedule') ?? '').trim()

  if (!full_name || !specialty || !specialty_label || !subspecialty || !bio || !experience) {
    return { error: 'Todos los campos marcados con * son obligatorios.' }
  }

  let photo_url: string | null = null
  const photoFile = formData.get('photo') as File | null
  if (photoFile && photoFile.size > 0) {
    photo_url = await uploadPhoto(photoFile, slug)
    if (!photo_url) {
      return { error: 'No se pudo subir la foto. Intenta de nuevo.' }
    }
  }

  const { error } = await supabase.from('doctors').insert({
    slug,
    full_name,
    specialty,
    specialty_label,
    subspecialty,
    bio,
    experience,
    schedule,
    schedule_days,
    education,
    languages,
    photo_url,
    office_number,
    tower,
    contact_phone,
    display_order,
    active,
  })

  if (error) {
    console.error('Insert error:', error)
    return { error: error.code === '23505' ? 'Ya existe un médico con ese slug.' : error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/doctores')
  redirect('/admin/doctores')
}

export async function updateDoctor(id: string, formData: FormData) {
  const supabase = createClient()

  const full_name = String(formData.get('full_name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  const specialty = String(formData.get('specialty') ?? '').trim()
  const specialty_label = String(formData.get('specialty_label') ?? '').trim()
  const subspecialty = String(formData.get('subspecialty') ?? '').trim()
  const bio = String(formData.get('bio') ?? '').trim()
  const experience = String(formData.get('experience') ?? '').trim()
  const education = parseLines(formData.get('education'))
  const languages = parseCommaList(formData.get('languages'))
  const office_number = String(formData.get('office_number') ?? '').trim() || null
  const tower = String(formData.get('tower') ?? '').trim() || null
  const contact_phone = String(formData.get('contact_phone') ?? '').trim() || null
  const display_order = Number(formData.get('display_order') ?? 999)
  const active = formData.get('active') === 'on'
  const schedule_days = parseScheduleBlocks(formData)
  const schedule = formatSchedule(schedule_days) || String(formData.get('schedule') ?? '').trim()

  if (!full_name || !specialty || !specialty_label || !subspecialty || !bio || !experience) {
    return { error: 'Todos los campos marcados con * son obligatorios.' }
  }

  const update: DoctorUpdate = {
    slug,
    full_name,
    specialty,
    specialty_label,
    subspecialty,
    bio,
    experience,
    schedule,
    schedule_days,
    education,
    languages,
    office_number,
    tower,
    contact_phone,
    display_order,
    active,
  }

  const photoFile = formData.get('photo') as File | null
  if (photoFile && photoFile.size > 0) {
    const url = await uploadPhoto(photoFile, slug)
    if (url) update.photo_url = url
  }

  const removePhoto = formData.get('remove_photo') === 'on'
  if (removePhoto) {
    update.photo_url = null
  }

  const { error } = await supabase.from('doctors').update(update).eq('id', id)

  if (error) {
    console.error('Update error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/doctores')
  revalidatePath(`/admin/doctores/${id}`)
  redirect('/admin/doctores')
}

export async function deleteDoctor(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('doctors').delete().eq('id', id)
  if (error) {
    console.error('Delete error:', error)
    return { error: error.message }
  }
  revalidatePath('/')
  revalidatePath('/admin/doctores')
  redirect('/admin/doctores')
}

export async function toggleDoctorActive(id: string, currentActive: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('doctors')
    .update({ active: !currentActive })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/doctores')
  return { success: true }
}

// ─── ESPECIALIDADES ────────────────────────────────────
export async function createSpecialty(formData: FormData) {
  const supabase = createClient()

  const label = String(formData.get('label') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim() || slugify(label)
  const description = String(formData.get('description') ?? '').trim()
  const icon = String(formData.get('icon') ?? 'stethoscope').trim()
  const color_class = String(formData.get('color_class') ?? 'from-slate-900 to-slate-800').trim()
  const display_order = Number(formData.get('display_order') ?? 999)
  const active = formData.get('active') === 'on'

  if (!label || !slug || !description) {
    return { error: 'Nombre, slug y descripción son obligatorios.' }
  }

  const { error } = await supabase.from('specialties').insert({
    slug,
    label,
    description,
    icon,
    color_class,
    display_order,
    active,
  })

  if (error) {
    console.error('Insert specialty error:', error)
    return { error: error.code === '23505' ? 'Ya existe una especialidad con ese slug.' : error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/especialidades')
  redirect('/admin/especialidades')
}

export async function updateSpecialty(id: string, formData: FormData) {
  const supabase = createClient()

  const label = String(formData.get('label') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const icon = String(formData.get('icon') ?? 'stethoscope').trim()
  const color_class = String(formData.get('color_class') ?? 'from-slate-900 to-slate-800').trim()
  const display_order = Number(formData.get('display_order') ?? 999)
  const active = formData.get('active') === 'on'

  if (!label || !slug || !description) {
    return { error: 'Nombre, slug y descripción son obligatorios.' }
  }

  // Si cambia el slug o el label, también actualizar los doctores que referencian esta especialidad
  const { data: oldSpec } = await supabase
    .from('specialties')
    .select('slug, label')
    .eq('id', id)
    .single()

  const update: SpecialtyUpdate = {
    slug,
    label,
    description,
    icon,
    color_class,
    display_order,
    active,
  }

  const { error } = await supabase.from('specialties').update(update).eq('id', id)

  if (error) {
    console.error('Update specialty error:', error)
    return { error: error.message }
  }

  // Cascade: actualizar referencias en doctors si cambió slug o label
  if (oldSpec && (oldSpec.slug !== slug || oldSpec.label !== label)) {
    await supabase
      .from('doctors')
      .update({ specialty: slug, specialty_label: label })
      .eq('specialty', oldSpec.slug)
  }

  revalidatePath('/')
  revalidatePath('/admin/especialidades')
  revalidatePath('/admin/doctores')
  redirect('/admin/especialidades')
}

export async function deleteSpecialty(id: string) {
  const supabase = createClient()

  // Verificar si hay doctores usando esta especialidad
  const { data: spec } = await supabase
    .from('specialties')
    .select('slug, label')
    .eq('id', id)
    .single()

  if (spec) {
    const { count } = await supabase
      .from('doctors')
      .select('*', { count: 'exact', head: true })
      .eq('specialty', spec.slug)

    if (count && count > 0) {
      return {
        error: `No se puede eliminar "${spec.label}" porque hay ${count} ${count === 1 ? 'médico asociado' : 'médicos asociados'}. Reasigna o elimina esos médicos primero.`,
      }
    }
  }

  const { error } = await supabase.from('specialties').delete().eq('id', id)
  if (error) {
    console.error('Delete specialty error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/especialidades')
  redirect('/admin/especialidades')
}

export async function toggleSpecialtyActive(id: string, currentActive: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('specialties')
    .update({ active: !currentActive })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/especialidades')
  return { success: true }
}

// ─── SITE SETTINGS ────────────────────────────────────
export async function updateSetting(key: string, value: string | null) {
  const supabase = createClient()
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )
  if (error) {
    console.error('Update setting error:', error)
    return { error: error.message }
  }
  revalidatePath('/')
  revalidatePath('/admin/configuracion')
  return { success: true }
}

// ─── MEDIA (Hero, banners, gallery, about, services) ─────────
export async function uploadSiteMedia(formData: FormData) {
  const key = String(formData.get('key') ?? '').trim()
  const file = formData.get('file') as File | null

  if (!key) return { error: 'Falta la clave de configuración.' }
  if (!file || file.size === 0) return { error: 'Selecciona un archivo.' }
  if (file.size > 50 * 1024 * 1024) return { error: 'El archivo no puede superar 50 MB.' }

  const supabase = createClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const filename = `${key.replace(/[^a-z0-9-]/gi, '-')}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('site-media')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    })

  if (uploadError) {
    console.error('Site media upload error:', uploadError)
    return { error: uploadError.message }
  }

  const { data } = supabase.storage.from('site-media').getPublicUrl(filename)

  const { error: updateError } = await supabase.from('site_settings').upsert(
    { key, value: data.publicUrl, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  )

  if (updateError) {
    console.error('Site media settings update error:', updateError)
    return { error: updateError.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/medios')
  return { success: true, url: data.publicUrl }
}

export async function setSiteMediaUrl(formData: FormData) {
  const key = String(formData.get('key') ?? '').trim()
  const url = String(formData.get('url') ?? '').trim() || null

  if (!key) return { error: 'Falta la clave de configuración.' }

  const supabase = createClient()
  const { error } = await supabase.from('site_settings').upsert(
    { key, value: url, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  )

  if (error) {
    console.error('setSiteMediaUrl error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/medios')
  return { success: true }
}

export async function clearSiteMedia(key: string) {
  const supabase = createClient()
  const { error } = await supabase.from('site_settings').upsert(
    { key, value: null, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  )

  if (error) {
    console.error('clearSiteMedia error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/medios')
  return { success: true }
}

// ─── REDES SOCIALES ───────────────────────────────────
export async function updateSocialLinks(formData: FormData) {
  const keys = [
    'social_facebook',
    'social_instagram',
    'social_tiktok',
    'social_youtube',
    'social_whatsapp',
    'social_x',
    'social_linkedin',
  ]

  const rows = keys.map((key) => {
    const raw = String(formData.get(key) ?? '').trim()
    return { key, value: raw || null, updated_at: new Date().toISOString() }
  })

  // Validación: si hay valor, debe parecer URL
  for (const r of rows) {
    if (r.value && !/^https?:\/\//i.test(r.value)) {
      return { error: `${r.key.replace('social_', '')}: la URL debe empezar con http:// o https://` }
    }
  }

  const supabase = createClient()
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })

  if (error) {
    console.error('updateSocialLinks error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/configuracion')
  return { success: true }
}

// ─── LEADS / CONTACTO ─────────────────────────────────
export async function updateLeadsEmail(formData: FormData) {
  const leads_email = String(formData.get('leads_email') ?? '').trim() || null

  // Validación básica de email
  if (leads_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leads_email)) {
    return { error: 'El formato del email no es válido.' }
  }

  const supabase = createClient()
  const { error } = await supabase.from('site_settings').upsert(
    { key: 'leads_email', value: leads_email, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  )

  if (error) {
    console.error('updateLeadsEmail error:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/configuracion')
  return { success: true }
}

export async function updateMapSettings(formData: FormData) {
  const map_embed_url = String(formData.get('map_embed_url') ?? '').trim() || null
  const map_address = String(formData.get('map_address') ?? '').trim() || null

  const supabase = createClient()
  const { error } = await supabase.from('site_settings').upsert(
    [
      { key: 'map_embed_url', value: map_embed_url, updated_at: new Date().toISOString() },
      { key: 'map_address', value: map_address, updated_at: new Date().toISOString() },
    ],
    { onConflict: 'key' }
  )

  if (error) {
    console.error('Update map settings error:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/configuracion')
  return { success: true }
}
