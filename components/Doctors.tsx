'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Languages, GraduationCap, Award, Calendar, Phone, MapPin, DoorOpen } from 'lucide-react'
import { getInitials, formatSchedule } from '@/lib/doctors'
import type { Doctor, Specialty } from '@/lib/types'

type Filter = string | 'todos'

function DoctorAvatar({ doctor }: { doctor: Doctor }) {
  if (doctor.photo_url) {
    return (
      <img
        src={doctor.photo_url}
        alt={doctor.full_name}
        className="w-full h-full object-cover"
      />
    )
  }

  const initials = getInitials(doctor.full_name)

  return (
    <div className="w-full h-full bg-brand-gradient flex items-center justify-center relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`doc-grid-${doctor.id}`}
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#doc-grid-${doctor.id})`} />
      </svg>

      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="120" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="150" cy="150" r="90" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="60" fill="none" stroke="white" strokeWidth="0.4" />
      </svg>

      <span
        className="font-lato text-white font-thin relative z-10"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
      >
        {initials}
      </span>

      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/50" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/50" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/50" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/50" />
    </div>
  )
}

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const scheduleText =
    doctor.schedule_days && doctor.schedule_days.length > 0
      ? formatSchedule(doctor.schedule_days)
      : doctor.schedule

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group bg-white border border-brand-surface hover:border-brand-teal/40 hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-400 flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <DoctorAvatar doctor={doctor} />

        <div className="absolute top-4 left-4 bg-brand-gradient text-white font-lato text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5">
          {doctor.specialty_label}
        </div>

        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
          <Award size={12} className="text-brand-teal" />
          <span className="font-lato text-[10px] font-bold text-brand-dark uppercase tracking-wider">
            {doctor.experience}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-lato text-brand-dark text-xl font-bold leading-tight mb-1">
          {doctor.full_name}
        </h3>
        <div className="font-lato text-brand-teal text-xs font-bold uppercase tracking-[0.15em] mb-4">
          {doctor.subspecialty}
        </div>

        <p className="font-lato text-brand-gray text-sm leading-relaxed mb-5 flex-grow font-light">
          {doctor.bio}
        </p>

        <div className="space-y-2.5 mb-5 pb-5 border-b border-brand-surface">
          {scheduleText && (
            <div className="flex items-start gap-2.5">
              <Clock className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">{scheduleText}</span>
            </div>
          )}
          {(doctor.tower || doctor.office_number) && (
            <div className="flex items-start gap-2.5">
              <MapPin className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">
                {[doctor.tower, doctor.office_number && `Consultorio ${doctor.office_number}`]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </div>
          )}
          {doctor.contact_phone && (
            <div className="flex items-start gap-2.5">
              <Phone className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <a
                href={`tel:${doctor.contact_phone.replace(/\s+/g, '')}`}
                className="font-lato text-xs text-brand-dark/70 hover:text-brand-teal transition-colors"
              >
                {doctor.contact_phone}
              </a>
            </div>
          )}
          {doctor.languages.length > 0 && (
            <div className="flex items-start gap-2.5">
              <Languages className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">
                {doctor.languages.join(' · ')}
              </span>
            </div>
          )}
          {doctor.education[0] && (
            <div className="flex items-start gap-2.5">
              <GraduationCap className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70 leading-snug">
                {doctor.education[0]}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <a
            href="#contacto"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-blue text-white font-lato font-bold py-3 text-xs tracking-wider uppercase transition-colors"
          >
            <Calendar size={13} />
            Agendar
          </a>
          <a
            href={`tel:${(doctor.contact_phone || '+59372827074').replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-2 border border-brand-teal/30 hover:border-brand-teal hover:bg-brand-teal/5 text-brand-dark font-lato font-bold py-3 px-4 text-xs tracking-wider uppercase transition-colors"
            aria-label="Llamar"
          >
            <Phone size={13} className="text-brand-teal" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Doctors({
  doctors,
  specialties,
}: {
  doctors: Doctor[]
  specialties: Specialty[]
}) {
  const [filter, setFilter] = useState<Filter>('todos')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const detail = (e as CustomEvent<Filter>).detail
      if (detail) setFilter(detail)
    }
    window.addEventListener('filter-doctors', handleFilterEvent)
    return () => window.removeEventListener('filter-doctors', handleFilterEvent)
  }, [])

  const filtered = useMemo(
    () => (filter === 'todos' ? doctors : doctors.filter((d) => d.specialty === filter)),
    [filter, doctors]
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { todos: doctors.length }
    doctors.forEach((d) => {
      map[d.specialty] = (map[d.specialty] || 0) + 1
    })
    return map
  }, [doctors])

  const allOptions = [
    { slug: 'todos', label: 'Todos' },
    ...specialties.map((s) => ({ slug: s.slug, label: s.label })),
  ]

  return (
    <section id="medicos" className="py-24 bg-brand-surface scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12" ref={ref}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Nuestros Médicos
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-light mb-4">
            Especialistas a Tu Servicio
          </h2>
          <p className="text-brand-gray font-lato font-light max-w-xl mx-auto text-[15px] leading-relaxed">
            Conoce a nuestro equipo médico. Filtra por especialidad para encontrar al
            profesional ideal según tu necesidad de salud.
          </p>
        </div>

        {allOptions.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            {allOptions.map((opt) => {
              const isActive = filter === opt.slug
              const count = counts[opt.slug] ?? 0
              return (
                <button
                  key={opt.slug}
                  onClick={() => setFilter(opt.slug as Filter)}
                  className={`group inline-flex items-center gap-2 px-4 py-2 font-lato text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                      : 'bg-white text-brand-dark/70 border-brand-dark/10 hover:border-brand-teal hover:text-brand-dark'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 transition-colors ${
                      isActive
                        ? 'bg-brand-teal text-white'
                        : 'bg-brand-surface text-brand-gray group-hover:bg-brand-teal/15 group-hover:text-brand-teal'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}

        <div className="text-center mb-8">
          <span className="font-lato text-sm text-brand-gray">
            Mostrando{' '}
            <strong className="text-brand-dark font-bold">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'médico' : 'médicos'}
            {filter !== 'todos' && (
              <>
                {' '}en{' '}
                <strong className="text-brand-teal font-bold">
                  {allOptions.find((o) => o.slug === filter)?.label}
                </strong>
              </>
            )}
          </span>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((doctor, i) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-lato text-brand-gray">
              No hay médicos disponibles en esta especialidad por el momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
