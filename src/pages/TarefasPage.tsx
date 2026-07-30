import { Plus } from "lucide-react"

import { KanbanCard, KanbanColumn } from "@/components/KanbanColumn"
import { PageHeader } from "@/components/PageHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  tarefaColumns,
  tarefasLista,
  type TarefaItem,
  type TarefaStatus,
} from "@/data/processos"
import { badgeVariantFromPrioridade } from "@/lib/status-badge"

export function TarefasPage() {
  const tasksByStatus = tarefasLista.reduce(
    (acc, tarefa) => {
      ;(acc[tarefa.status] ??= []).push(tarefa)
      return acc
    },
    {} as Partial<Record<TarefaStatus, TarefaItem[]>>
  )

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="05 — Operação"
        title="Tarefas"
        description="Do backlog à conclusão — o fluxo do estúdio em colunas."
        action={
          <Button type="button" className="w-fit shrink-0">
            <Plus className="size-4" />
            Nova tarefa
          </Button>
        }
      />

      <section
        className="animate-fade-in-up grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        style={{ animationDelay: "80ms" }}
      >
        {tarefaColumns.map((col) => {
          const items = tasksByStatus[col.id] ?? []
          return (
            <KanbanColumn
              key={col.id}
              title={col.title}
              meta={items.length}
              dotColor={col.dot}
              emptyLabel="Nenhuma tarefa"
              isEmpty={items.length === 0}
            >
              {items.map((tarefa) => (
                <KanbanCard key={tarefa.id}>
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <Badge
                      variant={badgeVariantFromPrioridade(tarefa.prioridade)}
                    >
                      {tarefa.prioridade}
                    </Badge>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {tarefa.prazo}
                    </span>
                  </div>
                  <p className="text-sm leading-snug font-medium text-ink">
                    {tarefa.titulo}
                  </p>
                  <p className="text-muted-foreground mt-1.5 text-xs">
                    {tarefa.cliente}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Avatar className="size-6 ring-1 ring-border">
                      <AvatarFallback
                        className="text-[9px] text-white"
                        style={{ background: tarefa.avColor }}
                      >
                        {tarefa.resInit}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">
                      {tarefa.responsavel}
                    </span>
                  </div>
                </KanbanCard>
              ))}
            </KanbanColumn>
          )
        })}
      </section>
    </div>
  )
}
