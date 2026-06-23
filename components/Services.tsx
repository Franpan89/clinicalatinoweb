'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/lib/services'
import PlaceholderImage from './PlaceholderImage'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

type ServiceImages = Record<string, string | null | undefined>

export default function Services({
  bannerSrc,
  serviceImages = {},
}: {
  bannerSrc?: string | null
  serviceImages?: ServiceImages
} = {}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const banner = bannerSrc || '/img/banner-servicios.jpg'

  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="container mx-auto">
        {/* Banner */}
        <div className="mb-12">
          <PlaceholderImage
            src={banner}
            alt="Banner Clínica Latino — Servicios"
            ratio="4/1"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Nuestros Servicios
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-5xl font-normal mb-4">
            Atención Médica Integral
          </h2>
          <p className="text-brand-gray font-lato font-normal max-w-lg mx-auto leading-relaxed text-[15px]">
            Todas las especialidades y servicios para cubrir integralmente tus necesidades
            de salud bajo un mismo techo.
          </p>
        </div>

        {/* Grid de imágenes */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {SERVICES.map((s) => {
            const customImg = serviceImages[`service_image_${s.slug}`]
            const imgSrc = customImg || s.image

            return (
              <motion.div key={s.slug} variants={item}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group relative block overflow-hidden aspect-[3/4]"
                >
                  {/* Imagen */}
                  {imgSrc && !imgSrc.startsWith('/img/servicios/') ? (
                    <img
                      src={imgSrc}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage
                      src={imgSrc}
                      alt={s.title}
                      ratio="auto"
                      className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
                      label={s.title}
                      filename={`service_image_${s.slug} en /admin/medios`}
                      recommendedSize="900×1200px"
                      variant="brand"
                    />
                  )}

                  {/* Gradiente permanente inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent" />

                  {/* Texto */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-lato text-[10px] text-brand-teal uppercase tracking-[0.25em] font-bold mb-1">
                      {s.tag}
                    </div>
                    <h3 className="font-lato text-white text-base font-bold leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-brand-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-1 group-hover:translate-x-0">
                    <ArrowUpRight size={15} className="text-white" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
