import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PackageForm from '../_components/PackageForm'

export const dynamic = 'force-dynamic'

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: pkg, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !pkg) notFound()

  return <PackageForm mode="edit" pkg={pkg} />
}
