'use client'

import { useState, useTransition } from 'react'
import { LogIn, AlertCircle, Mail, Lock } from 'lucide-react'
import { signIn } from '../actions'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await signIn(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6">
      {/* Decorative gradient circles */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Logo size={70} />
          <div className="text-center mt-4">
            <div className="font-lato font-medium text-xs tracking-[0.35em] uppercase text-brand-gray">
              Clínica
            </div>
            <div className="font-lato font-medium text-3xl tracking-tight text-brand-dark">
              Latino
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white p-8 shadow-2xl shadow-brand-blue/10 border border-brand-surface">
          <div className="mb-7 text-center">
            <h1 className="font-lato text-brand-dark text-2xl font-bold mb-1">
              Panel de Administración
            </h1>
            <p className="font-lato text-brand-gray text-sm">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
                />
                <input
                  type="email"
                  name="email"
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="admin@clinicalatino.med.ec"
                  className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 pl-10 pr-4 py-3 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
                />
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 pl-10 pr-4 py-3 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span className="font-lato text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-3 bg-brand-gradient disabled:opacity-60 text-white font-lato font-bold py-3.5 text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-brand-teal/30"
            >
              {isPending ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {isPending ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        <p className="text-center font-lato text-xs text-brand-gray mt-6">
          ¿Problemas para acceder? Contacta al administrador del sistema.
        </p>
      </div>
    </div>
  )
}
