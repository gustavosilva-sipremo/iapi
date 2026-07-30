import { Plus } from "lucide-react"

import { KanbanCard, KanbanColumn } from "@/components/KanbanColumn"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { leadColumns } from "@/data/relacionamento"

export function LeadsPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="08 — Relacionamento"
        title="Leads & Propostas"
        description="Pipeline comercial do estúdio — do contato inicial ao fechamento."
        action={
          <Button type="button" className="w-fit shrink-0">
            <Plus className="size-4" />
            Novo lead
          </Button>
        }
      />

      <section
        className="animate-fade-in-up -mx-1 overflow-x-auto px-1 pb-2"
        style={{ animationDelay: "80ms" }}
      >
        <div className="grid min-w-[68rem] grid-cols-5 gap-4 xl:min-w-0 xl:gap-5">
          {leadColumns.map((col) => (
            <KanbanColumn key={col.id} title={col.title} meta={col.value}>
              {col.items.map((lead) => (
                <KanbanCard key={lead.id}>
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
                </KanbanCard>
              ))}
            </KanbanColumn>
          ))}
        </div>
      </section>
    </div>
  )
}
