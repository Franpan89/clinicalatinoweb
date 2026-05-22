import DoctorForm from '../_components/DoctorForm'
import { getAllSpecialties } from '@/lib/data/specialties'

export const dynamic = 'force-dynamic'

export default async function NewDoctorPage() {
  const specialties = await getAllSpecialties()
  return <DoctorForm mode="create" specialties={specialties.filter((s) => s.active)} />
}
