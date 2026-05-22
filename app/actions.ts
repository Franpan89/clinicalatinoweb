'use server'

import { createClient } from '@supabase/supabase-js'

export async function submitAppointment(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: 'Configuración de servidor incompleta.' }
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const specialty = formData.get('specialty') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const notes = formData.get('notes') as string

  if (!name || !email || !phone || !specialty || !date || !time) {
    return { success: false, error: 'Por favor completa todos los campos requeridos.' }
  }

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
