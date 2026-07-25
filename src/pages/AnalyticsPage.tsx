import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  analyticsRangeFilters,
  avgTimeToRegister,
  depositsByMonth,
  portfolioStatus,
  topNiceClasses,
  type AnalyticsRangeId,
} from "@/data/mock"
import { cn } from "@/lib/utils"

const LINE_W = 620
const LINE_H = 150

function buildLineGeometry(values: number[]) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * LINE_W
    const y = LINE_H - ((v - min) / span) * (LINE_H - 20) - 10
    return { x, y }
  })
  const linePts = points.map((p) => `${p.x.toFixed(0)},${p.y.toFixed(1)}`).join(" ")
  const areaPts = `0,${LINE_H} ${linePts} ${LINE_W},${LINE_H}`
  return { linePts, areaPts }
}

function buildDonutGradient(
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

export function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRangeId>("trimestre")

  const barMax = Math.max(...depositsByMonth.values)
  const { linePts, areaPts } = useMemo(
    () => buildLineGeometry(avgTimeToRegister),
    []
  )
  const donutGradient = useMemo(
    () => buildDonutGradient(portfolioStatus.segments),
    []
  )

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
            02 — Inteligência
          </p>
          <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
            Analytics
          </h2>
          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
            Inteligência estratégica da carteira de marcas — volume, status,
            prazos e classes NCL.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Período"
        >
          {analyticsRangeFilters.map((filter) => (
            <Button
              key={filter.id}
              type="button"
              size="sm"
              variant={range === filter.id ? "default" : "outline"}
              className={cn(
                range !== filter.id && "border-border/80 bg-transparent"
              )}
              onClick={() => setRange(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      <section
        className="animate-fade-in-up grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10"
        style={{ animationDelay: "60ms" }}
      >
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-lg tracking-tight sm:text-xl">
                Depósitos por mês
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Volume de novos processos · {depositsByMonth.year}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
                {depositsByMonth.total}
              </p>
              <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
                {depositsByMonth.delta}
              </p>
            </div>
          </div>

          <div
            className="flex h-44 items-end gap-1.5 sm:h-52 sm:gap-2"
            role="img"
            aria-label={`Depósitos mensais em ${depositsByMonth.year}, total ${depositsByMonth.total}`}
          >
            {depositsByMonth.values.map((value, index) => {
              const heightPct = Math.round((value / barMax) * 100)
              const isLast = index === depositsByMonth.values.length - 1
              return (
                <div
                  key={`${depositsByMonth.months[index]}-${index}`}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className={cn(
                      "chart-bar w-full origin-bottom rounded-t-[5px]",
                      isLast ? "bg-primary" : "bg-primary/45"
                    )}
                    style={{
                      height: `${heightPct}%`,
                      animationDelay: `${index * 40}ms`,
                    }}
                    title={`${depositsByMonth.months[index]}: ${value}`}
                  />
                  <span className="text-muted-foreground font-mono text-[9.5px]">
                    {depositsByMonth.months[index]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-border/60 lg:border-l lg:pl-10">
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Status da carteira
          </h3>
          <p className="text-muted-foreground mt-1 mb-6 text-sm">
            {portfolioStatus.active} processos ativos
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div
              className="relative size-36 shrink-0 rounded-full sm:size-40"
              style={{ background: donutGradient }}
              role="img"
              aria-label={`Taxa de deferimento ${portfolioStatus.deferralRate}`}
            >
              <div className="bg-background absolute inset-[18%] flex flex-col items-center justify-center rounded-full">
                <span className="font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
                  {portfolioStatus.deferralRate}
                </span>
                <span className="text-muted-foreground mt-0.5 text-[11px]">
                  deferimento
                </span>
              </div>
            </div>

            <ul className="flex w-full flex-col gap-2.5">
              {portfolioStatus.segments.map((segment) => (
                <li
                  key={segment.id}
                  className="flex items-center gap-2.5 text-[13px]"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-[3px]"
                    style={{ background: segment.color }}
                    aria-hidden
                  />
                  <span className="flex-1 text-ink">{segment.label}</span>
                  <span className="text-muted-foreground font-mono tabular-nums">
                    {segment.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="animate-fade-in-up grid gap-8 sm:gap-10 lg:grid-cols-2"
        style={{ animationDelay: "120ms" }}
      >
        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Tempo médio até registro
          </h3>
          <p className="text-muted-foreground mt-1 mb-5 text-sm">
            Semanas médias do depósito à concessão · {depositsByMonth.year}
          </p>

          <svg
            viewBox={`0 0 ${LINE_W} ${LINE_H}`}
            className="text-primary h-auto w-full overflow-visible"
            role="img"
            aria-label="Evolução do tempo médio até registro ao longo do ano"
          >
            <polygon
              points={areaPts}
              className="fill-primary/15 dark:fill-primary/25"
            />
            <polyline
              points={linePts}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line"
            />
          </svg>
          <div className="text-muted-foreground mt-2 flex justify-between font-mono text-[9.5px]">
            {["JAN", "MAR", "MAI", "JUL", "SET", "NOV"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Top classes NCL
          </h3>
          <p className="text-muted-foreground mt-1 mb-5 text-sm">
            Distribuição da carteira por classe de Nice.
          </p>

          <ul className="flex flex-col gap-4">
            {topNiceClasses.map((item, index) => (
              <li key={item.cls}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[13px]">
                  <span>
                    <strong className="font-medium text-ink">{item.cls}</strong>
                    <span className="text-muted-foreground">
                      {" "}
                      · {item.name}
                    </span>
                  </span>
                  <span className="text-muted-foreground font-mono tabular-nums">
                    {item.count}
                  </span>
                </div>
                <div className="bg-blush-soft/70 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="chart-bar bg-brand-gradient h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      animationDelay: `${index * 50}ms`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
