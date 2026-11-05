import { createClient } from '@/lib/supabase/server'
import { localizeNews } from '@/lib/i18n/content'
import type { Locale } from '@/lib/i18n/config'
import type { News } from '@/lib/types'

/** Con `locale` devuelve título/extracto/contenido en ese idioma (fallback a español). */
export async function getActiveNews(locale?: Locale): Promise<News[]> {
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
    return locale ? (data ?? []).map((n) => localizeNews(n, locale)) : (data ?? [])
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

export async function getNewsBySlug(slug: string, locale?: Locale): Promise<News | null> {
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
    return locale ? localizeNews(data, locale) : data
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return null
  }
}
