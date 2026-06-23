'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, ChevronDown, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const heroStats = [
  { value: '24/7', label: 'Emergencias', href: '#contacto' },
  { value: '+69', label: 'Años de Experiencia', href: '#nosotros' },
  { value: '40+', label: 'Especialidades', href: '#medicos' },
  { value: '100%', label: 'Tecnología de Punta', href: '#servicios' },
]

export default function Hero({ imageSrc }: { imageSrc?: string | null } = {}) {
  return (
    <section
      id="inicio"
      className="relative bg-white flex items-center overflow-hidden pt-28 pb-14"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.2" fill="#1A3B5C" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/8 blur-3xl pointer-events-none" />

      {/* Accent line left */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gradient-vertical opacity-60 z-10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Content — centrado */}
      <div className="relative z-10 container mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-brand-gradient" />
          <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
            Cuenca · Ecuador · Desde 1957
          </span>
          <div className="h-px w-10 bg-brand-gradient" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.35}
          variants={fadeUp}
          className="font-lato font-medium text-brand-dark leading-[1.05] mb-6 mx-auto max-w-3xl"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
        >
          <span className="font-normal text-brand-gradient">Tecnología</span>{' '}
          <span className="font-medium">de Vanguardia,</span>
          <br />
          Los primeros en cuidar de Tí
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.5}
          variants={fadeUp}
          className="text-brand-gray font-lato font-normal text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          <strong className="font-bold text-brand-dark">69 años</strong> brindando atención
          médica especializada con innovación, experiencia y calidez humana.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.65}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 bg-brand-gradient text-white font-lato font-bold px-8 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/30 text-base tracking-wide"
          >
            <Calendar size={18} />
            Agendar una Cita
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#medicos"
            className="inline-flex items-center gap-3 bg-brand-dark hover:bg-brand-blue text-white font-lato font-bold px-8 py-4 transition-colors duration-300 text-base tracking-wide"
          >
            <Users size={18} />
            Médicos Especialistas
          </a>
          <a
            href="tel:+59372846666"
            className="inline-flex items-center gap-3 border-2 border-brand-dark/15 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-8 py-4 transition-all duration-300 text-base tracking-wide"
          >
            <Phone size={18} />
            072 846-666
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.85}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-brand-surface max-w-2xl mx-auto"
        >
          {heroStats.map((stat) => (
            <a key={stat.label} href={stat.href} className="group block text-center">
              <div className="font-lato font-bold text-3xl text-brand-gradient">
                {stat.value}
              </div>
              <div className="font-lato text-brand-gray text-[10px] tracking-[0.2em] uppercase mt-1 font-bold group-hover:text-brand-blue transition-colors">
                {stat.label}
                <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-brand-gray font-bold">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-brand-teal" />
        </motion.div>
      </motion.div>
    </section>
  )
}
