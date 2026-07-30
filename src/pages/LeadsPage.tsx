import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { leadColumns } from "@/data/relacionamento"

export function LeadsPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
            08 — Relacionamento
          </p>
          <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
            Leads & Propostas
          </h2>
          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
            Pipeline comercial do estúdio — do contato inicial ao fechamento.
          </p>
        </div>

        <Button type="button" className="w-fit shrink-0">
          <Plus className="size-4" />
          Novo lead
        </Button>
      </section>

      <section
        className="animate-fade-in-up -mx-1 overflow-x-auto px-1 pb-2"
        style={{ animationDelay: "80ms" }}
      >
        <div className="grid min-w-[68rem] grid-cols-5 gap-4 xl:min-w-0 xl:gap-5">
          {leadColumns.map((col) => (
            <div key={col.id} className="flex min-w-0 flex-col gap-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-medium text-ink">{col.title}</h3>
                <span className="font-display text-base tracking-tight text-ink tabular-nums">
                  {col.value}
                </span>
              </div>

              <ul className="border-border/60 flex flex-col gap-2.5 border-t pt-3">
                {col.items.map((lead) => (
                  <li
                    key={lead.id}
                    className="border-border/70 bg-card/40 hover:border-primary/30 rounded-xl border p-3.5 transition-colors"
                  >
                    <p className="font-display text-[15px] tracking-tight text-ink">
                      {lead.empresa}
                    </p>
                    <p className="text-muted-foreground mt-1.5 text-xs">
                      {lead.nome} · {lead.interesse}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium text-ink tabular-nums">
                        {lead.valor}
                      </span>
                      <span className="text-muted-foreground text-[11px]">
                        {lead.origem}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
