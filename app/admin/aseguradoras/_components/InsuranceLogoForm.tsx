'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { Save, AlertCircle, Upload, X, ArrowLeft, ShieldCheck } from 'lucide-react'
import { createInsuranceLogo, updateInsuranceLogo } from '@/app/admin/actions'
import type { InsuranceLogo } from '@/lib/types'

type Mode = 'create' | 'edit'

export default function InsuranceLogoForm({
  mode,
  logo,
}: {
  mode: Mode
  logo?: InsuranceLogo
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [logoPreview, setLogoPreview] = useState<string | null>(logo?.logo_url ?? null)
  const [removeLogo, setRemoveLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      setError('El logo no puede superar 3MB.')
      return
    }
    setError(null)
    setRemoveLogo(false)
    const url = URL.createObjectURL(file)
    setLogoPreview(url)
  }

  const handleRemoveLogo = () => {
    setLogoPreview(null)
    setRemoveLogo(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createInsuranceLogo(formData)
          : await updateInsuranceLogo(logo!.id, formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Link
        href="/admin/aseguradoras"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark font-lato text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          {mode === 'create' ? 'Agregar aseguradora' : `Editar: ${logo?.name}`}
        </h1>
        <p className="font-lato text-brand-gray">
          Aparece en el slider de aseguradoras del home.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 border border-brand-surface">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-32 h-20 bg-brand-surface border-2 border-dashed border-brand-dark/15 flex items-center justify-center overflow-hidden flex-shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Vista previa"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <ShieldCheck className="text-brand-gray" size={28} />
              )}
            </div>

            <div className="flex-1">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-brand-dark/20 hover:border-brand-teal text-brand-dark font-lato text-sm font-bold px-4 py-2.5 transition-colors">
                <Upload size={14} />
                {logoPreview ? 'Reemplazar logo' : 'Subir logo'}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="logo"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {logoPreview && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="ml-3 inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-lato text-sm transition-colors"
                >
                  <X size={14} />
                  Quitar
                </button>
              )}
              <p className="font-lato text-xs text-brand-gray mt-3 leading-relaxed">
                Idealmente PNG o SVG con fondo transparente. Máx. 3MB.
              </p>
              {removeLogo && <input type="hidden" name="remove_logo" value="on" />}
            </div>
          </div>

          <Field label="Nombre de la aseguradora *" hint="Ej: SALUD S.A., BMI, Confiamed">
            <input
              name="name"
              required
              defaultValue={logo?.name ?? ''}
              placeholder="Nombre de la aseguradora"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <Field
              label="Orden de visualización"
              hint="Menor número aparece primero"
            >
              <input
                type="number"
                name="display_order"
                defaultValue={logo?.display_order ?? 999}
                className={inputClass}
              />
            </Field>

            <Field label="Estado">
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={logo?.active ?? true}
                  className="w-4 h-4 accent-brand-teal"
                />
                <span className="font-lato text-sm text-brand-dark">
                  Visible en el sitio público
                </span>
              </label>
            </Field>
          </div>
        </div>

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
                ? 'Crear aseguradora'
                : 'Guardar cambios'}
          </button>
          <Link
            href="/admin/aseguradoras"
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
