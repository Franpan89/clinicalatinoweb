'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Save, AlertCircle, ArrowLeft } from 'lucide-react'
import { slugify, SPECIALTY_ICONS, SPECIALTY_COLORS } from '@/lib/doctors'
import { createSpecialty, updateSpecialty } from '@/app/admin/actions'
import SpecialtyIcon from './SpecialtyIcon'
import type { Specialty } from '@/lib/types'

type Mode = 'create' | 'edit'

export default function SpecialtyForm({
  mode,
  specialty,
}: {
  mode: Mode
  specialty?: Specialty
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [label, setLabel] = useState(specialty?.label ?? '')
  const [slug, setSlug] = useState(specialty?.slug ?? '')
  const [autoSlug, setAutoSlug] = useState(mode === 'create')
  const [icon, setIcon] = useState(specialty?.icon ?? 'stethoscope')
  const [description, setDescription] = useState(specialty?.description ?? '')
  const [colorClass, setColorClass] = useState(
    specialty?.color_class ?? 'from-slate-900 to-slate-800'
  )

  const handleLabelChange = (value: string) => {
    setLabel(value)
    if (autoSlug) setSlug(slugify(value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createSpecialty(formData)
          : await updateSpecialty(specialty!.id, formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Link
        href="/admin/especialidades"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark font-lato text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          {mode === 'create' ? 'Agregar especialidad' : `Editar: ${specialty?.label}`}
        </h1>
        <p className="font-lato text-brand-gray">
          Configura el nombre, descripción y apariencia visual de la especialidad.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preview */}
        <div className="bg-white p-6 border border-brand-surface">
          <h2 className="font-lato text-brand-dark text-lg font-bold mb-4">
            Vista previa
          </h2>
          <div
            className={`p-6 bg-gradient-to-br ${colorClass} max-w-sm relative overflow-hidden`}
          >
            <div className="absolute -top-4 -right-4 opacity-[0.08] pointer-events-none">
              <SpecialtyIcon name={icon} size={130} className="text-white" />
            </div>
            <SpecialtyIcon name={icon} className="text-brand-teal mb-3 relative z-10" size={26} />
            <h3 className="font-lato text-white text-xl font-bold mb-2 relative z-10">
              {label || 'Nombre de la especialidad'}
            </h3>
            <p className="font-lato text-white/60 text-sm leading-relaxed relative z-10 line-clamp-3">
              {description || 'Descripción breve de la especialidad...'}
            </p>
          </div>
        </div>

        {/* Identidad */}
        <Section title="Información básica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Nombre *" hint="Ej: Cardiología, Pediatría, Traumatología">
              <input
                name="label"
                required
                value={label}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder="Nombre visible"
                className={inputClass}
              />
            </Field>

            <Field label="Slug (URL única) *" hint="Generado automáticamente">
              <div className="flex gap-2">
                <input
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setAutoSlug(false)
                  }}
                  pattern="[a-z0-9-]+"
                  className={inputClass}
                />
                {!autoSlug && mode === 'create' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSlug(slugify(label))
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

          <div className="mt-5">
            <Field label="Descripción *" hint="1-2 líneas que describen la especialidad">
              <textarea
                name="description"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el alcance y enfoque de esta especialidad..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>
        </Section>

        {/* Apariencia */}
        <Section title="Apariencia visual">
          <Field
            label="Ícono"
            hint="Se muestra en la tarjeta de especialidad en el sitio público"
          >
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mt-2">
              {SPECIALTY_ICONS.map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setIcon(iconName)}
                  className={`aspect-square flex items-center justify-center border-2 transition-all ${
                    icon === iconName
                      ? 'border-brand-teal bg-brand-teal/10'
                      : 'border-brand-dark/10 hover:border-brand-teal/50'
                  }`}
                  title={iconName}
                >
                  <SpecialtyIcon
                    name={iconName}
                    size={18}
                    className={icon === iconName ? 'text-brand-teal' : 'text-brand-dark'}
                  />
                </button>
              ))}
            </div>
            <input type="hidden" name="icon" value={icon} />
          </Field>

          <div className="mt-6">
            <Field
              label="Color de fondo (gradiente)"
              hint="Aplica al fondo de la tarjeta en la sección pública"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                {SPECIALTY_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColorClass(c.value)}
                    className={`h-14 bg-gradient-to-br ${c.value} relative border-2 transition-all ${
                      colorClass === c.value
                        ? 'border-brand-teal scale-105 shadow-lg'
                        : 'border-transparent hover:border-brand-teal/50'
                    }`}
                    title={c.label}
                  >
                    {colorClass === c.value && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <input type="hidden" name="color_class" value={colorClass} />
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
                defaultValue={specialty?.display_order ?? 999}
                className={inputClass}
              />
            </Field>

            <Field label="Estado">
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={specialty?.active ?? true}
                  className="w-4 h-4 accent-brand-teal"
                />
                <span className="font-lato text-sm text-brand-dark">
                  Especialidad activa (visible en sitio público)
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
                ? 'Crear especialidad'
                : 'Guardar cambios'}
          </button>
          <Link
            href="/admin/especialidades"
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
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white p-6 md:p-8 border border-brand-surface">
      <h2 className="font-lato text-brand-dark text-lg font-bold mb-6">{title}</h2>
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
