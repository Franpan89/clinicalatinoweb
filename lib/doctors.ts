import type { ScheduleBlock, WeekDay } from '@/lib/types'

export const WEEK_DAYS: { value: WeekDay; short: string; label: string }[] = [
  { value: 'mon', short: 'Lun', label: 'Lunes' },
  { value: 'tue', short: 'Mar', label: 'Martes' },
  { value: 'wed', short: 'Mié', label: 'Miércoles' },
  { value: 'thu', short: 'Jue', label: 'Jueves' },
  { value: 'fri', short: 'Vie', label: 'Viernes' },
  { value: 'sat', short: 'Sáb', label: 'Sábado' },
  { value: 'sun', short: 'Dom', label: 'Domingo' },
]

const DAY_ORDER: Record<WeekDay, number> = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
}

/** Genera el texto display del horario a partir de los bloques estructurados.
 *  Ej: "Lun · Mié · Vie · 09:00 – 17:00"
 *  Si los bloques tienen rangos diferentes por día, los agrupa por rango.
 */
export function formatSchedule(blocks: ScheduleBlock[] | null | undefined): string {
  if (!blocks || blocks.length === 0) return ''

  // Agrupa por mismo start-end
  const groups: Record<string, WeekDay[]> = {}
  for (const b of blocks) {
    const key = `${b.start}-${b.end}`
    if (!groups[key]) groups[key] = []
    groups[key].push(b.day)
  }

  const parts: string[] = []
  for (const range of Object.keys(groups)) {
    const days = groups[range]
    const sorted = [...days].sort((a: WeekDay, b: WeekDay) => DAY_ORDER[a] - DAY_ORDER[b])
    const dayLabels = sorted
      .map((d: WeekDay) => WEEK_DAYS.find((w) => w.value === d)?.short)
      .filter(Boolean)
      .join(' · ')
    const [start, end] = range.split('-')
    parts.push(`${dayLabels} · ${start} – ${end}`)
  }

  return parts.join(' / ')
}

export function getInitials(fullName: string): string {
  const cleaned = fullName.replace(/^(Dr\.|Dra\.)\s*/, '')
  const parts = cleaned.split(/\s+/)
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^(dr|dra)\.?\s*/, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Íconos lucide disponibles para especialidades (debe matchear iconMap en components) */
export const SPECIALTY_ICONS = [
  'heart',
  'baby',
  'stethoscope',
  'scissors',
  'sparkles',
  'dna',
  'activity',
  'brain',
  'eye',
  'bone',
  'pill',
  'microscope',
] as const

/** Gradientes de Tailwind disponibles para tarjetas de especialidad */
export const SPECIALTY_COLORS = [
  { value: 'from-red-950 to-red-900', label: 'Rojo profundo' },
  { value: 'from-sky-950 to-slate-900', label: 'Azul cielo' },
  { value: 'from-rose-950 to-pink-950', label: 'Rosa' },
  { value: 'from-indigo-950 to-navy-dark', label: 'Índigo' },
  { value: 'from-amber-950 to-yellow-950', label: 'Ámbar' },
  { value: 'from-emerald-950 to-teal-950', label: 'Esmeralda' },
  { value: 'from-slate-900 to-slate-800', label: 'Slate' },
  { value: 'from-purple-950 to-violet-950', label: 'Púrpura' },
  { value: 'from-cyan-950 to-blue-950', label: 'Cian' },
  { value: 'from-orange-950 to-red-950', label: 'Naranja' },
]
