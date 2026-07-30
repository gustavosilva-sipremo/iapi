import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Local draft for detail modals: hydrate once per open/id,
 * keep typing local, flush to parent when requested.
 */
export function useKanbanDraft<T extends { id: string }>(
  item: T | null,
  open: boolean
) {
  const [draft, setDraft] = useState<T | null>(null)
  const hydratedIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!open) {
      hydratedIdRef.current = null
      return
    }
    if (!item) return
    if (hydratedIdRef.current === item.id) return
    hydratedIdRef.current = item.id
    setDraft({ ...item })
  }, [open, item])

  const patchLocal = useCallback((partial: Partial<T>) => {
    setDraft((prev) => (prev ? { ...prev, ...partial } : prev))
  }, [])

  const replaceDraft = useCallback((next: T) => {
    setDraft(next)
  }, [])

  return { draft, setDraft: replaceDraft, patchLocal }
}
