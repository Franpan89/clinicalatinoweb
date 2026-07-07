import { createClient } from '@/lib/supabase/server'
import type { News } from '@/lib/types'

export async function getActiveNews(): Promise<News[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('active', true)
      .order('published_at', { ascending: false })
    if (error) {
      console.error('Error fetching news:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getAllNews(): Promise<News[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
    if (error) {
      console.error('Error fetching news:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()
    if (error || !data) return null
    return data
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return null
  }
}
