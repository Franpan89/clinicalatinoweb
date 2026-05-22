'use client'

import { useState, useTransition } from 'react'
import { Trash2, X, AlertTriangle } from 'lucide-react'
import { deleteDoctor } from '@/app/admin/actions'

export default function DeleteDoctorButton({ id, name }: { id: string; name: string }) {
  const [confirm, setConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteDoctor(id)
    })
  }

  if (!confirm) {
    return (
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-lato text-xs font-bold uppercase tracking-wider transition-colors ml-2"
      >
        <Trash2 size={12} />
        Eliminar
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-6 border border-red-200">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="font-lato text-brand-dark text-lg font-bold mb-1">
              ¿Eliminar este médico?
            </h3>
            <p className="font-lato text-brand-gray text-sm leading-relaxed">
              Vas a eliminar permanentemente a <strong>{name}</strong>. Esta acción no se
              puede deshacer y desaparecerá del sitio público de inmediato.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConfirm(false)}
            className="text-brand-gray hover:text-brand-dark p-1"
            aria-label="Cancelar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setConfirm(false)}
            disabled={isPending}
            className="font-lato text-sm font-bold px-5 py-2.5 text-brand-dark hover:bg-brand-surface transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="font-lato text-sm font-bold px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60"
          >
            {isPending ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
