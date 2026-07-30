import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

export type KpiTone = "default" | "danger" | "warning" | "success" | "emphasis"

export type KpiItem = {
  id: string
  label: string
  value: ReactNode
  sub?: ReactNode
  tone?: KpiTone
  live?: boolean
}

const valueToneClass: Record<KpiTone, string> = {
  default: "text-ink",
  emphasis: "text-ink",
  success: "text-[#3e5b45] dark:text-[#b7c9b0]",
  danger: "text-primary",
  warning: "text-[#a24a1e] dark:text-[#e0a888]",
}

type KpiStripProps = {
  items: readonly KpiItem[]
  columnsClassName?: string
  className?: string
  style?: CSSProperties
}

export function KpiStrip({
  items,
  columnsClassName = "grid-cols-2 lg:grid-cols-4",
  className,
  style,
}: KpiStripProps) {
  return (
    <section
      className={cn(
        "animate-fade-in-up grid gap-4 sm:gap-6",
        columnsClassName,
        className
      )}
      style={style}
    >
      {items.map((item) => {
        const tone = item.tone ?? "default"
        return (
          <div
            key={item.id}
            className={cn(
              "border-border/80 border-b pb-3 sm:pb-4",
              tone === "emphasis" && "border-primary/30"
            )}
          >
            <p className="text-muted-foreground text-[11px] tracking-wide sm:text-[12px]">
              {item.label}
            </p>
            <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
              {item.live ? (
                <span className="relative flex size-2" aria-label="Ao vivo">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3e5b45] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#3e5b45]" />
                </span>
              ) : null}
              <p
                className={cn(
                  "font-display text-2xl tracking-tight tabular-nums sm:text-3xl",
                  valueToneClass[tone]
                )}
              >
                {item.value}
              </p>
            </div>
            {item.sub ? (
              <p className="text-muted-foreground mt-1 text-[11px] sm:mt-1.5 sm:text-xs">
                {item.sub}
              </p>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
