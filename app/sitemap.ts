import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'
import { getActiveNews } from '@/lib/data/news'
import { getActivePackages } from '@/lib/data/packages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clinicalatino.med.ec'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/medicos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/servicios`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/nosotros`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/paquetes`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/noticias`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contacto`, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/servicios/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const [news, packages] = await Promise.all([getActiveNews(), getActivePackages()])

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${base}/noticias/${n.slug}`,
    lastModified: n.updated_at,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const packageRoutes: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${base}/paquetes/${p.slug}`,
    lastModified: p.updated_at,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes, ...packageRoutes]
}
