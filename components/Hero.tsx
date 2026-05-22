'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-white flex items-center overflow-hidden"
    >
      {/* Subtle dot grid */}
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

      {/* Soft brand-gradient glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />

      {/* Decorative gradient ring — right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] translate-x-1/4 pointer-events-none">
        <motion.svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          <defs>
            <linearGradient id="hero-ring-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B9DB5C" />
              <stop offset="50%" stopColor="#2BB3B2" />
              <stop offset="100%" stopColor="#2C6FB1" />
            </linearGradient>
          </defs>

          {/* Concentric rings */}
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="1" opacity="0.25" />
          <circle cx="200" cy="200" r="155" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="0.8" opacity="0.18" />
          <circle cx="200" cy="200" r="110" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="1.4" opacity="0.30" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="1.2" opacity="0.45" />

          {/* Axis lines */}
          <line x1="200" y1="5" x2="200" y2="395" stroke="url(#hero-ring-grad)" strokeWidth="0.4" opacity="0.15" />
          <line x1="5" y1="200" x2="395" y2="200" stroke="url(#hero-ring-grad)" strokeWidth="0.4" opacity="0.15" />

          {/* Medical cross center (echo del logo) */}
          <rect x="183" y="155" width="34" height="90" rx="8" fill="url(#hero-ring-grad)" opacity="0.20" />
          <rect x="155" y="183" width="90" height="34" rx="8" fill="url(#hero-ring-grad)" opacity="0.20" />

          {/* Cardinal dots */}
          <circle cx="200" cy="45" r="5" fill="#B9DB5C" opacity="0.7" />
          <circle cx="200" cy="355" r="5" fill="#2C6FB1" opacity="0.7" />
          <circle cx="45" cy="200" r="5" fill="#5BB89A" opacity="0.7" />
          <circle cx="355" cy="200" r="5" fill="#2BB3B2" opacity="0.7" />

          {/* Outer arcs */}
          <path d="M 200 10 A 190 190 0 0 1 390 200" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="2" opacity="0.55" />
          <path d="M 10 200 A 190 190 0 0 1 200 390" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="2" opacity="0.55" />
        </motion.svg>
      </div>

      {/* Gradient vertical accent line (left) */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gradient-vertical opacity-60"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto pt-28 pb-20">
        <div className="max-w-[720px]">
          {/* Eyebrow */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
              Cuenca · Ecuador · Desde 1990
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.35}
            variants={fadeUp}
            className="font-lato font-thin text-brand-dark leading-[1.05] mb-7"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}
          >
            Medicina con Alma,
            <br />
            <span className="font-light text-brand-gradient">Tecnología</span>{' '}
            <span className="font-thin">de&nbsp;Vanguardia</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={fadeUp}
            className="text-brand-gray font-lato font-light text-lg leading-relaxed mb-10 max-w-[520px]"
          >
            Centro médico privado con especialistas de excelencia y tecnología de punta.
            Atención integral para tu salud y bienestar, las&nbsp;24 horas del día,
            los&nbsp;7 días de la semana.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.65}
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-3 bg-brand-gradient text-white font-lato font-bold px-8 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/30 text-sm tracking-wide overflow-hidden"
            >
              <Calendar size={17} />
              Agendar una Cita
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="tel:+59372827074"
              className="inline-flex items-center gap-3 border-2 border-brand-dark/15 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-8 py-4 transition-all duration-300 text-sm tracking-wide"
            >
              <Phone size={17} />
              Emergencias: 2827-074
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.85}
            variants={fadeUp}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-brand-surface"
          >
            {[
              { value: '24/7', label: 'Emergencias' },
              { value: '+30', label: 'Años de Experiencia' },
              { value: '15+', label: 'Especialidades' },
              { value: '100%', label: 'Tecnología de Punta' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-lato font-bold text-3xl text-brand-gradient">{stat.value}</div>
                <div className="font-lato text-brand-gray text-[10px] tracking-[0.2em] uppercase mt-1 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
