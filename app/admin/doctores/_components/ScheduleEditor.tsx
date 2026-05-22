'use client'

import { useState } from 'react'
import { Plus, X, Clock, Copy } from 'lucide-react'
import { WEEK_DAYS, formatSchedule } from '@/lib/doctors'
import type { ScheduleBlock, WeekDay } from '@/lib/types'

const DEFAULT_START = '09:00'
const DEFAULT_END = '17:00'

export default function ScheduleEditor({
  initialBlocks = [],
}: {
  initialBlocks?: ScheduleBlock[]
}) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(initialBlocks)

  const addBlock = (day?: WeekDay) => {
    setBlocks((prev) => [
      ...prev,
      { day: day ?? 'mon', start: DEFAULT_START, end: DEFAULT_END },
    ])
  }

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index))
  }

  const updateBlock = (index: number, field: keyof ScheduleBlock, value: string) => {
    setBlocks((prev) =>
      prev.map((b, i) =>
        i === index ? ({ ...b, [field]: value } as ScheduleBlock) : b
      )
    )
  }

  const duplicateBlock = (index: number) => {
    setBlocks((prev) => {
      const next = [...prev]
      next.splice(index + 1, 0, { ...prev[index] })
      return next
    })
  }

  /** Quick-add lunes a viernes con el horario del primer bloque */
  const applyWeekdaysQuickAction = () => {
    const start = blocks[0]?.start ?? DEFAULT_START
    const end = blocks[0]?.end ?? DEFAULT_END
    const newBlocks: ScheduleBlock[] = []
    const weekdays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri']
    for (const d of weekdays) {
      if (!blocks.some((b) => b.day === d && b.start === start && b.end === end)) {
        newBlocks.push({ day: d, start, end })
      }
    }
    setBlocks((prev) => [...prev, ...newBlocks])
  }

  const clearAll = () => setBlocks([])

  return (
    <div>
      {/* Input oculto que serializa los bloques al form */}
      <input
        type="hidden"
        name="schedule_days_json"
        value={JSON.stringify(blocks)}
      />

      {/* Vista previa textual */}
      <div className="bg-brand-surface px-4 py-3 mb-4 border-l-2 border-brand-teal">
        <div className="font-lato text-[10px] uppercase tracking-wider font-bold text-brand-gray mb-1">
          Vista previa
        </div>
        <div className="font-lato text-sm text-brand-dark">
          {blocks.length === 0 ? (
            <span className="text-brand-gray italic">Sin horarios configurados</span>
          ) : (
            formatSchedule(blocks)
          )}
        </div>
      </div>

      {/* Bloques */}
      <div className="space-y-2">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-white border border-brand-dark/10 p-3"
          >
            <Clock size={14} className="text-brand-teal flex-shrink-0" />

            <select
              value={block.day}
              onChange={(e) => updateBlock(i, 'day', e.target.value)}
              className="border border-brand-dark/10 focus:border-brand-teal focus:outline-none px-2 py-1.5 font-lato text-sm bg-white"
            >
              {WEEK_DAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 flex-1">
              <input
                type="time"
                value={block.start}
                onChange={(e) => updateBlock(i, 'start', e.target.value)}
                className="border border-brand-dark/10 focus:border-brand-teal focus:outline-none px-2 py-1.5 font-lato text-sm w-28 bg-white"
                required
              />
              <span className="text-brand-gray font-lato text-sm">–</span>
              <input
                type="time"
                value={block.end}
                onChange={(e) => updateBlock(i, 'end', e.target.value)}
                className="border border-brand-dark/10 focus:border-brand-teal focus:outline-none px-2 py-1.5 font-lato text-sm w-28 bg-white"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => duplicateBlock(i)}
              className="p-1.5 text-brand-gray hover:text-brand-teal transition-colors"
              title="Duplicar bloque"
            >
              <Copy size={14} />
            </button>
            <button
              type="button"
              onClick={() => removeBlock(i)}
              className="p-1.5 text-brand-gray hover:text-red-600 transition-colors"
              title="Eliminar bloque"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          onClick={() => addBlock()}
          className="inline-flex items-center gap-1.5 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold transition-colors"
        >
          <Plus size={14} />
          Agregar bloque
        </button>

        <span className="text-brand-gray">·</span>

        <button
          type="button"
          onClick={applyWeekdaysQuickAction}
          className="text-brand-gray hover:text-brand-dark font-lato text-sm transition-colors"
        >
          Lun–Vie con mismo horario
        </button>

        {blocks.length > 0 && (
          <>
            <span className="text-brand-gray">·</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-brand-gray hover:text-red-600 font-lato text-sm transition-colors"
            >
              Limpiar todo
            </button>
          </>
        )}
      </div>

      <p className="font-lato text-xs text-brand-gray mt-3 leading-relaxed">
        Agrega un bloque por cada día/rango de atención. Puedes tener múltiples bloques
        por día (ej. mañana y tarde).
      </p>
    </div>
  )
}
