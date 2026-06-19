import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Doctors from '@/components/Doctors'
import EmergencyCTA from '@/components/EmergencyCTA'
import { createClient } from '@/lib/supabase/server'
import { getActiveSpecialties } from '@/lib/data/specialties'
import { getSiteSettings } from '@/lib/data/settings'
import type { Doctor } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Nuestros Médicos · Clínica Latino',
  description:
    'Conoce a nuestro equipo médico de especialistas. Filtra por especialidad, conoce sus credenciales, horarios y ubicaciones.',
}

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

export default async function MedicosPage() {
  const [doctors, specialties, settings] = await Promise.all([
    getDoctors(),
    getActiveSpecialties(),
    getSiteSettings(),
  ])

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      {/* Page header */}
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
              Directorio Médico
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            Nuestros{' '}
            <span className="font-bold text-brand-gradient">Especialistas</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            Un equipo de profesionales altamente calificados que combinan experiencia
            internacional, tecnología de vanguardia y un trato humano excepcional.
            Encuentra al especialista que necesitas y agenda tu consulta.
          </p>
        </div>
      </section>

      <Doctors doctors={doctors} specialties={specialties} />
      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
