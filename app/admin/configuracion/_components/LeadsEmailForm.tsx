'use client'

import { useState, useTransition } from 'react'
import { Save, AlertCircle, CheckCircle, Mail, Info } from 'lucide-react'
import { updateLeadsEmail } from '@/app/admin/actions'

export default function LeadsEmailForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateLeadsEmail(formData)
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
          <Mail className="text-brand-teal" size={18} />
        </div>
        <div>
          <h2 className="font-lato text-brand-dark text-lg font-bold">
            Correo de notificaciones (Leads)
          </h2>
          <p className="font-lato text-brand-gray text-xs mt-0.5">
            Email al que llegarán las nuevas solicitudes de cita enviadas desde el sitio.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-brand-surface/50 border-l-2 border-brand-blue px-4 py-3 mb-6">
        <Info size={14} className="text-brand-blue flex-shrink-0 mt-0.5" />
        <div className="font-lato text-xs text-brand-dark/80 leading-relaxed">
          Las solicitudes ya se guardan en la base de datos. Para que también lleguen
          notificaciones por email a esta dirección, se requiere conectar un servicio de
          envío (Resend / SendGrid / Supabase Edge Function). Mientras tanto, este valor
          queda guardado y listo para usar.
        </div>
      </div>

      <div className="mb-5">
        <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
          Email principal de leads
        </label>
        <input
          type="email"
          name="leads_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="recepcion@clinicalatino.med.ec"
          className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all"
        />
        <p className="font-lato text-xs text-brand-gray mt-1.5">
          Recomendamos un email genérico (no personal) como{' '}
          <code className="bg-brand-surface px-1 py-0.5">recepcion@</code> o{' '}
          <code className="bg-brand-surface px-1 py-0.5">contacto@</code>.
        </p>
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
          <span className="font-lato text-sm">Email guardado correctamente.</span>
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
        {isPending ? 'Guardando...' : 'Guardar email'}
      </button>
    </form>
  )
}
