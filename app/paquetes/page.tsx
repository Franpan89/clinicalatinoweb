import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmergencyCTA from '@/components/EmergencyCTA'
import PlaceholderImage from '@/components/PlaceholderImage'
import { getActivePackages } from '@/lib/data/packages'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Paquetes · Clínica Latino',
  description:
    'Conoce los paquetes y promociones de salud de Clínica Latino en Cuenca, Ecuador.',
}

export default async function PaquetesPage() {
  const [packages, settings] = await Promise.all([getActivePackages(), getSiteSettings()])

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
              Paquetes de Salud
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            Paquetes y{' '}
            <span className="font-bold text-brand-gradient">Promociones</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            Combos diseñados para cuidar tu salud de forma integral, con la calidad y
            calidez de siempre.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-brand-surface">
        <div className="container mx-auto">
          {packages.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-lato text-brand-gray">
                No hay paquetes disponibles por el momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/paquetes/${p.slug}`}
                  className="group h-full bg-white border border-brand-surface hover:border-brand-teal/60 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-400 flex flex-col overflow-hidden"
                >
                  <PlaceholderImage
                    src={p.image_url}
                    alt={p.title}
                    ratio="4/3"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    {p.price && (
                      <span className="inline-block self-start font-lato text-xs text-white bg-brand-gradient font-bold px-3 py-1 mb-3">
                        {p.price}
                      </span>
                    )}
                    <h2 className="font-lato text-brand-dark text-lg font-bold mb-2 leading-tight">
                      {p.title}
                    </h2>
                    <p className="font-lato text-brand-gray text-sm leading-relaxed font-normal flex-grow line-clamp-3">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Ver detalles</span>
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
