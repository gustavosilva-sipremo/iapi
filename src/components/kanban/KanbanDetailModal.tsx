import { Trash2 } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type KanbanDetailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  eyebrow: string
  onDelete: () => void
  deleteLabel?: string
  main: ReactNode
  side: ReactNode
}

export function KanbanDetailModal({
  open,
  onOpenChange,
  title,
  eyebrow,
  onDelete,
  deleteLabel = "Excluir",
  main,
  side,
}: KanbanDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!open) setConfirmDelete(false)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showClose className="p-0">
        <DialogHeader className="bg-sidebar/40">
          <p className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
            {eyebrow}
          </p>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalhes e edição do card
          </DialogDescription>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {!confirmDelete ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary -ml-2"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="size-3.5" />
                {deleteLabel}
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  Excluir permanentemente?
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    onDelete()
                    onOpenChange(false)
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="flex flex-col gap-5 border-border/70 p-5 lg:border-r">
            {main}
          </div>
          <aside className="bg-sidebar/30 flex flex-col gap-4 p-5">{side}</aside>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PropertyField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
        {label}
      </span>
      {children}
    </div>
  )
}

export function ChipSelect<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T
  options: readonly T[] | readonly { value: T; label: string }[]
  onChange: (value: T) => void
  className?: string
}) {
  const normalized = options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option
  )

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {normalized.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "default" : "outline"}
          className={cn(
            value !== option.value && "border-border/80 bg-transparent"
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
