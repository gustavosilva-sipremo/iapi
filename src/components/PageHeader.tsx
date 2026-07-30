import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  action?: ReactNode
  className?: string
  maxWidthClassName?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  maxWidthClassName = "max-w-2xl",
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={maxWidthClassName}>
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </section>
  )
}
