import { createClient } from '@/lib/supabase/server'
import type { InsuranceLogo } from '@/lib/types'

export async function getActiveInsuranceLogos(): Promise<InsuranceLogo[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('insurance_logos')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching insurance logos:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export async function getAllInsuranceLogos(): Promise<InsuranceLogo[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('insurance_logos')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching insurance logos:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}
