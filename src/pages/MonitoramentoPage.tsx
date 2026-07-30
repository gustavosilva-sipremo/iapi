import { useMemo, useState } from "react"

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

  const alertas = useMemo(
    () => monitorAlertas.filter((a) => matchesMonitorSource(a, source)),
    [source]
  )

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-3xl">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          04 — Inteligência INPI
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Monitoramento & colidência
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Robô vigiando suas marcas na base do{" "}
          <strong className="font-medium text-ink">INPI (RPI)</strong> e na{" "}
          <strong className="font-medium text-ink">internet inteira</strong> —
          domínios, redes sociais e marketplaces. Detectou semelhança? Você é
          avisada na hora.
        </p>
      </section>

      <section
        className="animate-fade-in-up grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        style={{ animationDelay: "60ms" }}
      >
        {monitorStats.map((stat) => (
          <div
            key={stat.id}
            className="border-border/80 border-b pb-3 sm:pb-4"
          >
            <p className="text-muted-foreground text-[11px] tracking-wide sm:text-[12px]">
              {stat.label}
            </p>
            <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
              {stat.live && (
                <span
                  className="relative flex size-2"
                  aria-label="Ao vivo"
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3e5b45] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#3e5b45]" />
                </span>
              )}
              <p
                className={cn(
                  "font-display text-2xl tracking-tight tabular-nums sm:text-3xl",
                  stat.tone === "success" && "text-[#3e5b45] dark:text-[#b7c9b0]",
                  stat.tone === "danger" && "text-primary",
                  stat.tone === "default" && "text-ink"
                )}
              >
                {stat.value}
              </p>
            </div>
            <p className="text-muted-foreground mt-1 text-[11px] sm:mt-1.5 sm:text-xs">
              {stat.sub}
            </p>
          </div>
        ))}
      </section>

      <section
        className="animate-fade-in-up flex flex-wrap gap-1.5"
        style={{ animationDelay: "100ms" }}
        role="group"
        aria-label="Filtrar por fonte"
      >
        {monitorSources.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={source === item.id ? "default" : "outline"}
            className={cn(
              source !== item.id && "border-border/80 bg-transparent"
            )}
            onClick={() => setSource(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </section>

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
