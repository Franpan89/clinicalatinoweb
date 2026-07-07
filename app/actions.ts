'use server'

import { createClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/

export async function submitAppointment(formData: FormData) {
  // Honeypot: campo oculto que solo un bot llenaría
  const honeypot = String(formData.get('company') ?? '').trim()
  if (honeypot) {
    // Respondemos éxito falso para no delatar el honeypot al bot
    return { success: true }
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const specialty = String(formData.get('specialty') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const time = String(formData.get('time') ?? '').trim()
  const notes = String(formData.get('notes') ?? '').trim()

  if (!name || !email || !phone || !specialty || !date || !time) {
    return { success: false, error: 'Por favor completa todos los campos requeridos.' }
  }

  if (name.length > 120 || specialty.length > 120 || notes.length > 1000) {
    return { success: false, error: 'Uno de los campos excede la longitud permitida.' }
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'El correo electrónico no es válido.' }
  }

  if (!PHONE_RE.test(phone)) {
    return { success: false, error: 'El teléfono no es válido.' }
  }

  const today = new Date().toISOString().split('T')[0]
  if (date < today) {
    return { success: false, error: 'La fecha preferida no puede estar en el pasado.' }
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
    return { success: false, error: 'No se pudo procesar tu solicitud. Intenta nuevamente.' }
  }

  return { success: true }
}
