/** ISO date: YYYY-MM-DD */

const BR_DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/

export function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`
}

export function parseIsoDate(iso: string): { y: number; m: number; d: number } | null {
  const match = ISO_DATE_RE.exec(iso)
  if (!match) return null
  const y = Number(match[1])
  const m = Number(match[2])
  const d = Number(match[3])
  const date = new Date(y, m - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null
  }
  return { y, m, d }
}

/** Format ISO → dd/mm/yyyy */
export function formatDateBr(iso: string | null | undefined): string {
  if (!iso) return ""
  const parsed = parseIsoDate(iso)
  if (!parsed) return iso
  return `${pad2(parsed.d)}/${pad2(parsed.m)}/${parsed.y}`
}

/** Parse dd/mm/yyyy → ISO, or null if invalid */
export function parseDateBr(value: string): string | null {
  const match = BR_DATE_RE.exec(value.trim())
  if (!match) return null
  const d = Number(match[1])
  const m = Number(match[2])
  const y = Number(match[3])
  return parseIsoDate(toIsoDate(y, m, d)) ? toIsoDate(y, m, d) : null
}

export function todayIso(now = new Date()): string {
  return toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

export function startOfMonth(year: number, month: number): Date {
  return new Date(year, month - 1, 1)
}

/** Monday = 0 … Sunday = 6 */
export function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function monthLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`
}

export const WEEKDAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const
