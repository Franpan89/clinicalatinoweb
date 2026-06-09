'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/services'
import PlaceholderImage from './PlaceholderImage'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services({ bannerSrc }: { bannerSrc?: string | null } = {}) {
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

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.slug} variants={item}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group h-full p-6 border border-brand-surface hover:border-brand-teal/60 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-400 cursor-pointer flex flex-col"
              >
                <div className="w-10 h-10 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-4 transition-colors duration-300">
                  <s.icon className="text-brand-teal" size={18} />
                </div>
                <span className="font-lato text-[10px] text-brand-teal uppercase tracking-[0.2em] font-bold">
                  {s.tag}
                </span>
                <h3 className="font-lato text-brand-dark text-lg font-bold mt-1 mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="font-lato text-brand-gray text-sm leading-relaxed font-normal flex-grow">
                  {s.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Saber más</span>
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
