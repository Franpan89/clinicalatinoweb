import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import EmergencyCTA from '@/components/EmergencyCTA'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto · Clínica Latino',
  description:
    'Agenda tu cita en Clínica Latino. Atendemos 24/7 en Cuenca, Ecuador. Teléfono +593 72 846-666. Emergencias disponibles todos los días del año.',
}

export default async function ContactoPage() {
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
              Contacto
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            Estamos aquí{' '}
            <span className="font-bold text-brand-gradient">para ayudarte</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            Agenda tu cita o consulta con nuestro equipo. Atendemos las 24 horas del día,
            los 7 días de la semana.
          </p>
        </div>
      </section>

      <Contact
        mapEmbedUrl={settings.map_embed_url}
        mapAddress={settings.map_address}
      />
      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
