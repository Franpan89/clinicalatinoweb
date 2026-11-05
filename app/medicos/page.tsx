import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Doctors from '@/components/Doctors'
import EmergencyCTA from '@/components/EmergencyCTA'
import { getActiveSpecialties } from '@/lib/data/specialties'
import { getSiteSettings } from '@/lib/data/settings'
import { getActiveDoctors } from '@/lib/data/doctors'
import { getLocale } from '@/lib/i18n/server'

export const revalidate = 60

const es = {
  metaTitle: 'Nuestros Médicos',
  metaDescription:
    'Conoce a nuestro equipo médico de especialistas. Filtra por especialidad, conoce sus credenciales, horarios y ubicaciones.',
  eyebrow: 'Directorio Médico',
  headingStart: 'Nuestros',
  headingEnd: 'Especialistas',
  intro:
    'Un equipo de profesionales altamente calificados que combinan experiencia internacional, tecnología de vanguardia y un trato humano excepcional. Encuentra al especialista que necesitas y agenda tu consulta.',
}

const en: typeof es = {
  metaTitle: 'Our Doctors',
  metaDescription:
    'Meet our team of medical specialists. Filter by specialty and explore their credentials, schedules, and locations.',
  eyebrow: 'Medical Directory',
  headingStart: 'Our',
  headingEnd: 'Specialists',
  intro:
    'A team of highly qualified professionals who combine international experience, state-of-the-art technology, and exceptional, compassionate care. Find the specialist you need and book your visit.',
}

const COPY = { es, en }

export async function generateMetadata(): Promise<Metadata> {
  const t = COPY[getLocale()]
  return {
    title: `${t.metaTitle} · Clínica Latino`,
    description: t.metaDescription,
  }
}

export default async function MedicosPage() {
  const locale = getLocale()
  const t = COPY[locale]

  const [doctors, specialties, settings] = await Promise.all([
    getActiveDoctors(locale),
    getActiveSpecialties(locale),
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
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            {t.headingStart}{' '}
            <span className="font-bold text-brand-gradient">{t.headingEnd}</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      <Doctors doctors={doctors} specialties={specialties} />
      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
