import type { ScheduleBlock, WeekDay } from '@/lib/types'
import type { Locale } from '@/lib/i18n/config'

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

const WEEK_DAY_SHORT_EN: Record<WeekDay, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

/** Genera el texto display del horario a partir de los bloques estructurados.
 *  Ej: "Lun · Mié · Vie · 09:00 – 17:00" (en inglés: "Mon · Wed · Fri · 09:00 – 17:00")
 *  Si los bloques tienen rangos diferentes por día, los agrupa por rango.
 */
export function formatSchedule(
  blocks: ScheduleBlock[] | null | undefined,
  locale: Locale = 'es'
): string {
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
      .map((d: WeekDay) =>
        locale === 'en' ? WEEK_DAY_SHORT_EN[d] : WEEK_DAYS.find((w) => w.value === d)?.short
      )
      .filter(Boolean)
      .join(' · ')
    const [start, end] = range.split('-')
    parts.push(`${dayLabels} · ${start} – ${end}`)
  }

  return parts.join(' / ')
}

/** Idiomas que el admin suele cargar a mano en `doctors.languages` (texto libre). */
const LANGUAGE_EN: Record<string, string> = {
  español: 'Spanish',
  inglés: 'English',
  francés: 'French',
  alemán: 'German',
  italiano: 'Italian',
  portugués: 'Portuguese',
  quichua: 'Quichua',
  kichwa: 'Kichwa',
  árabe: 'Arabic',
  chino: 'Chinese',
  japonés: 'Japanese',
  ruso: 'Russian',
}

/** Traduce el nombre de un idioma cargado en español; si no lo conoce, lo deja igual. */
export function localizeLanguage(language: string, locale: Locale): string {
  if (locale === 'es') return language
  return LANGUAGE_EN[language.trim().toLowerCase()] ?? language
}

/** Minúsculas y sin tildes, para comparar tokens. */
function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/** Partículas que forman parte de un apellido compuesto ("de la Torre", "del Pino"). */
const SURNAME_PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'van', 'von', 'da', 'di'])

/** Segundos nombres frecuentes ("María José", "Juan Pablo", "Luis Fernando").
 *  Sirven para distinguir, en un nombre de 3 palabras, "María José Carrasco"
 *  (apellido: Carrasco) de "Eduardo Vásquez Andrade" (apellido: Vásquez).
 */
const COMPOUND_GIVEN_NAMES = new Set([
  'jose', 'maria', 'juan', 'luis', 'carlos', 'fernando', 'pablo', 'andres', 'antonio',
  'alejandro', 'eduardo', 'xavier', 'javier', 'francisco', 'miguel', 'manuel', 'alberto',
  'ricardo', 'roberto', 'patricio', 'gabriel', 'daniel', 'david', 'sebastian', 'felipe',
  'fabian', 'rafael', 'enrique', 'ignacio', 'mauricio', 'marcelo', 'esteban', 'cesar',
  'hernan', 'edgar', 'byron', 'cristian', 'victor', 'oswaldo', 'isabel', 'elena', 'gabriela',
  'cristina', 'fernanda', 'alejandra', 'paola', 'lucia', 'carolina', 'veronica', 'patricia',
  'belen', 'cecilia', 'monica', 'alexandra', 'daniela', 'andrea', 'valeria', 'ximena',
  'eugenia', 'soledad', 'beatriz', 'catalina', 'natalia', 'rocio', 'sofia', 'sandra',
])

/**
 * Separa un nombre completo en nombres de pila y apellidos, sin el título "Dr./Dra.".
 * Convención hispana: nombres de pila + primer apellido + segundo apellido.
 *  - 1 palabra: es el apellido.
 *  - 2 palabras: nombre + apellido.
 *  - 3 palabras: si la 2.ª es un segundo nombre frecuente → 2 nombres + 1 apellido;
 *    si no → 1 nombre + 2 apellidos.
 *  - 4 o más: 2 nombres + el resto son apellidos.
 * Las partículas ("de", "del", "de la"…) se unen al apellido que sigue.
 */
function splitName(fullName: string): { given: string[]; surnames: string[] } {
  const stripped = fullName.replace(/^\s*(dra?|doctora?)\.?\s+/i, '').trim()
  const units: string[] = []
  let pending: string[] = []
  for (const token of stripped.split(/\s+/).filter(Boolean)) {
    if (SURNAME_PARTICLES.has(normalizeToken(token)) && units.length > 0) {
      pending.push(token)
      continue
    }
    units.push([...pending, token].join(' '))
    pending = []
  }
  if (pending.length > 0) units.push(pending.join(' '))

  if (units.length <= 1) return { given: [], surnames: units }
  if (units.length === 2) return { given: [units[0]], surnames: [units[1]] }
  if (units.length === 3) {
    return COMPOUND_GIVEN_NAMES.has(normalizeToken(units[1]))
      ? { given: units.slice(0, 2), surnames: [units[2]] }
      : { given: [units[0]], surnames: units.slice(1) }
  }
  return { given: units.slice(0, 2), surnames: units.slice(2) }
}

/** Claves de orden, en este orden: primer apellido, segundo apellido (vacío si no tiene), nombres. */
function sortKeys(fullName: string): [string, string, string] {
  const { given, surnames } = splitName(fullName)
  return [surnames[0] ?? '', surnames.slice(1).join(' '), given.join(' ')]
}

/** Orden alfabético por primer apellido (ignora "Dr./Dra." y tildes).
 *  Desempata por segundo apellido (quien no lo tiene va primero), luego por nombre
 *  y al final por display_order. No muta el arreglo recibido.
 */
export function sortDoctorsAlphabetically<T extends { full_name: string; display_order: number }>(
  doctors: T[]
): T[] {
  const collator = new Intl.Collator('es', { sensitivity: 'base' })
  return [...doctors].sort((a, b) => {
    const keysA = sortKeys(a.full_name)
    const keysB = sortKeys(b.full_name)
    for (let i = 0; i < keysA.length; i++) {
      const diff = collator.compare(keysA[i], keysB[i])
      if (diff !== 0) return diff
    }
    return a.display_order - b.display_order
  })
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
