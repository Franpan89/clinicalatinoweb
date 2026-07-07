import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PlaceholderImage from '@/components/PlaceholderImage'
import { getActivePackages, getPackageBySlug } from '@/lib/data/packages'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export async function generateStaticParams() {
  const packages = await getActivePackages()
  return packages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const pkg = await getPackageBySlug(params.slug)
  if (!pkg) {
    return { title: 'Paquete no encontrado · Clínica Latino' }
  }
  return {
    title: `${pkg.title} · Clínica Latino`,
    description: pkg.description,
  }
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  const [pkg, settings] = await Promise.all([
    getPackageBySlug(params.slug),
    getSiteSettings(),
  ])

  if (!pkg) notFound()

  const allPackages = await getActivePackages()
  const related = allPackages.filter((p) => p.slug !== pkg.slug).slice(0, 5)

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      {/* Header / Hero corto */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <Link
            href="/paquetes"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-blue font-lato text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a paquetes
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Columna 1: imagen */}
            <div className="relative">
              <PlaceholderImage
                src={pkg.image_url}
                alt={pkg.title}
                label={pkg.title}
                filename={`Configura en /admin/paquetes`}
                recommendedSize="900×1200px (vertical)"
                variant="brand"
                ratio="3/4"
                className="shadow-2xl shadow-brand-teal/10"
              />

              {pkg.price && (
                <div className="absolute -bottom-5 -right-5 bg-white p-4 pr-6 shadow-xl border border-brand-surface hidden md:block">
                  <div className="font-lato text-[10px] uppercase tracking-[0.2em] text-brand-gray font-bold">
                    Precio
                  </div>
                  <div className="font-lato text-brand-gradient text-lg font-bold">
                    {pkg.price}
                  </div>
                </div>
              )}
            </div>

            {/* Columna 2: información */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-brand-gradient" />
                <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
                  Paquete
                </span>
              </div>

              <h1
                className="font-lato font-medium text-brand-dark leading-[1.05] mb-4"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
              >
                {pkg.title}
              </h1>

              {pkg.price && (
                <div className="font-lato text-brand-gradient text-2xl font-bold mb-6">
                  {pkg.price}
                </div>
              )}

              <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed mb-8">
                {pkg.description}
              </p>

              {pkg.items.length > 0 && (
                <div className="space-y-3 mb-10">
                  {pkg.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-brand-teal flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span className="font-lato text-brand-dark/85 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2.5 bg-brand-gradient text-white font-lato font-bold px-7 py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/30 text-sm tracking-wide"
                >
                  <Calendar size={16} />
                  Agendar este paquete
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

      {/* Related packages strip */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-surface">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                Otros paquetes
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/paquetes/${p.slug}`}
                  className="group overflow-hidden relative bg-white border border-brand-surface hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col"
                >
                  <PlaceholderImage src={p.image_url} alt={p.title} ratio="4/3" />
                  <div className="p-4">
                    <div className="font-lato text-brand-dark text-sm font-bold leading-tight">
                      {p.title}
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-3 text-brand-teal transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
