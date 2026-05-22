import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Stats from '@/components/Stats'
import Specialties from '@/components/Specialties'
import Doctors from '@/components/Doctors'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import EmergencyCTA from '@/components/EmergencyCTA'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { getActiveSpecialties } from '@/lib/data/specialties'
import type { Doctor } from '@/lib/types'

export const revalidate = 60

async function getDoctors(): Promise<Doctor[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching doctors:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export default async function Home() {
  const [doctors, specialties] = await Promise.all([getDoctors(), getActiveSpecialties()])

  return (
    <main>
      <Navigation />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Gallery />
      <Stats />
      <Specialties specialties={specialties} />
      <Doctors doctors={doctors} specialties={specialties} />
      <Testimonials />
      <Contact />
      <EmergencyCTA />
      <Footer />
    </main>
  )
}
