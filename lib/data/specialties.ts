import { createClient } from '@/lib/supabase/server'
import { localizeSpecialty } from '@/lib/i18n/content'
import type { Locale } from '@/lib/i18n/config'
import type { Specialty } from '@/lib/types'

/** Con `locale` devuelve label/description en ese idioma (fallback a español). */
export async function getActiveSpecialties(locale?: Locale): Promise<Specialty[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('specialties')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching specialties:', error)
      return []
    }
    return locale ? (data ?? []).map((sp) => localizeSpecialty(sp, locale)) : (data ?? [])
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getAllSpecialties(): Promise<Specialty[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('specialties')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching specialties:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}
