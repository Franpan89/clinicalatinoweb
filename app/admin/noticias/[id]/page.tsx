import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NewsForm from '../_components/NewsForm'

export const dynamic = 'force-dynamic'

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !news) notFound()

  return <NewsForm mode="edit" news={news} />
}
