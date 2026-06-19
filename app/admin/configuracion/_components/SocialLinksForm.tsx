'use client'

import { useState, useTransition } from 'react'
import { Save, AlertCircle, CheckCircle, Share2 } from 'lucide-react'
import { updateSocialLinks } from '@/app/admin/actions'
import { SOCIAL_PLATFORMS } from '@/lib/social'
import SocialIcon from '@/components/SocialIcon'

export default function SocialLinksForm({
  initial,
}: {
  initial: Record<string, string | null>
}) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateSocialLinks(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3500)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 border border-brand-surface">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
          <Share2 className="text-brand-teal" size={18} />
        </div>
        <div>
          <h2 className="font-lato text-brand-dark text-lg font-bold">Redes sociales</h2>
          <p className="font-lato text-brand-gray text-xs mt-0.5">
            Aparecen como íconos en el footer. Solo se muestran las que tengan URL; deja
            vacías las que no uses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {SOCIAL_PLATFORMS.map((p) => (
          <div key={p.key}>
            <label className="flex items-center gap-2 font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
              <span className="text-brand-teal">
                <SocialIcon platform={p.key} size={14} />
              </span>
              {p.label}
            </label>
            <input
              type="url"
              name={p.key}
              defaultValue={initial[p.key] ?? ''}
              placeholder={p.placeholder}
              className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/40 bg-white transition-all"
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-start gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">Redes sociales guardadas.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white font-lato font-bold py-3 px-6 text-sm tracking-wide disabled:opacity-60 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
      >
        {isPending ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save size={16} />
        )}
        {isPending ? 'Guardando...' : 'Guardar redes'}
      </button>
    </form>
  )
}
