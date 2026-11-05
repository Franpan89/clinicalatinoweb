'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'
import { useLocale } from './LocaleProvider'

const es = {
  eyebrow: 'Testimonios',
  heading: 'Lo que Dicen Nuestros Pacientes',
  intro:
    'La satisfacción de nuestros pacientes es nuestro mayor logro y la mejor medida de nuestra calidad.',
  testimonials: [
    {
      name: 'María García',
      role: 'Paciente de Cirugía',
      text: 'La atención fue excepcional. El equipo médico me hizo sentir segura y bien cuidada en todo momento. Completamente recomendado.',
      rating: 5,
      specialty: 'Cirugía General',
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Familiar de Paciente',
      text: 'Cuando mi padre tuvo una emergencia cardíaca, la respuesta fue inmediata. El equipo de Cardio Latino actuó con rapidez y profesionalismo extraordinario.',
      rating: 5,
      specialty: 'Cardio Latino',
    },
    {
      name: 'Ana Morales',
      role: 'Paciente de Neonatología',
      text: 'Mi bebé nació prematura y la unidad de neonatología fue increíble. La tecnología y los cuidados que recibió fueron de primer nivel mundial.',
      rating: 5,
      specialty: 'Neonatología',
    },
    {
      name: 'Roberto Vélez',
      role: 'Paciente de Cirugía Bariátrica',
      text: 'El proceso desde la consulta hasta la operación fue perfectamente organizado. Me cambiaron la vida con un equipo multidisciplinario excepcional.',
      rating: 5,
      specialty: 'Cirugía Bariátrica',
    },
  ],
}

const en: typeof es = {
  eyebrow: 'Testimonials',
  heading: 'What Our Patients Say',
  intro:
    "Our patients' satisfaction is our greatest achievement and the best measure of our quality.",
  testimonials: [
    {
      name: 'María García',
      role: 'Surgery Patient',
      text: 'The care was exceptional. The medical team made me feel safe and well looked after the entire time. I completely recommend them.',
      rating: 5,
      specialty: 'General Surgery',
    },
    {
      name: 'Carlos Rodríguez',
      role: "Patient's Family Member",
      text: 'When my father had a cardiac emergency, the response was immediate. The Cardio Latino team acted quickly and with extraordinary professionalism.',
      rating: 5,
      specialty: 'Cardio Latino',
    },
    {
      name: 'Ana Morales',
      role: 'Neonatology Patient',
      text: 'My baby was born prematurely and the neonatology unit was incredible. The technology and the care she received were world-class.',
      rating: 5,
      specialty: 'Neonatology',
    },
    {
      name: 'Roberto Vélez',
      role: 'Bariatric Surgery Patient',
      text: 'The process from the first consultation to the operation was perfectly organized. An exceptional multidisciplinary team changed my life.',
      rating: 5,
      specialty: 'Bariatric Surgery',
    },
  ],
}

const COPY = { es, en }

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8974F">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const locale = useLocale()
  const t = COPY[locale]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-16 bg-cream-dark">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold font-outfit text-xs font-semibold tracking-[0.3em] uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-cormorant text-navy text-4xl lg:text-5xl font-semibold mb-4">
            {t.heading}
          </h2>
          <p className="text-gray-500 font-outfit max-w-md mx-auto text-[15px] leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {t.testimonials.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-7 border border-gold/10 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <Quote className="text-gold/20 absolute top-5 right-5" size={32} />

              <StarRating count={item.rating} />

              <blockquote className="font-outfit text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </blockquote>

              <div className="border-t border-gray-100 pt-5">
                <div className="font-cormorant text-navy text-lg font-semibold">{item.name}</div>
                <div className="font-outfit text-gray-400 text-xs mt-0.5">{item.role}</div>
                <div className="inline-block mt-2 font-outfit text-[10px] font-bold uppercase tracking-[0.15em] text-gold bg-gold/10 px-2 py-0.5">
                  {item.specialty}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
