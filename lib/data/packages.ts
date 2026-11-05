import { createClient } from '@/lib/supabase/server'
import { localizePackage } from '@/lib/i18n/content'
import type { Locale } from '@/lib/i18n/config'
import type { PackageItem } from '@/lib/types'

/** Con `locale` devuelve título/descripción/precio/incluye en ese idioma (fallback a español). */
export async function getActivePackages(locale?: Locale): Promise<PackageItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching packages:', error)
      return []
    }
    return locale ? (data ?? []).map((p) => localizePackage(p, locale)) : (data ?? [])
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getAllPackages(): Promise<PackageItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching packages:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getPackageBySlug(slug: string, locale?: Locale): Promise<PackageItem | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()
    if (error || !data) return null
    return locale ? localizePackage(data, locale) : data
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return null
  }
}
