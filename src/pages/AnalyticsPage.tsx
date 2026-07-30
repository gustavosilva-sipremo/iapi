import { useState } from "react"

import { FilterChips } from "@/components/FilterChips"
import { PageHeader } from "@/components/PageHeader"
import {
  analyticsRangeFilters,
  avgTimeByRange,
  depositsByRange,
  portfolioByRange,
  topClassesByRange,
  type AnalyticsRangeId,
} from "@/data/mock"
import { buildDonutGradient, buildLineGeometry } from "@/lib/charts"
import { cn } from "@/lib/utils"

const LINE_LABELS: Record<AnalyticsRangeId, string[]> = {
  mes: ["S1", "S2", "S3", "S4"],
  trimestre: ["ABR", "MAI", "JUN", "JUL"],
  ano: ["JAN", "MAR", "MAI", "JUL", "SET", "NOV"],
}

export function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRangeId>("trimestre")

  const deposits = depositsByRange[range]
  const portfolio = portfolioByRange[range]
  const avgTime = avgTimeByRange[range]
  const topClasses = topClassesByRange[range]
  const barMax = Math.max(...deposits.values)
  const { linePts, areaPts, width, height } = buildLineGeometry(avgTime)
  const donutGradient = buildDonutGradient(portfolio.segments)
  const lineLabels = LINE_LABELS[range]

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="02 — Inteligência"
        title="Analytics"
        description="Inteligência estratégica da carteira de marcas — volume, status, prazos e classes NCL."
        action={
          <FilterChips
            options={analyticsRangeFilters}
            value={range}
            onChange={setRange}
            aria-label="Período"
          />
        }
      />

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
                Volume de novos processos · {deposits.year}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
                {deposits.total}
              </p>
              <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
                {deposits.delta}
              </p>
            </div>
          </div>

          <div
            className="flex h-44 items-end gap-1.5 sm:h-52 sm:gap-2"
            role="img"
            aria-label={`Depósitos em ${deposits.year}, total ${deposits.total}`}
          >
            {deposits.values.map((value, index) => {
              const heightPct = Math.round((value / barMax) * 100)
              const isLast = index === deposits.values.length - 1
              return (
                <div
                  key={`${deposits.months[index]}-${index}`}
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
                    title={`${deposits.months[index]}: ${value}`}
                  />
                  <span className="text-muted-foreground font-mono text-[9.5px]">
                    {deposits.months[index]}
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
            {portfolio.active} processos ativos
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div
              className="relative size-36 shrink-0 rounded-full sm:size-40"
              style={{ background: donutGradient }}
              role="img"
              aria-label={`Taxa de deferimento ${portfolio.deferralRate}`}
            >
              <div className="bg-background absolute inset-[18%] flex flex-col items-center justify-center rounded-full">
                <span className="font-display text-2xl tracking-tight text-ink tabular-nums sm:text-3xl">
                  {portfolio.deferralRate}
                </span>
                <span className="text-muted-foreground mt-0.5 text-[11px]">
                  deferimento
                </span>
              </div>
            </div>

            <ul className="flex w-full flex-col gap-2.5">
              {portfolio.segments.map((segment) => (
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
            Semanas médias do depósito à concessão · {deposits.year}
          </p>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="text-primary h-auto w-full overflow-visible"
            role="img"
            aria-label="Evolução do tempo médio até registro"
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
            {lineLabels.map((label) => (
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
            {topClasses.map((item, index) => (
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
