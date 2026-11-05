'use server'

import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/

const es = {
  required: 'Por favor completa todos los campos requeridos.',
  tooLong: 'Uno de los campos excede la longitud permitida.',
  invalidEmail: 'El correo electrónico no es válido.',
  invalidPhone: 'El teléfono no es válido.',
  pastDate: 'La fecha preferida no puede estar en el pasado.',
  saveFailed: 'No se pudo procesar tu solicitud. Intenta nuevamente.',
}

const en: typeof es = {
  required: 'Please fill in all required fields.',
  tooLong: 'One of the fields exceeds the allowed length.',
  invalidEmail: 'The email address is not valid.',
  invalidPhone: 'The phone number is not valid.',
  pastDate: 'The preferred date cannot be in the past.',
  saveFailed: "We couldn't process your request. Please try again.",
}

const COPY = { es, en }

export async function submitAppointment(formData: FormData) {
  // Honeypot: campo oculto que solo un bot llenaría
  const honeypot = String(formData.get('company') ?? '').trim()
  if (honeypot) {
    // Respondemos éxito falso para no delatar el honeypot al bot
    return { success: true }
  }

  const t = COPY[getLocale()]

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const specialty = String(formData.get('specialty') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const time = String(formData.get('time') ?? '').trim()
  const notes = String(formData.get('notes') ?? '').trim()

  if (!name || !email || !phone || !specialty || !date || !time) {
    return { success: false, error: t.required }
  }

  if (name.length > 120 || specialty.length > 120 || notes.length > 1000) {
    return { success: false, error: t.tooLong }
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: t.invalidEmail }
  }

  if (!PHONE_RE.test(phone)) {
    return { success: false, error: t.invalidPhone }
  }

  const today = new Date().toISOString().split('T')[0]
  if (date < today) {
    return { success: false, error: t.pastDate }
  }

  // Cliente con anon key: la tabla appointments tiene una política RLS que
  // permite insert público (sin lectura/edición), no se necesita service role aquí.
  const supabase = createClient()

  const { error } = await supabase.from('appointments').insert({
    patient_name: name,
    patient_email: email,
    patient_phone: phone,
    specialty,
    preferred_date: date,
    preferred_time: time,
    notes: notes || null,
    status: 'pending',
  })

  if (error) {
    console.error('Supabase error:', error)
    return { success: false, error: t.saveFailed }
  }

  return { success: true }
}
