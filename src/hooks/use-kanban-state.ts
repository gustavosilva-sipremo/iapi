import { useCallback, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"

export type KanbanItemBase = {
  id: string
}

export type KanbanBoardState<T extends KanbanItemBase> = Record<string, T[]>

export function groupByColumn<T extends KanbanItemBase>(
  items: T[],
  columnIds: readonly string[],
  getColumnId: (item: T) => string
): KanbanBoardState<T> {
  const state = Object.fromEntries(
    columnIds.map((id) => [id, [] as T[]])
  ) as KanbanBoardState<T>
  for (const item of items) {
    const col = getColumnId(item)
    if (state[col]) state[col].push(item)
    else if (columnIds[0]) state[columnIds[0]].push(item)
  }
  return state
}

export function findColumnOfItem<T extends KanbanItemBase>(
  board: KanbanBoardState<T>,
  itemId: string
): string | null {
  for (const [columnId, items] of Object.entries(board)) {
    if (items.some((item) => item.id === itemId)) return columnId
  }
  return null
}

export function useKanbanState<T extends KanbanItemBase>(
  initial: KanbanBoardState<T>
) {
  const [board, setBoard] = useState(initial)

  const moveItem = useCallback(
    (activeId: string, overColumnId: string, overIndex: number) => {
      setBoard((prev) => {
        const fromColumnId = findColumnOfItem(prev, activeId)
        if (!fromColumnId || !prev[overColumnId]) return prev

        const fromItems = prev[fromColumnId]
        const activeIndex = fromItems.findIndex((item) => item.id === activeId)
        if (activeIndex < 0) return prev

        if (fromColumnId === overColumnId) {
          if (activeIndex === overIndex) return prev
          return {
            ...prev,
            [fromColumnId]: arrayMove(fromItems, activeIndex, overIndex),
          }
        }

        const nextFrom = [...fromItems]
        const [item] = nextFrom.splice(activeIndex, 1)
        const toItems = [...prev[overColumnId]]
        const clamped = Math.max(0, Math.min(overIndex, toItems.length))
        toItems.splice(clamped, 0, item)

        return {
          ...prev,
          [fromColumnId]: nextFrom,
          [overColumnId]: toItems,
        }
      })
    },
    []
  )

  return { board, setBoard, moveItem }
}
