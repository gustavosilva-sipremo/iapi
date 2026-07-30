import { useState } from "react"
import { Plus, Search } from "lucide-react"

import { FilterChips } from "@/components/FilterChips"
import { PageHeader } from "@/components/PageHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  clienteFilters,
  clientesLista,
  matchesClienteFilter,
  type ClienteFilterId,
} from "@/data/relacionamento"
import { badgeVariantFromClienteStatus } from "@/lib/status-badge"

export function ClientesPage() {
  const [filter, setFilter] = useState<ClienteFilterId>("todos")
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const rows = clientesLista.filter((cliente) => {
    if (!matchesClienteFilter(cliente, filter)) return false
    if (!q) return true
    return (
      cliente.nome.toLowerCase().includes(q) ||
      cliente.segmento.toLowerCase().includes(q) ||
      cliente.contato.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="07 — Relacionamento"
        title="Clientes"
        description="CRM editorial com histórico de relacionamento e carteira de marcas."
        action={
          <Button type="button" className="w-fit shrink-0">
            <Plus className="size-4" />
            Novo cliente
          </Button>
        }
      />

      <section
        className="animate-fade-in-up flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        style={{ animationDelay: "60ms" }}
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cliente…"
            className="bg-card/50 h-9 pl-9"
            aria-label="Buscar cliente"
          />
        </div>

        <FilterChips
          options={clienteFilters}
          value={filter}
          onChange={setFilter}
          aria-label="Filtrar clientes"
        />
      </section>

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <div className="border-border/70 hidden overflow-hidden rounded-xl border md:block">
          <div className="text-muted-foreground grid grid-cols-[1.8fr_1.2fr_0.7fr_1fr_0.9fr] gap-4 border-b border-border/70 px-5 py-3 font-mono text-[10px] tracking-[0.12em] uppercase">
            <div>Cliente</div>
            <div>Segmento</div>
            <div>Marcas</div>
            <div>Status</div>
            <div>Cliente desde</div>
          </div>
          <ul>
            {rows.map((cliente) => (
              <li key={cliente.id}>
                <button
                  type="button"
                  className="hover:bg-primary/[0.04] grid w-full grid-cols-[1.8fr_1.2fr_0.7fr_1fr_0.9fr] items-center gap-4 border-b border-border/60 px-5 py-3.5 text-left transition-colors last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-9 ring-1 ring-border">
                      <AvatarFallback
                        className="font-display text-[11px] text-white"
                        style={{ background: cliente.avColor }}
                      >
                        {cliente.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {cliente.nome}
                      </p>
                      <p className="text-muted-foreground mt-0.5 truncate text-xs">
                        {cliente.tipo} · {cliente.contato}
                      </p>
                    </div>
                  </div>
                  <p className="truncate text-sm text-ink">{cliente.segmento}</p>
                  <p className="font-mono text-sm tabular-nums text-ink">
                    {cliente.marcas}
                  </p>
                  <div>
                    <Badge
                      variant={badgeVariantFromClienteStatus(cliente.status)}
                    >
                      {cliente.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm tabular-nums">
                    {cliente.since}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col md:hidden">
          {rows.map((cliente) => (
            <li
              key={cliente.id}
              className="border-border/70 border-b py-4 last:border-0"
            >
              <button type="button" className="flex w-full gap-3 text-left">
                <Avatar className="size-10 shrink-0 ring-1 ring-border">
                  <AvatarFallback
                    className="font-display text-xs text-white"
                    style={{ background: cliente.avColor }}
                  >
                    {cliente.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-ink">{cliente.nome}</p>
                    <Badge
                      variant={badgeVariantFromClienteStatus(cliente.status)}
                      className="shrink-0"
                    >
                      {cliente.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {cliente.segmento} · {cliente.marcas} marcas
                  </p>
                  <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                    desde {cliente.since}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {rows.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            Nenhum cliente encontrado.
          </p>
        )}
      </section>
    </div>
  )
}
