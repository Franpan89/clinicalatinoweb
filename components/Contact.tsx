'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle, Phone, MapPin, Clock, Mail, Map } from 'lucide-react'
import { submitAppointment } from '@/app/actions'
import PlaceholderImage from './PlaceholderImage'
import SocialIcon from './SocialIcon'
import { SOCIAL_PLATFORMS } from '@/lib/social'
import { useLocale } from '@/components/LocaleProvider'

// Los valores se envían tal cual a la base de datos (siempre en español);
// solo cambia la etiqueta visible según el idioma.
const SPECIALTY_VALUES = [
  'Cirugía General',
  'Cirugía Bariátrica',
  'Cardio Latino',
  'Cirugía Estética',
  'Neonatología',
  'Ginecología',
  'Cuidados Intensivos',
  'Centro de Imágenes',
  'Laboratorio',
  'Biología Molecular',
  'Emergencia',
  'Hospitalización',
  'Otro',
] as const

type SpecialtyValue = (typeof SPECIALTY_VALUES)[number]

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

const es = {
  specialtyLabels: {
    'Cirugía General': 'Cirugía General',
    'Cirugía Bariátrica': 'Cirugía Bariátrica',
    'Cardio Latino': 'Cardio Latino',
    'Cirugía Estética': 'Cirugía Estética',
    Neonatología: 'Neonatología',
    Ginecología: 'Ginecología',
    'Cuidados Intensivos': 'Cuidados Intensivos',
    'Centro de Imágenes': 'Centro de Imágenes',
    Laboratorio: 'Laboratorio',
    'Biología Molecular': 'Biología Molecular',
    Emergencia: 'Emergencia',
    Hospitalización: 'Hospitalización',
    Otro: 'Otro',
  } as Record<SpecialtyValue, string>,
  timeLabel: (hhmm: string): string => hhmm,
  unexpectedError: 'Error inesperado.',
  phoneLabel: 'Teléfono Principal',
  phoneSub: 'Emergencias disponibles 24/7',
  locationLabel: 'Ubicación',
  locationSub: 'Consulta la dirección al agendar',
  hoursLabel: 'Horario de Atención',
  hoursValue: 'Lunes a Domingo',
  hoursSub: '24 horas del día, sin excepción',
  emailLabel: 'Correo Electrónico',
  emailSub: 'Respondemos en menos de 24h',
  eyebrow: 'Contacto',
  headingStart: 'Agenda tu Cita',
  headingEnd: 'Hoy Mismo',
  intro:
    'Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad para confirmar tu cita con el especialista de tu elección.',
  visitUs: 'Visítanos en:',
  mapTitle: 'Ubicación de Clínica Latino',
  mapPlaceholderLabel: 'Mapa / Ubicación',
  mapPlaceholderFilename: 'Configura en /admin/configuracion',
  successTitle: '¡Solicitud Enviada!',
  successText:
    'Hemos recibido tu solicitud de cita. Nuestro equipo se pondrá en contacto contigo muy pronto para confirmar los detalles.',
  sendAnother: 'Enviar otra solicitud',
  nameLabel: 'Nombre completo *',
  namePlaceholder: 'Tu nombre',
  phoneFieldLabel: 'Teléfono *',
  emailFieldLabel: 'Correo electrónico *',
  emailPlaceholder: 'tu@email.com',
  specialtyFieldLabel: 'Especialidad requerida *',
  specialtyPlaceholder: 'Selecciona una especialidad',
  dateLabel: 'Fecha preferida *',
  timeFieldLabel: 'Hora preferida *',
  timePlaceholder: 'Selecciona hora',
  notesLabel: 'Motivo de consulta (opcional)',
  notesPlaceholder: 'Describe brevemente tu motivo de consulta...',
  submitting: 'Enviando solicitud...',
  submit: 'Solicitar Cita',
  privacy:
    'Al enviar confirmas que has leído nuestra política de privacidad. Tus datos están protegidos y no serán compartidos.',
}

