'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Heart, Baby, Stethoscope, Scissors, Sparkles, Dna,
  Activity, Brain, Eye, Bone, Pill, Microscope,
  ArrowUpRight, type LucideIcon,
} from 'lucide-react'
import type { Specialty } from '@/lib/types'

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  baby: Baby,
  stethoscope: Stethoscope,
  scissors: Scissors,
  sparkles: Sparkles,
  dna: Dna,
  activity: Activity,
  brain: Brain,
  eye: Eye,
  bone: Bone,
  pill: Pill,
  microscope: Microscope,
}

export default function Specialties({ specialties }: { specialties: Specialty[] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const handleSpecialtyClick = (slug: string) => {
    window.dispatchEvent(new CustomEvent('filter-doctors', { detail: slug }))
    requestAnimationFrame(() => {
      const target = document.getElementById('medicos')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (specialties.length === 0) {
    return null
  }

  return (
    <section id="especialidades" className="py-24 bg-cream">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                Especialidades
              </span>
            </div>
            <h2 className="font-lato text-brand-dark text-5xl font-normal leading-[1.1]">
              Médicos Especialistas
              <br />a Tu Servicio
            </h2>
          </div>
          <p className="text-brand-gray font-lato font-normal max-w-sm leading-relaxed lg:text-right text-[15px]">
            Selecciona una especialidad para ver el listado completo de médicos
            disponibles, sus credenciales y horarios de atención.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {specialties.map((spec, i) => {
            const Icon = ICON_MAP[spec.icon] ?? Stethoscope
            return (
              <motion.button
                key={spec.id}
                type="button"
                onClick={() => handleSpecialtyClick(spec.slug)}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative p-8 bg-gradient-to-br ${spec.color_class} overflow-hidden cursor-pointer text-left hover:-translate-y-1 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-cream`}
              >
                <div className="absolute -top-4 -right-4 opacity-[0.06] pointer-events-none">
                  <Icon size={130} className="text-white" />
                </div>

                <div className="absolute top-5 right-5 w-9 h-9 border border-white/30 group-hover:border-brand-teal group-hover:bg-brand-teal/10 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight
                    size={16}
                    className="text-brand-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <Icon className="text-brand-teal mb-3 relative z-10" size={26} />
                <h3 className="font-lato text-white text-2xl font-bold mb-2 relative z-10">
                  {spec.label}
                </h3>
                <p className="font-lato text-white/60 text-sm leading-relaxed relative z-10 font-normal">
                  {spec.description}
                </p>

                <div className="mt-7 flex items-center gap-2 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider relative z-10">
                  <span>Ver médicos</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 bg-brand-teal/60 w-0 group-hover:w-full transition-all duration-500" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
