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