const en: typeof es = {
  specialtyLabels: {
    'Cirugía General': 'General Surgery',
    'Cirugía Bariátrica': 'Bariatric Surgery',
    'Cardio Latino': 'Cardio Latino',
    'Cirugía Estética': 'Cosmetic Surgery',
    Neonatología: 'Neonatology',
    Ginecología: 'Gynecology',
    'Cuidados Intensivos': 'Intensive Care',
    'Centro de Imágenes': 'Imaging Center',
    Laboratorio: 'Laboratory',
    'Biología Molecular': 'Molecular Biology',
    Emergencia: 'Emergency',
    Hospitalización: 'Inpatient Care',
    Otro: 'Other',
  },
  timeLabel: (hhmm: string): string => {
    const [h, m] = hhmm.split(':')
    const hour = Number(h)
    return `${hour % 12 === 0 ? 12 : hour % 12}:${m} ${hour < 12 ? 'AM' : 'PM'}`
  },
  unexpectedError: 'Unexpected error.',
  phoneLabel: 'Main Phone',
  phoneSub: '24/7 emergency care available',
  locationLabel: 'Location',
  locationSub: 'Ask for the address when you book',
  hoursLabel: 'Hours',
  hoursValue: 'Monday to Sunday',
  hoursSub: 'Open 24 hours a day, no exceptions',
  emailLabel: 'Email',
  emailSub: 'We reply within 24 hours',
  eyebrow: 'Contact',
  headingStart: 'Book Your Appointment',
  headingEnd: 'Today',
  intro:
    'Fill out the form and our team will contact you shortly to confirm your appointment with the specialist of your choice.',
  visitUs: 'Find us on:',
  mapTitle: 'Clínica Latino location',
  mapPlaceholderLabel: 'Map / Location',
  mapPlaceholderFilename: 'Configure at /admin/configuracion',
  successTitle: 'Request Sent!',
  successText:
    "We've received your appointment request. Our team will contact you very soon to confirm the details.",
  sendAnother: 'Send another request',
  nameLabel: 'Full name *',
  namePlaceholder: 'Your name',
  phoneFieldLabel: 'Phone *',
  emailFieldLabel: 'Email *',
  emailPlaceholder: 'you@email.com',
  specialtyFieldLabel: 'Specialty needed *',
  specialtyPlaceholder: 'Select a specialty',
  dateLabel: 'Preferred date *',
  timeFieldLabel: 'Preferred time *',
  timePlaceholder: 'Select a time',
  notesLabel: 'Reason for visit (optional)',
  notesPlaceholder: 'Briefly describe the reason for your visit...',
  submitting: 'Sending request...',
  submit: 'Request Appointment',
  privacy:
    'By submitting, you confirm that you have read our privacy policy. Your information is protected and will not be shared.',
}

const COPY = { es, en }

type FormState = 'idle' | 'success' | 'error'

type ContactProps = {
  mapEmbedUrl?: string | null
  mapAddress?: string | null
  socials?: Record<string, string | null>
}

