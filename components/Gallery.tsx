'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, BedDouble, Stethoscope, FlaskConical, ScanLine, Sparkles } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

const items = [
  {
    label: 'Fachada principal',
    filename: 'fachada.jpg',
    size: '1600×900',
    icon: Building2,
    span: 'md:col-span-2 md:row-span-2',
    ratio: '4/3',
    variant: 'brand' as const,
  },
  {
    label: 'Habitación hospitalaria',
    filename: 'habitacion.jpg',
    size: '800×600',
    icon: BedDouble,
    span: '',
    ratio: '4/3',
    variant: 'soft' as const,
  },
  {
    label: 'Quirófano',
    filename: 'quirofano.jpg',
    size: '800×600',
    icon: Stethoscope,
    span: '',
    ratio: '4/3',
    variant: 'dark' as const,
  },
  {
    label: 'Centro de imágenes',
    filename: 'imagenes.jpg',
    size: '800×600',
    icon: ScanLine,
    span: '',
    ratio: '4/3',
    variant: 'soft' as const,
  },
  {
    label: 'Laboratorio',
    filename: 'laboratorio.jpg',
    size: '800×600',
    icon: FlaskConical,
    span: '',
    ratio: '4/3',
    variant: 'outline' as const,
  },
]

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
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
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[180px]"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
              }}
              className={`${item.span} group cursor-pointer overflow-hidden`}
            >
              <PlaceholderImage
                label={item.label}
                filename={item.filename}
                recommendedSize={item.size}
                icon={item.icon}
                variant={item.variant}
                ratio={item.ratio}
                className="h-full w-full group-hover:scale-105 transition-transform duration-700"
              />
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
