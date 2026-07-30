import { useMemo, useState } from "react"
import { Plus } from "lucide-react"

import {
  KanbanBoard,
  type KanbanColumnDef,
} from "@/components/kanban/KanbanBoard"
import {
  LeadDetailModal,
  type LeadKanbanItem,
} from "@/components/kanban/LeadDetailModal"
import { NovoLeadSheet } from "@/components/NovoLeadSheet"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { leadColumns } from "@/data/relacionamento"
import {
  groupByColumn,
  useKanbanState,
  type KanbanBoardState,
} from "@/hooks/use-kanban-state"
import { formatDateBr } from "@/lib/date"
import { formatBrlCompact, parseBrl } from "@/lib/money"

const COLUMN_IDS = leadColumns.map((c) => c.id)

const BOARD_COLUMNS: KanbanColumnDef[] = leadColumns.map((col) => ({
  id: col.id,
  title: col.title,
}))

function buildInitialBoard(): KanbanBoardState<LeadKanbanItem> {
  const flat: LeadKanbanItem[] = leadColumns.flatMap((col) =>
    col.items.map((item) => ({ ...item, columnId: col.id }))
  )
  return groupByColumn(flat, COLUMN_IDS, (item) => item.columnId)
}

const INITIAL_BOARD = buildInitialBoard()

function LeadCard({ item }: { item: LeadKanbanItem }) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
          {formatDateBr(item.prazo)}
        </span>
        <span className="text-muted-foreground text-[11px]">{item.origem}</span>
      </div>
      <p className="font-display text-[15px] tracking-tight text-ink">
        {item.empresa}
      </p>
      <p className="text-muted-foreground mt-1.5 text-xs">
        {item.nome} · {item.interesse}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium text-ink tabular-nums">
          {item.valor}
        </span>
      </div>
    </>
  )
}

function columnTotal(items: LeadKanbanItem[]): string {
  const sum = items.reduce((acc, item) => acc + parseBrl(item.valor), 0)
  return formatBrlCompact(sum)
}

export function LeadsPage() {
  const { board, moveItem, addItem, updateItem, removeItem } =
    useKanbanState(INITIAL_BOARD)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const columns = useMemo(() => BOARD_COLUMNS, [])

  const selectedItem = useMemo(() => {
    if (!selectedId) return null
    for (const [columnId, items] of Object.entries(board)) {
      const found = items.find((item) => item.id === selectedId)
      if (found) return { ...found, columnId }
    }
    return null
  }, [board, selectedId])

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="08 — Relacionamento"
        title="Leads & Propostas"
        description="Pipeline comercial — clique para abrir detalhes, arraste entre as etapas."
        action={
          <Button
            type="button"
            className="w-fit shrink-0"
            onClick={() => setSheetOpen(true)}
          >
            <Plus className="size-4" />
            Novo lead
          </Button>
        }
      />

      <section
        className="animate-fade-in-up -mx-1 overflow-x-auto px-1 pb-2"
        style={{ animationDelay: "80ms" }}
      >
        <KanbanBoard<LeadKanbanItem>
          columns={columns}
          board={board}
          onMove={(activeId, overColumnId, overIndex) => {
            moveItem(
              activeId,
              overColumnId,
              overIndex,
              (item, columnId) => ({ ...item, columnId })
            )
          }}
          onCardOpen={(item) => setSelectedId(item.id)}
          getColumnMeta={(_id, items) => columnTotal(items)}
          emptyLabel="Nenhum lead"
          className="min-w-[68rem] xl:min-w-0"
          columnsClassName="grid-cols-5 gap-4 xl:gap-5"
          renderCard={(item) => <LeadCard item={item} />}
        />
      </section>

      <NovoLeadSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onCreate={(item) => addItem(item.columnId, item)}
      />

      <LeadDetailModal
        item={selectedItem}
        open={selectedId != null && selectedItem != null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
        onSave={(item) => updateItem(item.id, item, item.columnId)}
        onDelete={(id) => {
          removeItem(id)
          setSelectedId(null)
        }}
      />
    </div>
  )
}
