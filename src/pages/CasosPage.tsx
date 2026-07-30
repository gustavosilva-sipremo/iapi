import { useState } from "react"
import { Plus } from "lucide-react"

import { FilterChips } from "@/components/FilterChips"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  casoFilters,
  casosPedidos,
  matchesCasoFilter,
  type CasoFilterId,
} from "@/data/mock"
import { badgeVariantFromTone } from "@/lib/status-badge"

export function CasosPage() {
  const [filter, setFilter] = useState<CasoFilterId>("todos")
  const rows = casosPedidos.filter((caso) => matchesCasoFilter(caso, filter))

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="06 — Meus processos"
        title="Meus Pedidos de Marca"
        description="Acompanhe depósitos, exames e registros — o andamento de cada pedido em um só lugar."
        action={
          <Button type="button" className="w-fit shrink-0">
            <Plus className="size-4" />
            Novo processo
          </Button>
        }
      />

      <FilterChips
        options={casoFilters}
        value={filter}
        onChange={setFilter}
        aria-label="Filtrar pedidos"
        className="animate-fade-in-up"
        style={{ animationDelay: "60ms" }}
      />

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        {/* Desktop table */}
        <div className="border-border/70 hidden overflow-hidden rounded-xl border md:block">
          <div className="text-muted-foreground grid grid-cols-[1.5fr_1.3fr_0.8fr_1.2fr_1.4fr] gap-4 border-b border-border/70 px-5 py-3 font-mono text-[10px] tracking-[0.12em] uppercase">
            <div>Marca / Nº INPI</div>
            <div>Cliente</div>
            <div>Classe</div>
            <div>Status</div>
            <div>Andamento</div>
          </div>

          <ul>
            {rows.map((caso) => (
              <li key={caso.id}>
                <button
                  type="button"
                  className="hover:bg-primary/[0.04] grid w-full grid-cols-[1.5fr_1.3fr_0.8fr_1.2fr_1.4fr] items-center gap-4 border-b border-border/60 px-5 py-4 text-left transition-colors last:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-display text-[15px] tracking-tight text-ink">
                      {caso.marca}
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
                      {caso.numero}
                    </p>
                  </div>
                  <p className="truncate text-sm text-ink">{caso.cliente}</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {caso.classe}
                  </p>
                  <div>
                    <Badge variant={badgeVariantFromTone(caso.tone)}>
                      {caso.status}
                    </Badge>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-blush-soft/70 h-1.5 overflow-hidden rounded-full">
                      <div
                        className="bg-brand-gradient h-full rounded-full transition-all"
                        style={{ width: `${caso.progress}%` }}
                      />
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-xs">
                      {caso.fase}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile list */}
        <ul className="flex flex-col md:hidden">
          {rows.map((caso) => (
            <li
              key={caso.id}
              className="border-border/70 border-b py-4 last:border-0"
            >
              <button type="button" className="w-full text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-base tracking-tight text-ink">
                      {caso.marca}
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
                      {caso.numero}
                    </p>
                  </div>
                  <Badge
                    variant={badgeVariantFromTone(caso.tone)}
                    className="shrink-0"
                  >
                    {caso.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  {caso.cliente} · {caso.classe}
                </p>
                <div className="mt-3">
                  <div className="bg-blush-soft/70 h-1.5 overflow-hidden rounded-full">
                    <div
                      className="bg-brand-gradient h-full rounded-full"
                      style={{ width: `${caso.progress}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground mt-1.5 text-xs">
                    {caso.fase}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {rows.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            Nenhum pedido neste filtro.
          </p>
        )}
      </section>
    </div>
  )
}
