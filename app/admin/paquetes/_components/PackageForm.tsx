'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { Save, AlertCircle, Upload, X, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { slugify } from '@/lib/doctors'
import { createPackage, updatePackage } from '@/app/admin/actions'
import type { PackageItem } from '@/lib/types'

type Mode = 'create' | 'edit'

export default function PackageForm({ mode, pkg }: { mode: Mode; pkg?: PackageItem }) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [imagePreview, setImagePreview] = useState<string | null>(pkg?.image_url ?? null)
  const [removeImage, setRemoveImage] = useState(false)
  const [autoSlug, setAutoSlug] = useState(mode === 'create')
  const [slug, setSlug] = useState(pkg?.slug ?? '')
  const [title, setTitle] = useState(pkg?.title ?? '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (autoSlug) setSlug(slugify(value))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5MB.')
      return
    }
    setError(null)
    setRemoveImage(false)
    const url = URL.createObjectURL(file)
    setImagePreview(url)
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setRemoveImage(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result =
        mode === 'create' ? await createPackage(formData) : await updatePackage(pkg!.id, formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link
        href="/admin/paquetes"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark font-lato text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          {mode === 'create' ? 'Agregar paquete' : `Editar: ${pkg?.title}`}
        </h1>
        <p className="font-lato text-brand-gray">
          Configura el combo o promoción que aparecerá en /paquetes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Section title="Imagen" subtitle="Opcional · Máx. 5MB · JPG, PNG o WebP">
          <div className="flex items-start gap-6">
            <div className="w-32 h-40 bg-brand-surface border-2 border-dashed border-brand-dark/15 flex items-center justify-center overflow-hidden flex-shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-brand-gray" size={28} />
              )}
            </div>

            <div className="flex-1">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-brand-dark/20 hover:border-brand-teal text-brand-dark font-lato text-sm font-bold px-4 py-2.5 transition-colors">
                <Upload size={14} />
                {imagePreview ? 'Reemplazar imagen' : 'Subir imagen'}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="ml-3 inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-lato text-sm transition-colors"
                >
                  <X size={14} />
                  Quitar
                </button>
              )}
              {removeImage && <input type="hidden" name="remove_image" value="on" />}
            </div>
          </div>
        </Section>

        <Section title="Información del paquete">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Título *">
              <input
                name="title"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Nombre del paquete"
                className={inputClass}
              />
            </Field>

            <Field label="Slug (URL única) *" hint="Generado automáticamente del título">
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
                      setSlug(slugify(title))
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
            <Field label="Descripción *" hint="Describe brevemente el paquete o promoción">
              <textarea
                name="description"
                required
                rows={4}
                defaultValue={pkg?.description ?? ''}
                placeholder="Describe qué incluye este paquete..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Precio" hint='Texto libre. Ej: "Desde $120", "Consultar"'>
              <input
                name="price"
                defaultValue={pkg?.price ?? ''}
                placeholder="Desde $120"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Qué incluye" hint="Una línea por ítem">
              <textarea
                name="items"
                rows={4}
                defaultValue={pkg?.items?.join('\n') ?? ''}
                placeholder={'Consulta médica\nExámenes de laboratorio\nEcografía'}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>
        </Section>

        <Section title="Configuración de visualización">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Orden de visualización"
              hint="Menor número aparece primero"
            >
              <input
                type="number"
                name="display_order"
                defaultValue={pkg?.display_order ?? 999}
                className={inputClass}
              />
            </Field>

            <Field label="Estado">
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={pkg?.active ?? true}
                  className="w-4 h-4 accent-brand-teal"
                />
                <span className="font-lato text-sm text-brand-dark">
                  Paquete activo (visible en el sitio público)
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
            {isPending ? 'Guardando...' : mode === 'create' ? 'Crear paquete' : 'Guardar cambios'}
          </button>
          <Link
            href="/admin/paquetes"
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
        {subtitle && <p className="font-lato text-brand-gray text-xs mt-1">{subtitle}</p>}
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
