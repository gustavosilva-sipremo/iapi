import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type KanbanColumnProps = {
  title: string
  meta?: ReactNode
  dotColor?: string
  children: ReactNode
  emptyLabel?: string
  isEmpty?: boolean
  className?: string
}

export function KanbanColumn({
  title,
  meta,
  dotColor,
  children,
  emptyLabel = "Nenhum item",
  isEmpty = false,
  className,
}: KanbanColumnProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {dotColor ? (
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: dotColor }}
              aria-hidden
            />
          ) : null}
          <h3 className="truncate text-sm font-medium text-ink">{title}</h3>
        </div>
        {meta != null ? (
          <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
            {meta}
          </span>
        ) : null}
      </div>

      <ul className="border-border/60 flex flex-col gap-2.5 border-t pt-3">
        {children}
        {isEmpty ? (
          <li className="text-muted-foreground py-6 text-center text-xs">
            {emptyLabel}
          </li>
        ) : null}
      </ul>
    </div>
  )
}

type KanbanCardProps = {
  children: ReactNode
  className?: string
}

export function KanbanCard({ children, className }: KanbanCardProps) {
  return (
    <li
      className={cn(
        "border-border/70 bg-card/40 hover:border-primary/30 rounded-xl border p-3.5 transition-colors",
        className
      )}
    >
      {children}
    </li>
  )
}
