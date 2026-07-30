import { useMemo, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DropAnimation,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  findColumnOfItem,
  type KanbanBoardState,
  type KanbanItemBase,
} from "@/hooks/use-kanban-state"
import { cn } from "@/lib/utils"

export type KanbanColumnDef = {
  id: string
  title: string
  dotColor?: string
}

type KanbanBoardProps<T extends KanbanItemBase> = {
  columns: readonly KanbanColumnDef[]
  board: KanbanBoardState<T>
  onMove: (activeId: string, overColumnId: string, overIndex: number) => void
  renderCard: (item: T, isDragging: boolean) => ReactNode
  getColumnMeta?: (columnId: string, items: T[]) => ReactNode
  emptyLabel?: string
  className?: string
  columnsClassName?: string
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
}

function SortableCard({
  id,
  children,
}: {
  id: string
  children: (args: { isDragging: boolean }) => ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  return (
    <li
      ref={setNodeRef}
      style={{
        // Keep the source card as a static placeholder; the portal overlay follows the cursor.
        transform: CSS.Transform.toString(isDragging ? null : transform),
        transition: isDragging ? undefined : transition,
      }}
      className={cn(
        "border-border/70 bg-card/40 hover:border-primary/30 touch-none rounded-xl border p-3.5 transition-colors",
        isDragging && "opacity-40"
      )}
      {...attributes}
      {...listeners}
    >
      {children({ isDragging })}
    </li>
  )
}

function DroppableColumn<T extends KanbanItemBase>({
  column,
  items,
  meta,
  emptyLabel,
  isOver,
  renderCard,
  activeId,
}: {
  column: KanbanColumnDef
  items: T[]
  meta?: ReactNode
  emptyLabel: string
  isOver: boolean
  renderCard: (item: T, isDragging: boolean) => ReactNode
  activeId: UniqueIdentifier | null
}) {
  const { setNodeRef } = useDroppable({ id: column.id })
  const itemIds = useMemo(() => items.map((item) => item.id), [items])

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {column.dotColor ? (
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: column.dotColor }}
              aria-hidden
            />
          ) : null}
          <h3 className="truncate text-sm font-medium text-ink">
            {column.title}
          </h3>
        </div>
        {meta != null ? (
          <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
            {meta}
          </span>
        ) : null}
      </div>

      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <ul
          ref={setNodeRef}
          className={cn(
            "border-border/60 flex min-h-24 flex-col gap-2.5 border-t pt-3 transition-colors",
            isOver && "border-primary/40 bg-primary/[0.03] rounded-b-lg"
          )}
        >
          {items.map((item) => (
            <SortableCard key={item.id} id={item.id}>
              {({ isDragging }) =>
                renderCard(item, isDragging || activeId === item.id)
              }
            </SortableCard>
          ))}
          {items.length === 0 ? (
            <li className="text-muted-foreground py-6 text-center text-xs">
              {emptyLabel}
            </li>
          ) : null}
        </ul>
      </SortableContext>
    </div>
  )
}

export function KanbanBoard<T extends KanbanItemBase>({
  columns,
  board,
  onMove,
  renderCard,
  getColumnMeta,
  emptyLabel = "Nenhum item",
  className,
  columnsClassName,
}: KanbanBoardProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)
  const [overlayWidth, setOverlayWidth] = useState<number | undefined>()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  )

  const activeItem = useMemo(() => {
    if (!activeId) return null
    const col = findColumnOfItem(board, String(activeId))
    if (!col) return null
    return board[col]?.find((item) => item.id === activeId) ?? null
  }, [activeId, board])

  function resolveOverColumn(
    overId: UniqueIdentifier | undefined
  ): string | null {
    if (!overId) return null
    const id = String(overId)
    if (board[id]) return id
    return findColumnOfItem(board, id)
  }

  function resolveOverIndex(
    overId: UniqueIdentifier | undefined,
    columnId: string
  ): number {
    if (!overId) return board[columnId]?.length ?? 0
    const id = String(overId)
    if (board[id]) return board[columnId]?.length ?? 0
    const index = board[columnId]?.findIndex((item) => item.id === id) ?? -1
    return index >= 0 ? index : (board[columnId]?.length ?? 0)
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
    const width =
      event.active.rect.current.initial?.width ??
      event.active.rect.current.translated?.width
    setOverlayWidth(width)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) {
      setOverColumnId(null)
      return
    }

    const activeColumnId = findColumnOfItem(board, String(active.id))
    const nextColumnId = resolveOverColumn(over.id)
    setOverColumnId(nextColumnId)

    if (!activeColumnId || !nextColumnId || activeColumnId === nextColumnId) {
      return
    }

    const overIndex = resolveOverIndex(over.id, nextColumnId)
    onMove(String(active.id), nextColumnId, overIndex)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    setOverColumnId(null)
    setOverlayWidth(undefined)
    if (!over) return

    const activeColumnId = findColumnOfItem(board, String(active.id))
    const nextColumnId = resolveOverColumn(over.id)
    if (!activeColumnId || !nextColumnId) return

    const overIndex = resolveOverIndex(over.id, nextColumnId)
    onMove(String(active.id), nextColumnId, overIndex)
  }

  const overlay = (
    <DragOverlay dropAnimation={dropAnimation} style={{ cursor: "grabbing" }}>
      {activeItem ? (
        <div
          className="border-border/70 bg-card shadow-lg rounded-xl border p-3.5"
          style={overlayWidth ? { width: overlayWidth } : undefined}
        >
          {renderCard(activeItem, true)}
        </div>
      ) : null}
    </DragOverlay>
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null)
        setOverColumnId(null)
        setOverlayWidth(undefined)
      }}
    >
      <div className={cn(className)}>
        <div className={cn("grid gap-4 sm:gap-5", columnsClassName)}>
          {columns.map((column) => {
            const items = board[column.id] ?? []
            return (
              <DroppableColumn
                key={column.id}
                column={column}
                items={items}
                meta={getColumnMeta?.(column.id, items)}
                emptyLabel={emptyLabel}
                isOver={overColumnId === column.id}
                renderCard={renderCard}
                activeId={activeId}
              />
            )
          })}
        </div>
      </div>

      {typeof document !== "undefined"
        ? createPortal(overlay, document.body)
        : overlay}
    </DndContext>
  )
}
