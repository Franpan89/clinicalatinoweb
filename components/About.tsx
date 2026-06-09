'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Building2 } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
import { inferMediaType, isVideoEmbed } from '@/lib/utils/maps'

const values = [
  'Pioneros en cirugía laparoscópica desde 1991',
  'Primera clínica del austro ecuatoriano',
  'Tecnología endoscópica de vanguardia',
  'Equipo de especialistas de excelencia',
  'Atención humanista y personalizada',
  'Innovación constante con calidez médica',
]

export default function About({
  mediaUrl,
}: {
  mediaUrl?: string | null
} = {}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const mediaType = inferMediaType(mediaUrl)

  return (
    <section id="nosotros" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Media — imagen o video */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {mediaUrl && mediaType === 'video' ? (
              <div className="aspect-[4/3] bg-brand-dark overflow-hidden">
                {isVideoEmbed(mediaUrl) ? (
                  <iframe
                    src={mediaUrl}
                    title="Clínica Latino"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={mediaUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            ) : (
              <PlaceholderImage
                src={mediaUrl || '/img/equipo-clinica.jpg'}
                alt="Equipo médico de Clínica Latino"
                ratio="4/3"
              />
            )}

            {/* Floating badge — 69 años */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white p-7 shadow-2xl border border-brand-surface"
            >
              <div className="font-lato text-brand-gradient text-5xl font-normal leading-none">
                69
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

            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1] mb-6">
              <span className="font-bold text-brand-gradient">69 años</span> de Experiencia
              <br />en Medicina de Vanguardia
            </h2>

            <p className="font-lato text-brand-gray leading-relaxed mb-5 text-[15px] font-normal">
              <strong className="font-bold text-brand-dark">Clínica Latino</strong> es la
              institución que hoy consolida la historia médica de Cuenca. Fundada en{' '}
              <strong className="font-bold text-brand-dark">1957</strong> como la primera
              clínica del austro por el{' '}
              <strong className="font-bold text-brand-dark">Dr. Rubén Astudillo</strong>{' '}
              y un destacado grupo de especialistas, nuestra evolución nos mantiene
              actualmente a la vanguardia de la salud.
            </p>

            <p className="font-lato text-brand-gray leading-relaxed mb-9 text-[15px] font-normal">
              Somos los <strong className="font-bold text-brand-dark">pioneros históricos en
              equipamiento endoscópico</strong> y los primeros a nivel nacional en realizar{' '}
              <strong className="font-bold text-brand-dark">cirugías laparoscópicas desde
              1991</strong>.
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
