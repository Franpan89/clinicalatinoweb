import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DoctorForm from '../_components/DoctorForm'
import { getAllSpecialties } from '@/lib/data/specialties'

export const dynamic = 'force-dynamic'

export default async function EditDoctorPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const [{ data: doctor, error }, specialties] = await Promise.all([
    supabase.from('doctors').select('*').eq('id', params.id).single(),
    getAllSpecialties(),
  ])

  if (error || !doctor) {
    notFound()
  }

  return (
    <DoctorForm
      mode="edit"
      doctor={doctor}
      specialties={specialties.filter((s) => s.active || s.slug === doctor.specialty)}
    />
  )
}
