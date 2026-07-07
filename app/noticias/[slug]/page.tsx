import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmergencyCTA from '@/components/EmergencyCTA'
import PlaceholderImage from '@/components/PlaceholderImage'
import { getActiveNews, getNewsBySlug } from '@/lib/data/news'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export async function generateStaticParams() {
  const news = await getActiveNews()
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug)
  if (!news) {
    return { title: 'Noticia no encontrada · Clínica Latino' }
  }
  return {
    title: `${news.title} · Clínica Latino`,
    description: news.excerpt,
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [news, settings] = await Promise.all([
    getNewsBySlug(params.slug),
    getSiteSettings(),
  ])

  if (!news) notFound()

  const allNews = await getActiveNews()
  const related = allNews.filter((n) => n.slug !== news.slug).slice(0, 3)

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 max-w-3xl">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-blue font-lato text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a noticias
          </Link>

          <div className="flex items-center gap-1.5 text-brand-gray font-lato text-xs mb-4">
            <Calendar size={12} />
            {formatDate(news.published_at)}
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            {news.title}
          </h1>

          <PlaceholderImage
            src={news.cover_image_url}
            alt={news.title}
            ratio="16/9"
            className="mb-10 shadow-2xl shadow-brand-teal/10"
          />

          <p className="font-lato text-brand-dark/85 text-lg leading-relaxed whitespace-pre-line">
            {news.content}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-brand-surface">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                Otras noticias
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  href={`/noticias/${n.slug}`}
                  className="group bg-white border border-brand-surface hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <PlaceholderImage
                    src={n.cover_image_url}
                    alt={n.title}
                    ratio="4/3"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-4">
                    <div className="font-lato text-brand-dark text-sm font-bold leading-tight mb-2">
                      {n.title}
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-brand-teal transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
