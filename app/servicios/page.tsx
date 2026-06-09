import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmergencyCTA from '@/components/EmergencyCTA'
import PlaceholderImage from '@/components/PlaceholderImage'
import { SERVICES } from '@/lib/services'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Servicios · Clínica Latino',
  description:
    'Conoce todos los servicios médicos de Clínica Latino: quirófano, neonatología, cuidados intensivos, ginecología, laboratorio, centro de imágenes y más.',
}

export default async function ServiciosPage() {
  const settings = await getSiteSettings()
  const banner = settings.services_banner_url || '/img/banner-servicios.jpg'
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
              Nuestros Servicios
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            Atención Médica{' '}
            <span className="font-bold text-brand-gradient">Integral</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            Todas las especialidades y servicios para cubrir integralmente tus necesidades
            de salud bajo un mismo techo, con tecnología de vanguardia y especialistas
            certificados.
          </p>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-white">
        <div className="container mx-auto pb-12">
          <PlaceholderImage
            src={banner}
            alt="Banner Clínica Latino — Servicios"
            ratio="4/1"
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-brand-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group h-full p-6 bg-white border border-brand-surface hover:border-brand-teal/60 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-400 flex flex-col"
              >
                <div className="w-10 h-10 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-4 transition-colors duration-300">
                  <s.icon className="text-brand-teal" size={18} />
                </div>
                <span className="font-lato text-[10px] text-brand-teal uppercase tracking-[0.2em] font-bold">
                  {s.tag}
                </span>
                <h2 className="font-lato text-brand-dark text-lg font-bold mt-1 mb-2 leading-tight">
                  {s.title}
                </h2>
                <p className="font-lato text-brand-gray text-sm leading-relaxed font-normal flex-grow">
                  {s.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Saber más</span>
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} />
    </main>
  )
}
