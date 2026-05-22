import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SpecialtyForm from '../_components/SpecialtyForm'

export const dynamic = 'force-dynamic'

export default async function EditSpecialtyPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: specialty, error } = await supabase
    .from('specialties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !specialty) notFound()

  return <SpecialtyForm mode="edit" specialty={specialty} />
}
