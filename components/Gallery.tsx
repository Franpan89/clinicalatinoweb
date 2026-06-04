'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, BedDouble, Stethoscope, Play, Video, Sparkles } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

/**
 * Para usar un video real:
 *   - Súbelo a YouTube/Vimeo y pega la URL embed en GALLERY_VIDEO_URL, o
 *   - Sube un MP4 a `public/img/clinica-video.mp4` y úsalo con <video>.
 *
 * Para usar imágenes reales, reemplaza cada `src={null}` con la ruta del archivo.
 */
const GALLERY_VIDEO_URL: string | null = null

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

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* ── Video principal (col-span 2) ──────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="md:col-span-2 group cursor-pointer relative overflow-hidden"
          >
            {GALLERY_VIDEO_URL ? (
              <div className="aspect-video bg-brand-dark">
                <iframe
                  src={GALLERY_VIDEO_URL}
                  title="Video institucional"
                  className="w-full h-full"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video">
                <PlaceholderImage
                  label="Video institucional"
                  filename="public/img/clinica-video.mp4"
                  recommendedSize="MP4 1920×1080 · o YouTube embed URL"
                  icon={Video}
                  variant="dark"
                  ratio="16/9"
                  className="h-full"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-2xl shadow-brand-teal/30 group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Imagen vertical: fachada ──────────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="group cursor-pointer overflow-hidden"
          >
            <PlaceholderImage
              label="Fachada principal"
              filename="public/img/fachada.jpg"
              recommendedSize="800×900px"
              icon={Building2}
              variant="brand"
              ratio="auto"
              className="h-full min-h-[280px] group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* ── Habitación ──────────────────────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="group cursor-pointer overflow-hidden"
          >
            <PlaceholderImage
              label="Habitación hospitalaria"
              filename="public/img/habitacion.jpg"
              recommendedSize="800×600px"
              icon={BedDouble}
              variant="soft"
              ratio="4/3"
              className="group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* ── Quirófano ───────────────────────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="group cursor-pointer overflow-hidden"
          >
            <PlaceholderImage
              label="Quirófano"
              filename="public/img/quirofano.jpg"
              recommendedSize="800×600px"
              icon={Stethoscope}
              variant="dark"
              ratio="4/3"
              className="group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* ── Video corto adicional ─────────────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
            }}
            className="group cursor-pointer overflow-hidden relative"
          >
            <PlaceholderImage
              label="Video operaciones"
              filename="public/img/operaciones-video.mp4"
              recommendedSize="MP4 vertical o cuadrado"
              icon={Video}
              variant="outline"
              ratio="4/3"
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-brand-teal flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play size={20} className="text-white ml-0.5" fill="currentColor" />
              </div>
            </div>
          </motion.div>
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
