import { KpiStrip } from "@/components/KpiStrip"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import {
  contasPagar,
  contasPagarTotal,
  contasReceber,
  contasReceberTotal,
  finKpis,
} from "@/data/gestao"
import { badgeVariantFromTituloStatus } from "@/lib/status-badge"

export function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="09 — Gestão"
        title="Financeiro"
        description="Contas, contratos e indicadores de receita do estúdio."
      />

      <KpiStrip items={finKpis} style={{ animationDelay: "60ms" }} />

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
                  <Badge variant={badgeVariantFromTituloStatus(item.status)}>
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
                  <Badge variant={badgeVariantFromTituloStatus(item.status)}>
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
