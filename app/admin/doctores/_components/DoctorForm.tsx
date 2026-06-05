'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { Save, AlertCircle, Upload, X, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { slugify, getInitials } from '@/lib/doctors'
import { createDoctor, updateDoctor } from '@/app/admin/actions'
import type { Doctor, Specialty } from '@/lib/types'
import ScheduleEditor from './ScheduleEditor'

type Mode = 'create' | 'edit'

export default function DoctorForm({
  mode,
  doctor,
  specialties,
}: {
  mode: Mode
  doctor?: Doctor
  specialties: Specialty[]
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [photoPreview, setPhotoPreview] = useState<string | null>(doctor?.photo_url ?? null)
  const [removePhoto, setRemovePhoto] = useState(false)
  const [specialty, setSpecialty] = useState<string>(doctor?.specialty ?? '')
  const [autoSlug, setAutoSlug] = useState(mode === 'create')
  const [slug, setSlug] = useState(doctor?.slug ?? '')
  const [fullName, setFullName] = useState(doctor?.full_name ?? '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNameChange = (value: string) => {
    setFullName(value)
    if (autoSlug) setSlug(slugify(value))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('La foto no puede superar 5MB.')
      return
    }
    setError(null)
    setRemovePhoto(false)
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    setRemovePhoto(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    const selectedSpec = specialties.find((s) => s.slug === formData.get('specialty'))
    if (selectedSpec) {
      formData.set('specialty_label', selectedSpec.label)
    }

    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createDoctor(formData)
          : await updateDoctor(doctor!.id, formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link
        href="/admin/doctores"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark font-lato text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          {mode === 'create' ? 'Agregar nuevo médico' : `Editar: ${doctor?.full_name}`}
        </h1>
        <p className="font-lato text-brand-gray">
          Completa la información profesional del especialista.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Foto */}
        <Section title="Foto del médico" subtitle="Opcional · Máx. 5MB · JPG, PNG o WebP">
          <div className="flex items-start gap-6">
            <div className="w-32 h-40 bg-brand-surface border-2 border-dashed border-brand-dark/15 flex items-center justify-center overflow-hidden flex-shrink-0">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              ) : fullName ? (
                <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white font-lato font-medium text-3xl">
                  {getInitials(fullName)}
                </div>
              ) : (
                <ImageIcon className="text-brand-gray" size={28} />
              )}
            </div>

            <div className="flex-1">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-brand-dark/20 hover:border-brand-teal text-brand-dark font-lato text-sm font-bold px-4 py-2.5 transition-colors">
                <Upload size={14} />
                {photoPreview ? 'Reemplazar foto' : 'Subir foto'}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="ml-3 inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-lato text-sm transition-colors"
                >
                  <X size={14} />
                  Quitar
                </button>
              )}
              <p className="font-lato text-xs text-brand-gray mt-3 leading-relaxed">
                Si no subes foto, el médico aparecerá con un avatar generado a partir de
                sus iniciales con el gradiente de marca.
              </p>
              {removePhoto && <input type="hidden" name="remove_photo" value="on" />}
            </div>
          </div>
        </Section>

        {/* Identidad */}
        <Section title="Identidad profesional">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Nombre completo con título *"
              hint="Ejemplo: Dr. Eduardo Vásquez Andrade"
            >
              <input
                name="full_name"
                required
                value={fullName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Dr. Nombre Apellido"
                className={inputClass}
              />
            </Field>

            <Field label="Slug (URL única) *" hint="Generado automáticamente del nombre">
              <div className="flex gap-2">
                <input
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setAutoSlug(false)
                  }}
                  className={inputClass}
                />
                {!autoSlug && mode === 'create' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSlug(slugify(fullName))
                      setAutoSlug(true)
                    }}
                    className="font-lato text-xs text-brand-blue hover:text-brand-dark whitespace-nowrap px-3 transition-colors"
                  >
                    Auto
                  </button>
                )}
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <Field
              label="Especialidad *"
              hint={
                specialties.length === 0
                  ? '⚠ No hay especialidades en la BD. Agrega una en /admin/especialidades.'
                  : `${specialties.length} ${specialties.length === 1 ? 'especialidad disponible' : 'especialidades disponibles'} · Gestionar en /admin/especialidades`
              }
            >
              <select
                name="specialty"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className={inputClass}
                disabled={specialties.length === 0}
              >
                <option value="" disabled>
                  {specialties.length === 0 ? 'Sin especialidades' : 'Seleccionar...'}
                </option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
              <input
                type="hidden"
                name="specialty_label"
                value={specialties.find((s) => s.slug === specialty)?.label ?? ''}
              />
            </Field>

            <Field label="Sub-especialidad *" hint="Ejemplo: Cardiología Intervencionista">
              <input
                name="subspecialty"
                required
                defaultValue={doctor?.subspecialty ?? ''}
                placeholder="Área específica de práctica"
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* Perfil */}
        <Section title="Perfil profesional">
          <Field
            label="Biografía / Descripción *"
            hint="2-3 líneas describiendo experiencia y enfoque"
          >
            <textarea
              name="bio"
              required
              rows={4}
              defaultValue={doctor?.bio ?? ''}
              placeholder="Describe brevemente la trayectoria, especialización y áreas de práctica del médico..."
              className={`${inputClass} resize-none`}
            />
          </Field>

          <div className="mt-5">
            <Field label="Experiencia *" hint="Ejemplo: 22 años">
              <input
                name="experience"
                required
                defaultValue={doctor?.experience ?? ''}
                placeholder="XX años"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field
              label="Formación académica"
              hint="Una línea por título / institución"
            >
              <textarea
                name="education"
                rows={3}
                defaultValue={doctor?.education?.join('\n') ?? ''}
                placeholder={'Universidad XYZ\nFellowship en Centro ABC\nMaestría en...'}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Idiomas" hint="Separados por coma. Ejemplo: Español, Inglés, Francés">
              <input
                name="languages"
                defaultValue={doctor?.languages?.join(', ') ?? ''}
                placeholder="Español, Inglés"
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* Horario */}
        <Section
          title="Horario de atención"
          subtitle="Define los días y horas en que el médico atiende. Múltiples bloques por día permitidos."
        >
          <ScheduleEditor initialBlocks={doctor?.schedule_days ?? []} />
        </Section>

        {/* Ubicación física + contacto */}
        <Section
          title="Ubicación y contacto"
          subtitle="Información que aparecerá en la tarjeta pública del médico para que los pacientes lo encuentren."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Torre" hint="Ej: Torre A, Edificio Principal">
              <input
                name="tower"
                defaultValue={doctor?.tower ?? ''}
                placeholder="Torre / Edificio"
                className={inputClass}
              />
            </Field>
            <Field label="N° de consultorio" hint="Ej: 301, B-12">
              <input
                name="office_number"
                defaultValue={doctor?.office_number ?? ''}
                placeholder="Número o código"
                className={inputClass}
              />
            </Field>
            <Field label="Teléfono de contacto" hint="Directo al consultorio (opcional)">
              <input
                name="contact_phone"
                type="tel"
                defaultValue={doctor?.contact_phone ?? ''}
                placeholder="+593-7-..."
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* Display */}
        <Section title="Configuración de visualización">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Orden de visualización"
              hint="Menor número aparece primero. Múltiplos de 10 recomendados."
            >
              <input
                type="number"
                name="display_order"
                defaultValue={doctor?.display_order ?? 999}
                className={inputClass}
              />
            </Field>

            <Field label="Estado">
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={doctor?.active ?? true}
                  className="w-4 h-4 accent-brand-teal"
                />
                <span className="font-lato text-sm text-brand-dark">
                  Médico activo (visible en el sitio público)
                </span>
              </label>
            </Field>
          </div>
        </Section>

        {error && (
          <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span className="font-lato text-sm">{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-surface">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white font-lato font-bold py-3.5 px-8 text-sm tracking-wide disabled:opacity-60 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
          >
            {isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isPending
              ? 'Guardando...'
              : mode === 'create'
                ? 'Crear médico'
                : 'Guardar cambios'}
          </button>
          <Link
            href="/admin/doctores"
            className="inline-flex items-center justify-center font-lato text-sm font-bold px-6 py-3.5 text-brand-dark hover:bg-brand-surface transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

const inputClass =
  'w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all'

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white p-6 md:p-8 border border-brand-surface">
      <div className="mb-6">
        <h2 className="font-lato text-brand-dark text-lg font-bold">{title}</h2>
        {subtitle && (
          <p className="font-lato text-brand-gray text-xs mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="font-lato text-xs text-brand-gray mt-1.5">{hint}</p>}
    </div>
  )
}
