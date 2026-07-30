import type { CSSProperties } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FilterChipOption<T extends string = string> = {
  id: T
  label: string
}

type FilterChipsProps<T extends string> = {
  options: readonly FilterChipOption<T>[]
  value: T
  onChange: (value: T) => void
  "aria-label"?: string
  className?: string
  style?: CSSProperties
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
  style,
}: FilterChipsProps<T>) {
  return (
    <div
      className={cn("flex flex-wrap gap-1.5", className)}
      style={style}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((item) => {
        const active = value === item.id
        return (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={active ? "default" : "outline"}
            className={cn(!active && "border-border/80 bg-transparent")}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
