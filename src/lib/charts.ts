export function buildLineGeometry(
  values: number[],
  width = 620,
  height = 150
) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - ((v - min) / span) * (height - 20) - 10
    return { x, y }
  })
  const linePts = points.map((p) => `${p.x.toFixed(0)},${p.y.toFixed(1)}`).join(" ")
  const areaPts = `0,${height} ${linePts} ${width},${height}`
  return { linePts, areaPts, width, height }
}

export function buildDonutGradient(
  segments: { value: number; color: string }[]
): string {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  let cursor = 0
  const stops: string[] = []
  for (const segment of segments) {
    const start = (cursor / total) * 100
    cursor += segment.value
    const end = (cursor / total) * 100
    stops.push(`${segment.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`)
  }
  return `conic-gradient(from -90deg, ${stops.join(", ")})`
}
