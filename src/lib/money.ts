/** Parse values like "R$ 8.500" / "R$ 12.000" → number */
export function parseBrl(value: string): number {
  const cleaned = value.replace(/[^\d]/g, "")
  return cleaned ? Number(cleaned) : 0
}

/** Format as compact thousands label, e.g. 20500 → "R$ 21k" */
export function formatBrlCompact(amount: number): string {
  if (amount >= 1000) {
    const k = Math.round(amount / 1000)
    return `R$ ${k}k`
  }
  return `R$ ${amount}`
}
