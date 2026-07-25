import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-gradient text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground border-border",
        soft: "border-transparent bg-blush-soft text-primary",
        danger: "border-transparent bg-primary/12 text-primary",
        success:
          "border-transparent bg-[rgba(91,110,82,.15)] text-[#3f5a3a] dark:bg-[rgba(91,110,82,.28)] dark:text-[#b7c9b0]",
        warning:
          "border-transparent bg-[rgba(176,122,46,.16)] text-[#8a5a1e] dark:bg-[rgba(176,122,46,.28)] dark:text-[#e0c08a]",
        info: "border-transparent bg-[rgba(58,85,96,.13)] text-[#3a5560] dark:bg-[rgba(58,85,96,.28)] dark:text-[#a8c0cc]",
        bronze:
          "border-transparent bg-[rgba(188,90,44,.15)] text-[#a24a1e] dark:bg-[rgba(188,90,44,.28)] dark:text-[#e0a888]",
        muted:
          "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
