import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmergencyCTA from '@/components/EmergencyCTA'
import PlaceholderImage from '@/components/PlaceholderImage'
import { getActiveNews } from '@/lib/data/news'
import { getSiteSettings } from '@/lib/data/settings'
import { DATE_LOCALE, type Locale } from '@/lib/i18n/config'
import { getLocale } from '@/lib/i18n/server'

export const revalidate = 60

const es = {
  metaTitle: 'Noticias',
  metaDescription:
    'Mantente al día con las últimas noticias y novedades de Clínica Latino en Cuenca, Ecuador.',
  eyebrow: 'Actualidad',
  titleLead: 'Noticias y',
  titleAccent: 'Novedades',
  subtitle:
    'Mantente al día con lo que sucede en Clínica Latino: nuevos servicios, certificaciones y eventos.',
  empty: 'No hay noticias publicadas por el momento.',
  readMore: 'Leer más',
}

const en: typeof es = {
  metaTitle: 'News',
  metaDescription:
    'Stay up to date with the latest news and updates from Clínica Latino in Cuenca, Ecuador.',
  eyebrow: 'Latest',
  titleLead: 'News and',
  titleAccent: 'Updates',
  subtitle:
    "Stay up to date with what's happening at Clínica Latino: new services, certifications, and events.",
  empty: 'No news has been published at the moment.',
  readMore: 'Read more',
}

const COPY = { es, en }

export function generateMetadata(): Metadata {
  const t = COPY[getLocale()]
  return {
    title: `${t.metaTitle} · Clínica Latino`,
    description: t.metaDescription,
  }
}

function formatDate(dateStr: string, locale: Locale): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(DATE_LOCALE[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NoticiasPage() {
  const locale = getLocale()
  const t = COPY[locale]
  const [news, settings] = await Promise.all([getActiveNews(locale), getSiteSettings()])

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
            {t.titleLead}{' '}
            <span className="font-bold text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-brand-surface">
        <div className="container mx-auto">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-lato text-brand-gray">
                {t.empty}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n) => (
                <Link
                  key={n.slug}
                  href={`/noticias/${n.slug}`}
                  className="group h-full bg-white border border-brand-surface hover:border-brand-teal/60 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-400 flex flex-col overflow-hidden"
                >
                  <PlaceholderImage
                    src={n.cover_image_url}
                    alt={n.title}
                    ratio="4/3"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-brand-gray font-lato text-xs mb-3">
                      <Calendar size={12} />
                      {formatDate(n.published_at, locale)}
                    </div>
                    <h2 className="font-lato text-brand-dark text-lg font-bold mb-2 leading-tight">
                      {n.title}
                    </h2>
                    <p className="font-lato text-brand-gray text-sm leading-relaxed font-normal flex-grow line-clamp-3">
                      {n.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.readMore}</span>
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
