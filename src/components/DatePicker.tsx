import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  daysInMonth,
  formatDateBr,
  mondayIndex,
  monthLabel,
  parseIsoDate,
  startOfMonth,
  toIsoDate,
  todayIso,
  WEEKDAY_LABELS,
} from "@/lib/date"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  value: string
  onChange: (iso: string) => void
  placeholder?: string
  className?: string
  id?: string
}

/**
 * Expandable inline calendar (no portal) so selection works inside Dialog/Sheet.
 * Stores ISO YYYY-MM-DD; displays dd/mm/yyyy.
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "dd/mm/aaaa",
  className,
  id,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = parseIsoDate(value)
  const today = todayIso()
  const initial = selected ?? parseIsoDate(today)!
  const [viewY, setViewY] = useState(initial.y)
  const [viewM, setViewM] = useState(initial.m)

  useEffect(() => {
    if (!open) return
    const base = selected ?? parseIsoDate(today)!
    setViewY(base.y)
    setViewM(base.m)
  }, [open, selected?.y, selected?.m, selected?.d, today])

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const cells = useMemo(() => {
    const first = startOfMonth(viewY, viewM)
    const offset = mondayIndex(first)
    const total = daysInMonth(viewY, viewM)
    const days: Array<{ iso: string; day: number } | null> = []

    for (let i = 0; i < offset; i++) days.push(null)
    for (let day = 1; day <= total; day++) {
      days.push({ day, iso: toIsoDate(viewY, viewM, day) })
    }
    while (days.length % 7 !== 0) days.push(null)
    return days
  }, [viewY, viewM])

  function shiftMonth(delta: number) {
    const date = new Date(viewY, viewM - 1 + delta, 1)
    setViewY(date.getFullYear())
    setViewM(date.getMonth() + 1)
  }

  function selectDate(iso: string) {
    onChange(iso)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={cn("flex w-full flex-col gap-2", className)}>
      <Button
        id={id}
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls={open ? `${id ?? "date"}-calendar` : undefined}
        className={cn(
          "border-border/80 h-9 w-full justify-start gap-2 bg-card/50 px-3 font-normal",
          !value && "text-muted-foreground"
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <CalendarDays className="text-muted-foreground size-4 shrink-0" />
        <span className="font-mono text-sm tabular-nums">
          {value ? formatDateBr(value) : placeholder}
        </span>
      </Button>

      {open ? (
        <div
          id={id ? `${id}-calendar` : undefined}
          role="dialog"
          aria-label="Escolher data"
          className="border-border bg-card/80 w-full rounded-xl border p-3 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => shiftMonth(-1)}
              aria-label="Mês anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <p className="text-sm font-medium text-ink">
              {monthLabel(viewY, viewM)}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => shiftMonth(1)}
              aria-label="Próximo mês"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-0.5">
            {WEEKDAY_LABELS.map((label) => (
              <span
                key={label}
                className="text-muted-foreground py-1 text-center text-[10px] tracking-wide uppercase"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((cell, index) => {
              if (!cell) {
                return <span key={`empty-${index}`} className="size-9" />
              }
              const isSelected = cell.iso === value
              const isToday = cell.iso === today
              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => selectDate(cell.iso)}
                  className={cn(
                    "hover:bg-accent size-9 rounded-lg text-sm tabular-nums transition-colors",
                    isSelected &&
                      "bg-brand-gradient text-primary-foreground hover:opacity-90",
                    !isSelected && isToday && "ring-primary/40 ring-1",
                    !isSelected && "text-ink"
                  )}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex gap-2 border-t border-border/60 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => selectDate(today)}
            >
              Hoje
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
