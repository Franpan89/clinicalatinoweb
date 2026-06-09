'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Video, Sparkles, ArrowUpRight } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
import { isVideoEmbed } from '@/lib/utils/maps'

type GalleryItem = {
  url: string | null
  label: string
  fallback: string
  href?: string
}

type GalleryProps = {
  videoUrl?: string | null
  videoHref?: string
  items?: GalleryItem[]
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { url: null, fallback: '/img/fachada.jpg', label: 'Fachada principal', href: '/nosotros' },
  { url: null, fallback: '/img/habitacion.jpg', label: 'Habitación hospitalaria', href: '/servicios/hospitalizacion' },
  { url: null, fallback: '/img/quirofano.jpg', label: 'Quirófano', href: '/servicios/quirofano' },
  { url: null, fallback: '/img/laboratorio.jpg', label: 'Laboratorio', href: '/servicios/laboratorio' },
  { url: null, fallback: '/img/imagenes.jpg', label: 'Centro de imágenes', href: '/servicios/centro-imagenes' },
]

export default function Gallery({ videoUrl, videoHref = '/nosotros', items }: GalleryProps = {}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const galleryItems = items ?? DEFAULT_ITEMS

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                Nuestras Instalaciones
              </span>
            </div>
            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1]">
              Infraestructura
              <br />
              <span className="font-bold text-brand-gradient">de Vanguardia</span>
            </h2>
          </div>
          <p className="text-brand-gray font-lato font-normal max-w-md text-[15px] leading-relaxed lg:text-right">
            Espacios diseñados para la comodidad del paciente y la excelencia clínica,
            con equipos de última generación en cada área.
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
                  src={videoUrl}
                  title="Video institucional Clínica Latino"
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
              <Link href={videoHref} className="block relative h-full cursor-pointer">
                <PlaceholderImage
                  label="Video institucional"
                  filename="Configura en /admin/medios"
                  recommendedSize="MP4 1920×1080 · o YouTube embed URL"
                  icon={Video}
                  variant="dark"
                  ratio="auto"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-2xl shadow-brand-teal/30 group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </Link>
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

        <div className="mt-10 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-dark font-lato text-sm font-bold tracking-wider uppercase underline underline-offset-4 transition-colors"
          >
            Agenda una visita guiada
            <Sparkles size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
