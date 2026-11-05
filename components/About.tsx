'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import AboutSlideshow from './AboutSlideshow'
import { useLocale } from './LocaleProvider'

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-brand-dark">{children}</strong>
}

const es = {
  badge: 'Años de Experiencia',
  eyebrow: 'Quiénes Somos',
  titleBold: '69 años',
  titleRest: 'de Experiencia',
  titleLine2: 'en Medicina de Vanguardia',
  paragraph1: (
    <>
      <Strong>Clínica Latino</Strong> es la institución que hoy consolida la historia médica
      de Cuenca. Fundada en <Strong>1957</Strong> como la primera clínica del austro por el{' '}
      <Strong>Dr. Rubén Astudillo</Strong> y un destacado grupo de especialistas, nuestra
      evolución nos mantiene actualmente a la vanguardia de la salud.
    </>
  ),
  paragraph2: (
    <>
      Somos los <Strong>pioneros históricos en equipamiento endoscópico</Strong> y los primeros
      a nivel nacional en realizar <Strong>cirugías laparoscópicas desde 1992</Strong>.
    </>
  ),
  values: [
    'Pioneros en cirugía laparoscópica desde 1992',
    'Primera clínica del austro ecuatoriano',
    'Tecnología endoscópica de vanguardia',
    'Equipo de especialistas de excelencia',
    'Atención humanista y personalizada',
    'Innovación constante con calidez médica',
  ],
  ctaServices: 'Ver Nuestros Servicios',
  ctaContact: 'Contáctanos',
}

const en: typeof es = {
  badge: 'Years of Experience',
  eyebrow: 'About Us',
  titleBold: '69 years',
  titleRest: 'of Experience',
  titleLine2: 'in Cutting-Edge Medicine',
  paragraph1: (
    <>
      <Strong>Clínica Latino</Strong> is the institution that carries forward Cuenca&apos;s
      medical legacy. Founded in <Strong>1957</Strong> by{' '}
      <Strong>Dr. Rubén Astudillo</Strong> and a distinguished group of specialists as the
      first clinic in southern Ecuador, we have continued to evolve and remain at the
      forefront of health care today.
    </>
  ),
  paragraph2: (
    <>
      We are the <Strong>historic pioneers in endoscopic equipment</Strong> and the first in
      the country to perform <Strong>laparoscopic surgeries since 1992</Strong>.
    </>
  ),
  values: [
    'Pioneers in laparoscopic surgery since 1992',
    'First clinic in southern Ecuador',
    'Cutting-edge endoscopic technology',
    'A team of outstanding specialists',
    'Compassionate, personalized care',
    'Constant innovation with a caring touch',
  ],
  ctaServices: 'View Our Services',
  ctaContact: 'Contact Us',
}

const COPY = { es, en }

export default function About({
  slides,
}: {
  slides?: (string | null | undefined)[]
} = {}) {
  const locale = useLocale()
  const t = COPY[locale]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="nosotros" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Media — slideshow de imágenes y/o videos */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <AboutSlideshow slides={slides ?? []} />

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
                {t.badge}
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
                {t.eyebrow}
              </span>
            </div>

            <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1] mb-6">
              <span className="font-bold text-brand-gradient">{t.titleBold}</span> {t.titleRest}
              <br />{t.titleLine2}
            </h2>

            <p className="font-lato text-brand-gray leading-relaxed mb-5 text-[15px] font-normal">
              {t.paragraph1}
            </p>

            <p className="font-lato text-brand-gray leading-relaxed mb-9 text-[15px] font-normal">
              {t.paragraph2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {t.values.map((v, i) => (
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
                {t.ctaServices}
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center border border-brand-dark/30 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-7 py-3.5 text-sm tracking-wide transition-colors"
              >
                {t.ctaContact}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
