'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Building2 } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

const values = [
  'Tecnología médica de última generación',
  'Staff de especialistas altamente calificados',
  'Atención humanista y personalizada',
  'Infraestructura moderna y confortable',
  'Protocolos internacionales de calidad',
  'Compromiso con la vida y la salud',
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <PlaceholderImage
              label="Equipo médico"
              filename="equipo-clinica.jpg"
              recommendedSize="1200×900px"
              icon={Building2}
              variant="brand"
              ratio="4/3"
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white p-7 shadow-2xl border border-brand-surface"
            >
              <div className="font-lato text-brand-gradient text-5xl font-light leading-none">
                35
              </div>
              <div className="font-lato text-brand-gray text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">
                Años de Experiencia
              </div>
            </motion.div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                Quiénes Somos
              </span>
            </div>

            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
              Comprometidos con tu{' '}
              <span className="font-bold text-brand-gradient">Salud y Bienestar</span>
            </h2>

            <p className="font-lato text-brand-gray leading-relaxed mb-5 text-[15px] font-light">
              Clínica Latino es un centro médico privado de referencia en Cuenca, Ecuador.
              Desde nuestra fundación en 1990, hemos combinado la calidez humana con la
              innovación tecnológica para brindar servicios de salud de excelencia a toda
              la comunidad.
            </p>

            <p className="font-lato text-brand-gray leading-relaxed mb-9 text-[15px] font-light">
              Nuestro equipo de médicos especialistas trabaja bajo los más altos estándares
              internacionales de calidad, utilizando tecnología de vanguardia para garantizar
              diagnósticos precisos y tratamientos efectivos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-teal flex-shrink-0 mt-0.5" size={15} />
                  <span className="font-lato text-sm text-brand-dark/80">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center bg-brand-gradient text-white font-lato font-bold px-7 py-3.5 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
              >
                Ver Nuestros Servicios
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center border border-brand-dark/30 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-7 py-3.5 text-sm tracking-wide transition-colors"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
