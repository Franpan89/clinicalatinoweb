import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import EmergencyCTA from '@/components/EmergencyCTA'
import { getSiteSettings } from '@/lib/data/settings'
import { getLocale } from '@/lib/i18n/server'

export const revalidate = 60

const es = {
  metaTitle: 'Contacto',
  metaDescription:
    'Agenda tu cita en Clínica Latino. Atendemos 24/7 en Cuenca, Ecuador. Teléfono +593 72 846-666. Emergencias disponibles todos los días del año.',
  eyebrow: 'Contacto',
  headingStart: 'Estamos aquí',
  headingEnd: 'para ayudarte',
  intro:
    'Agenda tu cita o consulta con nuestro equipo. Atendemos las 24 horas del día, los 7 días de la semana.',
}

const en: typeof es = {
  metaTitle: 'Contact',
  metaDescription:
    'Book your appointment at Clínica Latino. We are open 24/7 in Cuenca, Ecuador. Phone +593 72 846-666. Emergency care available every day of the year.',
  eyebrow: 'Contact',
  headingStart: "We're here",
  headingEnd: 'to help',
  intro:
    "Book an appointment or reach out to our team. We're open 24 hours a day, 7 days a week.",
}

const COPY = { es, en }

export async function generateMetadata(): Promise<Metadata> {
  const t = COPY[getLocale()]
  return {
    title: `${t.metaTitle} · Clínica Latino`,
    description: t.metaDescription,
  }
}

export default async function ContactoPage() {
  const t = COPY[getLocale()]
  const settings = await getSiteSettings()

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      {/* Page header */}
      <section className="pt-32 pb-8 bg-white relative overflow-hidden">
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

      <Contact
        mapEmbedUrl={settings.map_embed_url}
        mapAddress={settings.map_address}
        socials={settings}
      />
      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
