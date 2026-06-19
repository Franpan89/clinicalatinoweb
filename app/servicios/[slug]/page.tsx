import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PlaceholderImage from '@/components/PlaceholderImage'
import { SERVICES, getServiceBySlug } from '@/lib/services'
import { getSiteSettings } from '@/lib/data/settings'

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) {
    return { title: 'Servicio no encontrado · Clínica Latino' }
  }
  return {
    title: `${service.title} · Clínica Latino`,
    description: service.shortDesc,
  }
}

export default async function ServiceLandingPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const Icon = service.icon
  const settings = await getSiteSettings()
  const customImage = settings[`service_image_${service.slug}`]
  const imageSrc = customImage || service.image

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      {/* Header / Hero corto */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        {/* Decorative soft glow */}
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/#servicios"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-blue font-lato text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a servicios
          </Link>

          {/* 2 columnas: imagen | info */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Columna 1: imagen vertical */}
            <div className="relative">
              <PlaceholderImage
                src={imageSrc}
                alt={service.title}
                label={service.title}
                filename={`service_image_${service.slug} en /admin/medios`}
                recommendedSize="900×1200px (vertical)"
                variant="brand"
                ratio="3/4"
                className="shadow-2xl shadow-brand-teal/10"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white p-4 pr-6 shadow-xl border border-brand-surface flex items-center gap-3 hidden md:flex">
                <div className="w-10 h-10 bg-brand-gradient flex items-center justify-center text-white">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-lato text-[10px] uppercase tracking-[0.2em] text-brand-gray font-bold">
                    Especialidad
                  </div>
                  <div className="font-lato text-brand-dark text-sm font-bold">
                    {service.tag}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 2: información */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-brand-gradient" />
                <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
                  {service.tag}
                </span>
              </div>

              <h1
                className="font-lato font-medium text-brand-dark leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
              >
                {service.title}
              </h1>

              <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed mb-8">
                {service.longDesc}
              </p>

              {/* Highlights */}
              <div className="space-y-3 mb-10">
                {service.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-brand-teal flex-shrink-0 mt-1"
                      size={16}
                    />
                    <span className="font-lato text-brand-dark/85 leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contacto"
                  className="group inline-flex items-center gap-2.5 bg-brand-gradient text-white font-lato font-bold px-7 py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/30 text-sm tracking-wide"
                >
                  <Calendar size={16} />
                  Agendar una cita
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="tel:+59372846666"
                  className="inline-flex items-center gap-2.5 border-2 border-brand-dark/15 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-7 py-3.5 transition-all duration-300 text-sm tracking-wide"
                >
                  <Phone size={16} />
                  Llamar al 072 846-666
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services strip */}
      <section className="py-16 bg-brand-surface">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Otros servicios
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {SERVICES.filter((s) => s.slug !== service.slug)
              .slice(0, 5)
              .map((s) => {
                const SIcon = s.icon
                return (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="group p-4 bg-white border border-brand-surface hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col"
                  >
                    <div className="w-9 h-9 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-3 transition-colors">
                      <SIcon className="text-brand-teal" size={16} />
                    </div>
                    <div className="font-lato text-brand-dark text-sm font-bold leading-tight">
                      {s.title}
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-3 text-brand-teal transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                )
              })}
          </div>
        </div>
      </section>

      <Footer logoUrl={settings.logo_url} />
    </main>
  )
}
