import { createClient } from '@/lib/supabase/server'

export type SiteSettings = Record<string, string | null>

/** Lee todas las settings de la BD como un objeto plano. Resistente a env vars faltantes. */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {}
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('site_settings').select('*')
    if (error || !data) return {}
    const settings: SiteSettings = {}
    for (const row of data) {
      settings[row.key] = row.value
    }
    return settings
  } catch (e) {
    console.error('Settings fetch failed:', e)
    return {}
  }
}

