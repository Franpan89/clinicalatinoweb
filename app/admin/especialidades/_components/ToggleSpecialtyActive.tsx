'use client'

import { useTransition, useState } from 'react'
import { toggleSpecialtyActive } from '@/app/admin/actions'

export default function ToggleSpecialtyActive({
  id,
  active,
}: {
  id: string
  active: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [isActive, setIsActive] = useState(active)

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleSpecialtyActive(id, isActive)
      if (result && 'success' in result) {
        setIsActive(!isActive)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex items-center h-6 w-11 transition-colors duration-200 ${
        isActive ? 'bg-brand-teal' : 'bg-brand-dark/15'
      } disabled:opacity-50`}
      aria-label={isActive ? 'Desactivar' : 'Activar'}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white shadow transition-transform duration-200 ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
