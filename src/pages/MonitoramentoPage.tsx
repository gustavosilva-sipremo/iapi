import { useState } from "react"

import { FilterChips } from "@/components/FilterChips"
import { KpiStrip } from "@/components/KpiStrip"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  matchesMonitorSource,
  monitorAlertas,
  monitorSources,
  monitorStats,
  type AlertaSeveridade,
  type MonitorSourceId,
} from "@/data/inpi"
import { cn } from "@/lib/utils"

function similarityColor(sev: AlertaSeveridade) {
  if (sev === "critico") return "text-primary"
  if (sev === "alto") return "text-[#a24a1e] dark:text-[#e0a888]"
  if (sev === "medio") return "text-[#bc5a2c] dark:text-[#e0b090]"
  return "text-muted-foreground"
}

export function MonitoramentoPage() {
  const [source, setSource] = useState<MonitorSourceId>("todas")
  const alertas = monitorAlertas.filter((a) => matchesMonitorSource(a, source))

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="04 — Inteligência INPI"
        title="Monitoramento & colidência"
        maxWidthClassName="max-w-3xl"
        description={
          <>
            Robô vigiando suas marcas na base do{" "}
            <strong className="font-medium text-ink">INPI (RPI)</strong> e na{" "}
            <strong className="font-medium text-ink">internet inteira</strong> —
            domínios, redes sociais e marketplaces. Detectou semelhança? Você é
            avisada na hora.
          </>
        }
      />

      <KpiStrip items={monitorStats} style={{ animationDelay: "60ms" }} />

      <FilterChips
        options={monitorSources}
        value={source}
        onChange={setSource}
        aria-label="Filtrar por fonte"
        className="animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      />

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "140ms" }}
      >
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 sm:mb-5">
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Alertas de colidência
          </h3>
          <span className="text-muted-foreground font-mono text-[11px]">
            ordem: prioridade
          </span>
        </div>

        <ul className="flex flex-col">
          {alertas.map((alerta) => (
            <li
              key={alerta.id}
              className="border-border/70 flex flex-col gap-3 border-b py-4 last:border-0 sm:flex-row sm:items-center sm:gap-5 sm:py-5"
            >
              <div
                className={cn(
                  "font-display shrink-0 text-2xl tracking-tight tabular-nums sm:w-16 sm:text-3xl",
                  similarityColor(alerta.severidade)
                )}
              >
                {alerta.similaridade}
                <span className="text-base">%</span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-base tracking-tight text-ink sm:text-[17px]">
                    {alerta.conflito}
                  </span>
                  <Badge
                    variant={alerta.fonte === "INPI" ? "soft" : "info"}
                    className="font-mono text-[10px] tracking-wide uppercase"
                  >
                    {alerta.fonte}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Colide com{" "}
                  <strong className="font-medium text-ink">
                    {alerta.protegida}
                  </strong>{" "}
                  · {alerta.escopo} · {alerta.origem}
                </p>
              </div>

              <p className="text-muted-foreground shrink-0 font-mono text-[11px] sm:w-24 sm:text-right">
                {alerta.date}
              </p>

              <div className="flex shrink-0 flex-wrap gap-1.5 sm:flex-col sm:items-stretch lg:flex-row">
                <Button type="button" size="sm">
                  Analisar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-border/80"
                >
                  Notificar cliente
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {alertas.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            Nenhum alerta nesta fonte.
          </p>
        )}
      </section>
    </div>
  )
}
