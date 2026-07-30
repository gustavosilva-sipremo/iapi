import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ChoiceChip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "outline"}
      className={cn(!active && "border-border/80 bg-transparent")}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export function FormToggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent"
        )}
      >
        {checked ? (
          <span className="block size-1.5 rounded-[1px] bg-current" />
        ) : null}
      </button>
      <span>
        <span className="text-ink">{label}</span>
        {hint ? (
          <span className="text-muted-foreground ml-1.5 text-xs">{hint}</span>
        ) : null}
      </span>
    </label>
  )
}
