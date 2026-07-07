import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import InsuranceLogoForm from '../_components/InsuranceLogoForm'

export const dynamic = 'force-dynamic'

export default async function EditInsuranceLogoPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: logo, error } = await supabase
    .from('insurance_logos')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !logo) notFound()

  return <InsuranceLogoForm mode="edit" logo={logo} />
}
