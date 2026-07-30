import { Badge } from "@/components/ui/badge"
import {
  contasPagar,
  contasPagarTotal,
  contasReceber,
  contasReceberTotal,
  finKpis,
  type TituloStatus,
} from "@/data/gestao"
import { cn } from "@/lib/utils"

function kpiValueClass(tone: (typeof finKpis)[number]["tone"]) {
  if (tone === "emphasis") return "text-ink"
  if (tone === "success") return "text-[#3f5a3a] dark:text-[#b7c9b0]"
  if (tone === "danger") return "text-primary"
  if (tone === "warning") return "text-primary"
  return "text-ink"
}

function tituloVariant(status: TituloStatus) {
  if (status === "Pago") return "success" as const
  if (status === "Atrasado") return "danger" as const
  if (status === "Agendado") return "info" as const
  return "bronze" as const
}

export function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-2xl">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          09 — Gestão
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Financeiro
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Contas, contratos e indicadores de receita do estúdio.
        </p>
      </section>

      <section
        className="animate-fade-in-up grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        style={{ animationDelay: "60ms" }}
      >
        {finKpis.map((kpi) => (
          <div
            key={kpi.id}
            className={cn(
              "border-border/80 border-b pb-3 sm:pb-4",
              kpi.tone === "emphasis" && "border-primary/30"
            )}
          >
            <p className="text-muted-foreground text-[11px] tracking-wide sm:text-[12px]">
              {kpi.label}
            </p>
            <p
              className={cn(
                "font-display mt-1.5 text-xl tracking-tight tabular-nums sm:mt-2 sm:text-2xl md:text-3xl",
                kpiValueClass(kpi.tone)
              )}
            >
              {kpi.value}
            </p>
            <p className="text-muted-foreground mt-1 text-[11px] sm:mt-1.5 sm:text-xs">
              {kpi.sub}
            </p>
          </div>
        ))}
      </section>

      <section
        className="animate-fade-in-up grid gap-8 sm:gap-10 lg:grid-cols-2"
        style={{ animationDelay: "120ms" }}
      >
        <div>
          <div className="mb-4 flex items-baseline justify-between gap-3 sm:mb-5">
            <h3 className="font-display text-lg tracking-tight sm:text-xl">
              Contas a receber
            </h3>
            <span className="font-display text-base tracking-tight text-ink tabular-nums">
              {contasReceberTotal}
            </span>
          </div>
          <ul className="flex flex-col">
            {contasReceber.map((item) => (
              <li
                key={item.id}
                className="border-border/70 flex flex-col gap-2 border-b py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{item.cliente}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {item.descricao} · vence {item.venc}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <p className="font-mono text-sm font-medium text-ink tabular-nums">
                    {item.valor}
                  </p>
                  <Badge variant={tituloVariant(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-baseline justify-between gap-3 sm:mb-5">
            <h3 className="font-display text-lg tracking-tight sm:text-xl">
              Contas a pagar
            </h3>
            <span className="font-display text-base tracking-tight text-ink tabular-nums">
              {contasPagarTotal}
            </span>
          </div>
          <ul className="flex flex-col">
            {contasPagar.map((item) => (
              <li
                key={item.id}
                className="border-border/70 flex flex-col gap-2 border-b py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    {item.fornecedor}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {item.descricao} · vence {item.venc}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <p className="font-mono text-sm font-medium text-ink tabular-nums">
                    {item.valor}
                  </p>
                  <Badge variant={tituloVariant(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
