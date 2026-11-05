import { createClient } from '@/lib/supabase/server'
import { sortDoctorsAlphabetically } from '@/lib/doctors'
import { localizeDoctor } from '@/lib/i18n/content'
import type { Locale } from '@/lib/i18n/config'
import type { Doctor } from '@/lib/types'

/** slug de especialidad → label en inglés, solo las que ya tienen traducción cargada. */
async function getSpecialtyLabelsEn(): Promise<Record<string, string>> {
  const supabase = createClient()
  const { data } = await supabase.from('specialties').select('slug, label_en')
  const labels: Record<string, string> = {}
  for (const row of data ?? []) {
    if (row.label_en && row.label_en.trim()) labels[row.slug] = row.label_en
  }
  return labels
}

/** Médicos activos en orden alfabético por primer apellido (home y /medicos). Con `locale` devuelve los textos en ese idioma. */
export async function getActiveDoctors(locale?: Locale): Promise<Doctor[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const [{ data, error }, specialtyLabels] = await Promise.all([
      supabase
        .from('doctors')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true }),
      locale === 'en' ? getSpecialtyLabelsEn() : Promise.resolve({}),
    ])
    if (error) {
      console.error('Error fetching doctors:', error)
      return []
    }
    const doctors = locale
      ? (data ?? []).map((d) => localizeDoctor(d, locale, specialtyLabels))
      : (data ?? [])
    return sortDoctorsAlphabetically(doctors)
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}
