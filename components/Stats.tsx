'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'

function AnimatedNumber({
  target,
  suffix = '',
  duration = 2200,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [value, setValue] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    startRef.current = null

    const animate = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

const stats = [
  {
    target: 69,
    suffix: '',
    label: 'Años',
    sublabel: 'de Experiencia',
    desc: 'Desde 1957 cuidando la salud de la comunidad cuencana con dedicación y excelencia.',
  },
  {
    target: 40,
    suffix: '+',
    label: 'Especialidades',
    sublabel: 'Médicas',
    desc: 'Cobertura completa de las principales ramas de la medicina moderna.',
  },
  {
    target: 24,
    suffix: 'h',
    label: 'Atención',
    sublabel: 'Sin Interrupciones',
    desc: 'Emergencias y urgencias atendidas en todo momento, sin excepción.',
  },
  {
    target: 100,
    suffix: '%',
    label: 'Compromiso',
    sublabel: 'con tu Salud',
    desc: 'Cada paciente recibe atención personalizada y tecnología de última generación.',
  },
]

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.035]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="stat-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stat-dots)" />
        </svg>
      </div>

      {/* Decorative arcs */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="400" cy="400" r="200" fill="none" stroke="#C8974F" strokeWidth="1" />
          <circle cx="400" cy="400" r="140" fill="none" stroke="#C8974F" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold font-lato text-xs font-semibold tracking-[0.3em] uppercase">
              En Números
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-lato text-white text-4xl lg:text-5xl font-semibold">
            La Confianza de Miles de Familias
          </h2>
        </div>

        {/* Stats grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-8 py-10 border-b border-white/10 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="font-lato text-gold leading-none mb-1" style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}>
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="font-lato text-white font-semibold uppercase tracking-widest text-xs mb-0.5">
                {stat.label}
              </div>
              <div className="font-lato text-white/40 text-xs uppercase tracking-wider mb-5">
                {stat.sublabel}
              </div>
              <div className="font-lato text-white/35 text-sm leading-relaxed max-w-[200px] mx-auto">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