export default function Contact({ mapEmbedUrl, mapAddress, socials }: ContactProps = {}) {
  const locale = useLocale()
  const t = COPY[locale]
  const activeSocials = SOCIAL_PLATFORMS.filter((p) => socials?.[p.key])
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await submitAppointment(formData)
      if (result.success) {
        setFormState('success')
      } else {
        setErrorMsg(result.error || t.unexpectedError)
        setFormState('error')
      }
    })
  }

  const contactItems = [
    {
      icon: Phone,
      label: t.phoneLabel,
      value: '+593 72 846-666',
      sub: t.phoneSub,
      href: 'tel:+59372846666',
    },
    {
      icon: MapPin,
      label: t.locationLabel,
      value: mapAddress || 'Cuenca, Ecuador',
      sub: t.locationSub,
    },
    {
      icon: Clock,
      label: t.hoursLabel,
      value: t.hoursValue,
      sub: t.hoursSub,
    },
    {
      icon: Mail,
      label: t.emailLabel,
      value: 'info@clinicalatino.med.ec',
      sub: t.emailSub,
      href: 'mailto:info@clinicalatino.med.ec',
    },
  ]

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1] mb-4">
            {t.headingStart}{' '}
            <span className="font-bold text-brand-gradient">{t.headingEnd}</span>
          </h2>
          <p className="font-lato text-brand-gray text-[15px] leading-relaxed max-w-2xl mx-auto font-normal">
            {t.intro}
          </p>
        </motion.div>

        {/* 4 contact items — single horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {contactItems.map((item, i) => {
            const Wrapper: 'a' | 'div' = item.href ? 'a' : 'div'
            return (
              <Wrapper
                key={i}
                {...(item.href ? { href: item.href } : {})}
                className={`flex items-start gap-4 p-5 bg-white border border-brand-surface transition-all duration-300 ${
                  item.href ? 'hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 cursor-pointer group' : ''
                }`}
              >
                <div className="w-10 h-10 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <item.icon className="text-brand-teal" size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-lato text-[10px] text-brand-gray uppercase tracking-[0.15em] font-bold mb-1">
                    {item.label}
                  </div>
                  <div className="font-lato text-brand-dark font-bold text-sm leading-tight mb-1 truncate">
                    {item.value}
                  </div>
                  <div className="font-lato text-brand-gray text-xs leading-snug">
                    {item.sub}
                  </div>
                </div>
              </Wrapper>
            )
          })}
        </motion.div>

        {/* Redes sociales de la clínica */}
        {activeSocials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center gap-4 mb-14"
          >
            <span className="font-lato text-xs text-brand-gray uppercase tracking-[0.15em] font-bold">
              {t.visitUs}
            </span>
            <div className="flex items-center gap-2.5">
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={socials![s.key] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-brand-dark/10 hover:border-brand-teal flex items-center justify-center text-brand-dark/50 hover:text-brand-teal transition-all duration-200"
                >
                  <SocialIcon platform={s.key} size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full min-h-[480px]"
          >
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 480 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.mapTitle}
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <PlaceholderImage
                label={t.mapPlaceholderLabel}
                filename={t.mapPlaceholderFilename}
                recommendedSize="Google Maps embed"
                icon={Map}
                variant="soft"
                ratio="3/4"
                className="h-full"
              />
            )}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-cream rounded-none border border-gold/20">
                <CheckCircle className="text-gold mb-5" size={52} />
                <h3 className="font-cormorant text-navy text-3xl font-semibold mb-3">
                  {t.successTitle}
                </h3>
                <p className="font-outfit text-gray-500 max-w-sm leading-relaxed text-[15px]">
                  {t.successText}
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 font-outfit text-sm text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam — oculto para humanos, visible para bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  aria-hidden="true"
                />
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.nameLabel}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={t.namePlaceholder}
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.phoneFieldLabel}
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+593 9XX XXX XXXX"
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t.emailFieldLabel}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                  />
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t.specialtyFieldLabel}
                  </label>
                  <select
                    name="specialty"
                    required
                    defaultValue=""
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white appearance-none"
                  >
                    <option value="" disabled>
                      {t.specialtyPlaceholder}
                    </option>
                    {SPECIALTY_VALUES.map((s) => (
                      <option key={s} value={s}>
                        {t.specialtyLabels[s]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.dateLabel}
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.timeFieldLabel}
                    </label>
                    <select
                      name="time"
                      required
                      defaultValue=""
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white"
                    >
                      <option value="" disabled>{t.timePlaceholder}</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{t.timeLabel(slot)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t.notesLabel}
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder={t.notesPlaceholder}
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white resize-none"
                  />
                </div>

                {/* Error */}
                {formState === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle size={16} />
                    <span className="font-outfit text-sm">{errorMsg}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-3 bg-navy hover:bg-navy-light disabled:bg-gray-300 text-white font-outfit font-semibold py-4 text-sm tracking-wide transition-colors"
                >
                  {isPending ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isPending ? t.submitting : t.submit}
                </button>

                <p className="font-outfit text-gray-400 text-xs text-center leading-relaxed">
                  {t.privacy}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
