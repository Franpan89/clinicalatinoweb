'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, ChevronDown, Stethoscope, Users } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

/**
 * Para reemplazar el placeholder por una imagen real:
 *   1. Guarda el PNG en `public/img/hero-banner.png`
 *   2. Cambia HERO_IMAGE_SRC a `'/img/hero-banner.png'`
 * Tamaño recomendado: 900×1100 px (vertical), PNG con fondo transparente.
 */
const HERO_IMAGE_SRC: string | null = null

// Stats que también son links rápidos a secciones del sitio
const heroStats = [
  { value: '24/7', label: 'Emergencias', href: '#contacto' },
  { value: '+69', label: 'Años de Experiencia', href: '#nosotros' },
  { value: '40+', label: 'Especialidades', href: '#medicos' },
  { value: '100%', label: 'Tecnología de Punta', href: '#servicios' },
]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[80vh] lg:min-h-[88vh] bg-white flex items-center overflow-hidden pt-24 pb-16"
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

      {/* Gradient vertical accent line (left) */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gradient-vertical opacity-60 z-10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Main content — 2 column layout */}
      <div className="relative z-10 container mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* ── Columna izquierda: texto ─────────────────────── */}
          <div className="max-w-[640px]">
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
                Cuenca · Ecuador · Desde 1957
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.35}
              variants={fadeUp}
              className="font-lato font-thin text-brand-dark leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4rem)' }}
            >
              <span className="font-light text-brand-gradient">Tecnología</span>{' '}
              <span className="font-thin">de Vanguardia,</span>
              <br />
              Los primeros en cuidar de Tí
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.5}
              variants={fadeUp}
              className="text-brand-gray font-lato font-light text-lg leading-relaxed mb-9 max-w-[540px]"
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
              className="flex flex-wrap gap-3"
            >
              <a
                href="#contacto"
                className="group relative inline-flex items-center gap-2.5 bg-brand-gradient text-white font-lato font-bold px-6 py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/30 text-sm tracking-wide overflow-hidden"
              >
                <Calendar size={16} />
                Agendar una Cita
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#medicos"
                className="inline-flex items-center gap-2.5 bg-brand-dark hover:bg-brand-blue text-white font-lato font-bold px-6 py-3.5 transition-colors duration-300 text-sm tracking-wide"
              >
                <Users size={16} />
                Médicos Especialistas
              </a>
              <a
                href="tel:+59372827074"
                className="inline-flex items-center gap-2.5 border-2 border-brand-dark/15 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-lato font-bold px-6 py-3.5 transition-all duration-300 text-sm tracking-wide"
              >
                <Phone size={16} />
                2827-074
              </a>
            </motion.div>

            {/* Mini stats — clicables, hacen scroll a las secciones */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.85}
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-7 border-t border-brand-surface"
            >
              {heroStats.map((stat) => (
                <a
                  key={stat.label}
                  href={stat.href}
                  className="group block"
                >
                  <div className="font-lato font-bold text-2xl lg:text-3xl text-brand-gradient">
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

          {/* ── Columna derecha: imagen / placeholder ───────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Decorative gradient ring detrás */}
            <motion.svg
              viewBox="0 0 400 400"
              className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-50 pointer-events-none"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 0.5, rotate: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <defs>
                <linearGradient id="hero-ring-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B9DB5C" />
                  <stop offset="50%" stopColor="#2BB3B2" />
                  <stop offset="100%" stopColor="#2C6FB1" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="195" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="1" opacity="0.4" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="0.8" opacity="0.25" />
              <path d="M 200 5 A 195 195 0 0 1 395 200" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="2" opacity="0.65" />
              <path d="M 5 200 A 195 195 0 0 1 200 395" fill="none" stroke="url(#hero-ring-grad)" strokeWidth="2" opacity="0.65" />
              <circle cx="200" cy="10" r="5" fill="#B9DB5C" opacity="0.8" />
              <circle cx="200" cy="390" r="5" fill="#2C6FB1" opacity="0.8" />
            </motion.svg>

            {/* Imagen / placeholder */}
            <div className="relative">
              <PlaceholderImage
                src={HERO_IMAGE_SRC}
                alt="Clínica Latino — médico especialista"
                label="Hero — imagen principal"
                filename="public/img/hero-banner.png"
                recommendedSize="900×1100px · PNG (fondo transparente)"
                icon={Stethoscope}
                variant="brand"
                ratio="9/11"
                className="shadow-2xl shadow-brand-teal/10"
              />
            </div>

            {/* Floating brand badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="absolute -bottom-5 -left-5 bg-white p-4 pr-6 shadow-2xl border border-brand-surface flex items-center gap-3 hidden xl:flex"
            >
              <div className="w-10 h-10 bg-brand-gradient flex items-center justify-center text-white">
                <Calendar size={18} />
              </div>
              <div>
                <div className="font-lato text-[10px] uppercase tracking-[0.2em] text-brand-gray font-bold">
                  Atención
                </div>
                <div className="font-lato text-brand-dark text-sm font-bold">24/7 todos los días</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
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
