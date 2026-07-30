import { useCallback, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"

export type KanbanItemBase = {
  id: string
}

export type KanbanBoardState<T extends KanbanItemBase> = Record<string, T[]>

export type KanbanItemLocation<T extends KanbanItemBase> = {
  item: T
  columnId: string
  index: number
}

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

export function findItemLocation<T extends KanbanItemBase>(
  board: KanbanBoardState<T>,
  itemId: string
): KanbanItemLocation<T> | null {
  for (const [columnId, items] of Object.entries(board)) {
    const index = items.findIndex((item) => item.id === itemId)
    if (index >= 0) return { item: items[index], columnId, index }
  }
  return null
}

export function findColumnOfItem<T extends KanbanItemBase>(
  board: KanbanBoardState<T>,
  itemId: string
): string | null {
  return findItemLocation(board, itemId)?.columnId ?? null
}

export function useKanbanState<T extends KanbanItemBase>(
  initial: KanbanBoardState<T>
) {
  const [board, setBoard] = useState(initial)

  const moveItem = useCallback(
    (
      activeId: string,
      overColumnId: string,
      overIndex: number,
      mapItem?: (item: T, columnId: string) => T
    ) => {
      setBoard((prev) => {
        const from = findItemLocation(prev, activeId)
        const toItems = prev[overColumnId]
        if (!from || !toItems) return prev

        const { columnId: fromColumnId, index: activeIndex, item: raw } = from

        if (fromColumnId === overColumnId) {
          if (activeIndex === overIndex) return prev
          const bounded = Math.max(0, Math.min(overIndex, toItems.length - 1))
          if (activeIndex === bounded) return prev
          return {
            ...prev,
            [fromColumnId]: arrayMove(toItems, activeIndex, bounded),
          }
        }

        const nextFrom = prev[fromColumnId].filter((item) => item.id !== activeId)
        const item = mapItem ? mapItem(raw, overColumnId) : raw
        const nextTo = [...toItems]
        const clamped = Math.max(0, Math.min(overIndex, nextTo.length))
        nextTo.splice(clamped, 0, item)

        return {
          ...prev,
          [fromColumnId]: nextFrom,
          [overColumnId]: nextTo,
        }
      })
    },
    []
  )

  const addItem = useCallback((columnId: string, item: T) => {
    setBoard((prev) => {
      if (!prev[columnId]) return prev
      return {
        ...prev,
        [columnId]: [item, ...prev[columnId]],
      }
    })
  }, [])

  const updateItem = useCallback(
    (itemId: string, nextItem: T, nextColumnId: string) => {
      setBoard((prev) => {
        const from = findItemLocation(prev, itemId)
        if (!from || !prev[nextColumnId]) return prev

        if (from.columnId === nextColumnId) {
          if (from.item === nextItem) return prev
          const nextItems = prev[from.columnId].slice()
          nextItems[from.index] = nextItem
          return { ...prev, [from.columnId]: nextItems }
        }

        return {
          ...prev,
          [from.columnId]: prev[from.columnId].filter((item) => item.id !== itemId),
          [nextColumnId]: [nextItem, ...prev[nextColumnId]],
        }
      })
    },
    []
  )

  const removeItem = useCallback((itemId: string) => {
    setBoard((prev) => {
      const from = findItemLocation(prev, itemId)
      if (!from) return prev
      return {
        ...prev,
        [from.columnId]: prev[from.columnId].filter((item) => item.id !== itemId),
      }
    })
  }, [])

  return { board, setBoard, moveItem, addItem, updateItem, removeItem }
}
