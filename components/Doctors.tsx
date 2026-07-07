'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Award, Phone, Building2, DoorOpen, Facebook, Instagram, Linkedin } from 'lucide-react'
import { getInitials, formatSchedule } from '@/lib/doctors'
import type { Doctor, Specialty } from '@/lib/types'

type Filter = string | 'todos'

function WhatsAppGlyph({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

function DoctorAvatar({ doctor }: { doctor: Doctor }) {
  if (doctor.photo_url) {
    return (
      <img
        src={doctor.photo_url}
        alt={`${doctor.full_name} — ${doctor.specialty_label} en Clínica Latino`}
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
        className="font-lato text-white font-medium relative z-10"
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

        {doctor.bio && (
          <p className="font-lato text-brand-gray text-sm leading-relaxed mb-5 font-normal">
            {doctor.bio}
          </p>
        )}

        <div className="space-y-2.5 mb-5 pb-5 border-b border-brand-surface flex-grow">
          {scheduleText && (
            <div className="flex items-start gap-2.5">
              <Clock className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">{scheduleText}</span>
            </div>
          )}
          {doctor.tower && (
            <div className="flex items-start gap-2.5">
              <Building2 className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">{doctor.tower}</span>
            </div>
          )}
          {doctor.office_number && (
            <div className="flex items-start gap-2.5">
              <DoorOpen className="text-brand-teal flex-shrink-0 mt-0.5" size={13} />
              <span className="font-lato text-xs text-brand-dark/70">
                Consultorio {doctor.office_number}
              </span>
            </div>
          )}
        </div>

        {(doctor.facebook_url || doctor.instagram_url || doctor.linkedin_url || doctor.whatsapp_url) && (
          <div className="flex items-center gap-2 mb-3">
            {doctor.facebook_url && (
              <a
                href={doctor.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 border border-brand-dark/10 hover:border-brand-teal flex items-center justify-center text-brand-dark/50 hover:text-brand-teal transition-colors"
              >
                <Facebook size={13} />
              </a>
            )}
            {doctor.instagram_url && (
              <a
                href={doctor.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-brand-dark/10 hover:border-brand-teal flex items-center justify-center text-brand-dark/50 hover:text-brand-teal transition-colors"
              >
                <Instagram size={13} />
              </a>
            )}
            {doctor.linkedin_url && (
              <a
                href={doctor.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-brand-dark/10 hover:border-brand-teal flex items-center justify-center text-brand-dark/50 hover:text-brand-teal transition-colors"
              >
                <Linkedin size={13} />
              </a>
            )}
            {doctor.whatsapp_url && (
              <a
                href={doctor.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 border border-brand-dark/10 hover:border-brand-teal flex items-center justify-center text-brand-dark/50 hover:text-brand-teal transition-colors"
              >
                <WhatsAppGlyph size={13} />
              </a>
            )}
          </div>
        )}

        <a
          href={`tel:${(doctor.contact_phone || '+59372846666').replace(/\s+/g, '')}`}
          className="inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-blue text-white font-lato font-bold py-3 text-xs tracking-wider uppercase transition-colors w-full"
        >
          <Phone size={13} />
          Contactar
        </a>
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
    <section id="medicos" className="py-16 bg-brand-surface scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12" ref={ref}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Nuestros Médicos
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal mb-4">
            Especialistas a Tu Servicio
          </h2>
          <p className="text-brand-gray font-lato font-normal max-w-xl mx-auto text-[15px] leading-relaxed">
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
