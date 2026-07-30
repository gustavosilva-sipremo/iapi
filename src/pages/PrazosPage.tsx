import { KpiStrip } from "@/components/KpiStrip"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { prazosKpis, prazosLista, type PrazoUrgencia } from "@/data/processos"
import { cn } from "@/lib/utils"

function urgBarClass(urgencia: PrazoUrgencia) {
  if (urgencia === "critico") return "bg-primary"
  if (urgencia === "alto") return "bg-[#a24a1e]"
  if (urgencia === "medio") return "bg-[#bc5a2c]"
  return "bg-muted-foreground/50"
}

export function PrazosPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="04 — Operação"
        title="Prazos"
        description="Organizados por urgência. Nada escapa."
      />

      <KpiStrip
        items={prazosKpis}
        columnsClassName="grid-cols-1 sm:grid-cols-3"
        style={{ animationDelay: "60ms" }}
      />

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
