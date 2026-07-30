import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
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
  findItemLocation,
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
  onMove: (
    activeId: string,
    overColumnId: string,
    overIndex: number
  ) => void
  renderCard: (item: T, isDragging: boolean) => ReactNode
  onCardOpen?: (item: T) => void
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
  onOpen,
  children,
}: {
  id: string
  onOpen?: () => void
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
  const didDragRef = useRef(false)

  useEffect(() => {
    if (isDragging) didDragRef.current = true
  }, [isDragging])

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(isDragging ? null : transform),
        transition: isDragging ? undefined : transition,
      }}
      className={cn(
        "border-border/70 bg-card/40 hover:border-primary/30 touch-none cursor-pointer rounded-xl border p-3.5 transition-colors",
        isDragging && "opacity-40"
      )}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (didDragRef.current) {
          didDragRef.current = false
          return
        }
        onOpen?.()
      }}
    >
      {children({ isDragging })}
    </li>
  )
}

type ColumnProps<T extends KanbanItemBase> = {
  column: KanbanColumnDef
  items: T[]
  meta?: ReactNode
  emptyLabel: string
  isOver: boolean
  renderCard: (item: T, isDragging: boolean) => ReactNode
  onCardOpen?: (item: T) => void
  activeId: UniqueIdentifier | null
}

function DroppableColumnInner<T extends KanbanItemBase>({
  column,
  items,
  meta,
  emptyLabel,
  isOver,
  renderCard,
  onCardOpen,
  activeId,
}: ColumnProps<T>) {
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
            <SortableCard
              key={item.id}
              id={item.id}
              onOpen={onCardOpen ? () => onCardOpen(item) : undefined}
            >
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

const DroppableColumn = memo(DroppableColumnInner) as typeof DroppableColumnInner

export function KanbanBoard<T extends KanbanItemBase>({
  columns,
  board,
  onMove,
  renderCard,
  onCardOpen,
  getColumnMeta,
  emptyLabel = "Nenhum item",
  className,
  columnsClassName,
}: KanbanBoardProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)
  const [overlayWidth, setOverlayWidth] = useState<number | undefined>()

  const boardRef = useRef(board)
  const onMoveRef = useRef(onMove)
  const dragOriginColumnRef = useRef<string | null>(null)
  boardRef.current = board
  onMoveRef.current = onMove

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const activeItem = useMemo(() => {
    if (!activeId) return null
    return findItemLocation(board, String(activeId))?.item ?? null
  }, [activeId, board])

  const resolveOverColumn = useCallback(
    (overId: UniqueIdentifier | undefined, state: KanbanBoardState<T>) => {
      if (!overId) return null
      const id = String(overId)
      if (state[id]) return id
      return findColumnOfItem(state, id)
    },
    []
  )

  const resolveOverIndex = useCallback(
    (
      overId: UniqueIdentifier | undefined,
      columnId: string,
      state: KanbanBoardState<T>
    ) => {
      const items = state[columnId]
      if (!overId || !items) return items?.length ?? 0
      const id = String(overId)
      if (state[id]) return items.length
      const index = items.findIndex((item) => item.id === id)
      return index >= 0 ? index : items.length
    },
    []
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const state = boardRef.current
    dragOriginColumnRef.current = findColumnOfItem(state, String(event.active.id))
    setActiveId(event.active.id)
    const width =
      event.active.rect.current.initial?.width ??
      event.active.rect.current.translated?.width
    setOverlayWidth(width)
  }, [])

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      const state = boardRef.current

      if (!over) {
        setOverColumnId(null)
        return
      }

      const activeColumnId = findColumnOfItem(state, String(active.id))
      const nextColumnId = resolveOverColumn(over.id, state)
      setOverColumnId(nextColumnId)

      // Cross-column only during dragOver — same-column reorder waits for dragEnd.
      if (!activeColumnId || !nextColumnId || activeColumnId === nextColumnId) {
        return
      }

      const overIndex = resolveOverIndex(over.id, nextColumnId, state)
      onMoveRef.current(String(active.id), nextColumnId, overIndex)
    },
    [resolveOverColumn, resolveOverIndex]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      const state = boardRef.current
      const originColumnId = dragOriginColumnRef.current
      dragOriginColumnRef.current = null
      setActiveId(null)
      setOverColumnId(null)
      setOverlayWidth(undefined)
      if (!over) return

      const activeColumnId = findColumnOfItem(state, String(active.id))
      const nextColumnId = resolveOverColumn(over.id, state)
      if (!activeColumnId || !nextColumnId) return

      // Cross-column already applied in dragOver. Skip end-reorder if the card
      // left its origin column (avoids jumping to the end when dropping on the
      // column shell after a cross-column move).
      if (activeColumnId !== nextColumnId) return
      if (originColumnId !== activeColumnId) return

      const overIndex = resolveOverIndex(over.id, nextColumnId, state)
      onMoveRef.current(String(active.id), nextColumnId, overIndex)
    },
    [resolveOverColumn, resolveOverIndex]
  )

  const handleDragCancel = useCallback(() => {
    dragOriginColumnRef.current = null
    setActiveId(null)
    setOverColumnId(null)
    setOverlayWidth(undefined)
  }, [])

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
      onDragCancel={handleDragCancel}
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
                onCardOpen={onCardOpen}
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
