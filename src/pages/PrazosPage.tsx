import { Badge } from "@/components/ui/badge"
import { prazosKpis, prazosLista, type PrazoUrgencia } from "@/data/processos"
import { cn } from "@/lib/utils"

function urgBarClass(urgencia: PrazoUrgencia) {
  if (urgencia === "critico") return "bg-primary"
  if (urgencia === "alto") return "bg-[#a24a1e]"
  if (urgencia === "medio") return "bg-[#bc5a2c]"
  return "bg-muted-foreground/50"
}

function kpiValueClass(tone: (typeof prazosKpis)[number]["tone"]) {
  if (tone === "danger") return "text-primary"
  if (tone === "warning") return "text-[#a24a1e] dark:text-[#e0a888]"
  return "text-ink"
}

export function PrazosPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-2xl">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          04 — Operação
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Prazos
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Organizados por urgência. Nada escapa.
        </p>
      </section>

      <section
        className="animate-fade-in-up grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        style={{ animationDelay: "60ms" }}
      >
        {prazosKpis.map((kpi) => (
          <div
            key={kpi.id}
            className="border-border/80 flex items-end justify-between border-b pb-3 sm:block sm:pb-4"
          >
            <p className="text-muted-foreground text-[11px] tracking-wide sm:text-[12px]">
              {kpi.label}
            </p>
            <p
              className={cn(
                "font-display text-2xl tracking-tight tabular-nums sm:mt-2 sm:text-3xl",
                kpiValueClass(kpi.tone)
              )}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </section>

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <ul className="flex flex-col">
          {prazosLista.map((prazo) => (
            <li
              key={prazo.id}
              className="border-border/70 flex flex-col gap-3 border-b py-4 last:border-0 sm:flex-row sm:items-center sm:gap-4 sm:py-5"
            >
              <div
                className={cn(
                  "hidden h-12 w-1 shrink-0 rounded-full sm:block",
                  urgBarClass(prazo.urgencia)
                )}
                aria-hidden
              />

              <div className="flex items-center gap-3 sm:contents">
                <div
                  className={cn(
                    "h-10 w-1 shrink-0 rounded-full sm:hidden",
                    urgBarClass(prazo.urgencia)
                  )}
                  aria-hidden
                />
                <div className="border-border/70 flex size-14 shrink-0 flex-col items-center justify-center rounded-lg border sm:size-16">
                  <span className="font-display text-xl leading-none tracking-tight text-ink tabular-nums sm:text-2xl">
                    {prazo.dia}
                  </span>
                  <span className="text-muted-foreground mt-0.5 font-mono text-[10px] tracking-wide uppercase">
                    {prazo.mes}
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink sm:text-[15px]">
                  {prazo.titulo}
                </p>
                <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                  {prazo.marca} · {prazo.numero} · {prazo.cliente}
                </p>
              </div>

              <Badge variant="muted" className="w-fit shrink-0">
                {prazo.tipo}
              </Badge>

              <div className="shrink-0 sm:min-w-28 sm:text-right">
                <p
                  className={cn(
                    "text-sm font-medium",
                    prazo.urgencia === "critico"
                      ? "text-primary"
                      : "text-ink"
                  )}
                >
                  {prazo.vence}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {prazo.responsavel}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
