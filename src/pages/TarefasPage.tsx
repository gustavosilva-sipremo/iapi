import { Plus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  tarefaColumns,
  tarefasLista,
  type TarefaPrioridade,
} from "@/data/processos"

function priorityVariant(prioridade: TarefaPrioridade) {
  if (prioridade === "Alta") return "danger" as const
  if (prioridade === "Média") return "bronze" as const
  return "muted" as const
}

export function TarefasPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
            05 — Operação
          </p>
          <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
            Tarefas
          </h2>
          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
            Do backlog à conclusão — o fluxo do estúdio em colunas.
          </p>
        </div>

        <Button type="button" className="w-fit shrink-0">
          <Plus className="size-4" />
          Nova tarefa
        </Button>
      </section>

      <section
        className="animate-fade-in-up grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        style={{ animationDelay: "80ms" }}
      >
        {tarefaColumns.map((col) => {
          const items = tarefasLista.filter((t) => t.status === col.id)
          return (
            <div key={col.id} className="flex min-w-0 flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: col.dot }}
                    aria-hidden
                  />
                  <h3 className="text-sm font-medium text-ink">{col.title}</h3>
                </div>
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {items.length}
                </span>
              </div>

              <ul className="border-border/60 flex flex-col gap-2.5 border-t pt-3">
                {items.map((tarefa) => (
                  <li
                    key={tarefa.id}
                    className="border-border/70 bg-card/40 hover:border-primary/30 rounded-xl border p-3.5 transition-colors"
                  >
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <Badge variant={priorityVariant(tarefa.prioridade)}>
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
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="text-muted-foreground py-6 text-center text-xs">
                    Nenhuma tarefa
                  </li>
                )}
              </ul>
            </div>
          )
        })}
      </section>
    </div>
  )
}
