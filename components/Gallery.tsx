'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Video, Sparkles } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

/**
 * Para usar un video real:
 *   - Pega la URL embed de YouTube/Vimeo en GALLERY_VIDEO_URL
 *   - O sube un MP4 a `public/img/clinica-video.mp4` y cambia la lógica al <video> tag
 */
const GALLERY_VIDEO_URL: string | null = null

const items = [
  { src: '/img/fachada.jpg', label: 'Fachada principal', alt: 'Fachada de Clínica Latino' },
  { src: '/img/habitacion.jpg', label: 'Habitación hospitalaria', alt: 'Habitación' },
  { src: '/img/quirofano.jpg', label: 'Quirófano', alt: 'Sala de quirófano' },
  { src: '/img/laboratorio.jpg', label: 'Laboratorio', alt: 'Laboratorio clínico' },
  { src: '/img/imagenes.jpg', label: 'Centro de imágenes', alt: 'Centro de imágenes diagnósticas' },
]

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-24 bg-white">
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
            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-light leading-[1.1]">
              Infraestructura
              <br />
              <span className="font-bold text-brand-gradient">de Vanguardia</span>
            </h2>
          </div>
          <p className="text-brand-gray font-lato font-light max-w-md text-[15px] leading-relaxed lg:text-right">
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
          {/* Video institucional — grande (col-span-2 row-span-2) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="col-span-2 row-span-2 group cursor-pointer relative overflow-hidden"
          >
            {GALLERY_VIDEO_URL ? (
              <iframe
                src={GALLERY_VIDEO_URL}
                title="Video institucional Clínica Latino"
                className="w-full h-full"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative h-full">
                <PlaceholderImage
                  label="Video institucional"
                  filename="public/img/clinica-video.mp4"
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
              </div>
            )}
          </motion.div>

          {/* 5 imágenes */}
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
              }}
              className="group cursor-pointer overflow-hidden relative"
            >
              <PlaceholderImage
                src={item.src}
                alt={item.alt}
                ratio="auto"
                className="h-full w-full group-hover:scale-105 transition-transform duration-700"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/85 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="font-lato text-white text-sm font-bold">{item.label}</div>
              </div>
            </motion.div>
          ))}
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
