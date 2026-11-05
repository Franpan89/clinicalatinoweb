'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Video, ArrowUpRight } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
import { isVideoEmbed, toEmbedUrl } from '@/lib/utils/maps'
import { useLocale } from './LocaleProvider'

type GalleryItem = {
  url: string | null
  label: string
  fallback: string
  href?: string
}

type GalleryProps = {
  videoUrl?: string | null
  items?: GalleryItem[]
}

const es = {
  eyebrow: 'Nuestras Instalaciones',
  titleLine1: 'Infraestructura',
  titleLine2: 'de Vanguardia',
  intro:
    'Espacios diseñados para la comodidad del paciente y la excelencia clínica, con equipos de última generación en cada área.',
  videoTitle: 'Video institucional Clínica Latino',
  videoPlaceholderLabel: 'Video institucional',
  videoPlaceholderFilename: 'Configura en /admin/medios',
  videoPlaceholderSize: 'MP4 1920×1080 · o YouTube embed URL',
  defaultLabels: {
    facade: 'Fachada principal',
    room: 'Habitación hospitalaria',
    surgery: 'Quirófano',
    lab: 'Laboratorio',
    imaging: 'Centro de imágenes',
  },
}

const en: typeof es = {
  eyebrow: 'Our Facilities',
  titleLine1: 'Infrastructure',
  titleLine2: 'at the Cutting Edge',
  intro:
    'Spaces designed for patient comfort and clinical excellence, with state-of-the-art equipment in every area.',
  videoTitle: 'Clínica Latino overview video',
  videoPlaceholderLabel: 'Overview video',
  videoPlaceholderFilename: 'Configure in /admin/medios',
  videoPlaceholderSize: 'MP4 1920×1080 · or YouTube embed URL',
  defaultLabels: {
    facade: 'Main building',
    room: 'Hospital room',
    surgery: 'Operating room',
    lab: 'Laboratory',
    imaging: 'Imaging center',
  },
}

const COPY = { es, en }

export default function Gallery({ videoUrl, items }: GalleryProps = {}) {
  const locale = useLocale()
  const t = COPY[locale]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const defaultItems: GalleryItem[] = [
    { url: null, fallback: '/img/fachada.jpg', label: t.defaultLabels.facade, href: '/nosotros' },
    { url: null, fallback: '/img/habitacion.jpg', label: t.defaultLabels.room, href: '/servicios/hospitalizacion' },
    { url: null, fallback: '/img/quirofano.jpg', label: t.defaultLabels.surgery, href: '/servicios/quirofano' },
    { url: null, fallback: '/img/laboratorio.jpg', label: t.defaultLabels.lab, href: '/servicios/laboratorio' },
    { url: null, fallback: '/img/imagenes.jpg', label: t.defaultLabels.imaging, href: '/servicios/centro-imagenes' },
  ]
  const galleryItems = items ?? defaultItems

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                {t.eyebrow}
              </span>
            </div>
            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1]">
              {t.titleLine1}
              <br />
              <span className="font-bold text-brand-gradient">{t.titleLine2}</span>
            </h2>
          </div>
          <p className="text-brand-gray font-lato font-normal max-w-md text-[15px] leading-relaxed lg:text-right">
            {t.intro}
          </p>
        </div>

        {/* Layout: video grande + 5 imágenes */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[200px]"
        >
          {/* Video institucional — col-span-2 row-span-2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="col-span-2 row-span-2 group relative overflow-hidden"
          >
            {videoUrl ? (
              isVideoEmbed(videoUrl) ? (
                <iframe
                  src={toEmbedUrl(videoUrl) ?? videoUrl}
                  title={t.videoTitle}
                  className="w-full h-full"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              )
            ) : (
              <div className="relative h-full">
                <PlaceholderImage
                  label={t.videoPlaceholderLabel}
                  filename={t.videoPlaceholderFilename}
                  recommendedSize={t.videoPlaceholderSize}
                  icon={Video}
                  variant="dark"
                  ratio="auto"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-2xl shadow-brand-teal/30">
                    <Play size={32} className="text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* 5 imágenes — cada una link a su servicio */}
          {galleryItems.map((item, i) => {
            const content = (
              <>
                <PlaceholderImage
                  src={item.url || item.fallback}
                  alt={item.label}
                  ratio="auto"
                  className="h-full w-full group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay con label + arrow */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between gap-2">
                  <div className="font-lato text-white text-sm font-bold leading-tight">
                    {item.label}
                  </div>
                  {item.href && (
                    <div className="w-8 h-8 bg-brand-gradient flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  )}
                </div>
              </>
            )
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.96 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
                }}
                className="group overflow-hidden relative"
              >
                {item.href ? (
                  <Link href={item.href} className="block w-full h-full cursor-pointer" aria-label={item.label}>
                    {content}
                  </Link>
                ) : (
                  <div className="block w-full h-full">{content}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
