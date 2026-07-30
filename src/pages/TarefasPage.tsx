import { useMemo, useState } from "react"
import { Plus } from "lucide-react"

import {
  KanbanBoard,
  type KanbanColumnDef,
} from "@/components/kanban/KanbanBoard"
import { TarefaDetailModal } from "@/components/kanban/TarefaDetailModal"
import { NovaTarefaSheet } from "@/components/NovaTarefaSheet"
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
import { groupByColumn, useKanbanState } from "@/hooks/use-kanban-state"
import { formatDateBr } from "@/lib/date"
import { badgeVariantFromPrioridade } from "@/lib/status-badge"

const COLUMN_IDS = tarefaColumns.map((c) => c.id)

const INITIAL_BOARD = groupByColumn(
  tarefasLista,
  COLUMN_IDS,
  (item) => item.status
)

const BOARD_COLUMNS: KanbanColumnDef[] = tarefaColumns.map((col) => ({
  id: col.id,
  title: col.title,
  dotColor: col.dot,
}))

function TarefaCard({ item }: { item: TarefaItem }) {
  return (
    <>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <Badge variant={badgeVariantFromPrioridade(item.prioridade)}>
          {item.prioridade}
        </Badge>
        <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
          {formatDateBr(item.prazo)}
        </span>
      </div>
      <p className="text-sm leading-snug font-medium text-ink">{item.titulo}</p>
      <p className="text-muted-foreground mt-1.5 text-xs">{item.cliente}</p>
      <div className="mt-3 flex items-center gap-2">
        <Avatar className="size-6 ring-1 ring-border">
          <AvatarFallback
            className="text-[9px] text-white"
            style={{ background: item.avColor }}
          >
            {item.resInit}
          </AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">{item.responsavel}</span>
      </div>
    </>
  )
}

export function TarefasPage() {
  const { board, moveItem, addItem, updateItem, removeItem } =
    useKanbanState(INITIAL_BOARD)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const columns = useMemo(() => BOARD_COLUMNS, [])

  const selectedItem = useMemo(() => {
    if (!selectedId) return null
    for (const items of Object.values(board)) {
      const found = items.find((item) => item.id === selectedId)
      if (found) return found
    }
    return null
  }, [board, selectedId])

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="05 — Operação"
        title="Tarefas"
        description="Do backlog à conclusão — clique para abrir detalhes, arraste para mudar o status."
        action={
          <Button
            type="button"
            className="w-fit shrink-0"
            onClick={() => setSheetOpen(true)}
          >
            <Plus className="size-4" />
            Nova tarefa
          </Button>
        }
      />

      <section className="animate-fade-in-up" style={{ animationDelay: "80ms" }}>
        <KanbanBoard<TarefaItem>
          columns={columns}
          board={board}
          onMove={(activeId, overColumnId, overIndex) => {
            moveItem(
              activeId,
              overColumnId as TarefaStatus,
              overIndex,
              (item, status) => ({
                ...item,
                status: status as TarefaStatus,
              })
            )
          }}
          onCardOpen={(item) => setSelectedId(item.id)}
          getColumnMeta={(_id, items) => items.length}
          emptyLabel="Nenhuma tarefa"
          columnsClassName="grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
          renderCard={(item) => <TarefaCard item={item} />}
        />
      </section>

      <NovaTarefaSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onCreate={(item) => addItem(item.status, item)}
      />

      <TarefaDetailModal
        item={selectedItem}
        open={selectedId != null && selectedItem != null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
        onSave={(item) => updateItem(item.id, item, item.status)}
        onDelete={(id) => {
          removeItem(id)
          setSelectedId(null)
        }}
      />
    </div>
  )
}
