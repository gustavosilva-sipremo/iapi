import { NavLink } from "react-router-dom"
import { PanelLeftClose, PanelLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { navGroups } from "@/data/nav"
import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"

const ease = "duration-300 ease-in-out"

function BrandMark() {
  return (
    <div
      className="bg-brand-gradient text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg font-display text-sm italic shadow-sm"
      aria-hidden
    >
      i
    </div>
  )
}

function BrandCopy({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin]",
        ease,
        collapsed
          ? "pointer-events-none ml-0 max-w-0 opacity-0"
          : "ml-2.5 max-w-38 opacity-100"
      )}
      aria-hidden={collapsed}
    >
      <div className="leading-none">
        <p className="font-display text-[17px] tracking-tight">IAPI</p>
        <p className="text-muted-foreground mt-0.5 text-[10px] tracking-wide">
          Nome Que Marca
        </p>
      </div>
    </div>
  )
}

function NavItems({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  return (
    <nav
      className={cn(
        "flex flex-col pb-6",
        collapsed ? "items-center gap-5 px-0" : "gap-6 px-2"
      )}
    >
      {navGroups.map((group, groupIndex) => (
        <div
          key={group.label}
          className={cn(
            "flex flex-col",
            collapsed ? "w-full items-center gap-2" : "gap-1"
          )}
        >
          {!collapsed && (
            <p className="text-muted-foreground px-2.5 pb-1.5 text-[10px] font-medium tracking-[0.14em] uppercase">
              {group.label}
            </p>
          )}
          {collapsed && groupIndex > 0 && (
            <div
              className="bg-sidebar-border/70 mb-2 h-px w-5"
              aria-hidden
            />
          )}
          <ul
            className={cn(
              "flex flex-col",
              collapsed ? "w-full items-center gap-2" : "gap-0.5"
            )}
          >
            {group.items.map((item) => {
              const Icon = item.icon
              const link = (
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex cursor-pointer items-center text-[13.5px] font-medium outline-none",
                      "transition-[color,background-color,border-color] duration-200 ease-out",
                      "focus-visible:ring-sidebar-ring/40 focus-visible:ring-2",
                      collapsed
                        ? "size-9 justify-center rounded-md border"
                        : "w-full gap-3 rounded-lg px-2.5 py-2 bg-transparent mt-1",
                      isActive
                        ? collapsed
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : "bg-sidebar-accent text-sidebar-accent-foreground"
                        : collapsed
                          ? "border-sidebar-border/80 bg-transparent text-sidebar-foreground/60 hover:border-sidebar-border hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        strokeWidth={isActive ? 2 : 1.75}
                        className={cn(
                          "size-4.5 shrink-0 transition-[color,transform,opacity] duration-200 ease-out",
                          collapsed &&
                            !isActive &&
                            "opacity-80 group-hover:opacity-100",
                          collapsed && isActive && "text-primary",
                          !collapsed && isActive && "text-primary"
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="min-w-0 flex-1 truncate">
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge variant="soft" className="h-5 min-w-5 px-1.5">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span
                          className="bg-primary absolute top-1 right-1 size-1.5 rounded-full"
                          aria-hidden
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )

              if (!collapsed) {
                return <li key={item.id}>{link}</li>
              }

              return (
                <li key={item.id} className="flex justify-center">
                  <Tooltip delayDuration={120}>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={10}
                      className="border-border/60 bg-popover text-popover-foreground flex items-center gap-2 border shadow-sm"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="soft" className="h-5">
                          {item.badge}
                        </Badge>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function AppSidebar() {
  const { collapsed, toggle } = useSidebar()

  return (
    <aside
      className={cn(
        "border-sidebar-border bg-sidebar/80 sticky top-0 z-30 hidden h-svh flex-col border-r backdrop-blur-md transition-[width] md:flex",
        ease,
        collapsed ? "w-18" : "w-62"
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center transition-[padding]",
          ease,
          collapsed ? "justify-center px-3" : "justify-between px-4"
        )}
      >
        <div className="flex min-w-0 items-center">
          <BrandMark />
          <BrandCopy collapsed={collapsed} />
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-width,opacity]",
            ease,
            collapsed
              ? "pointer-events-none max-w-0 opacity-0"
              : "max-w-8 opacity-100"
          )}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggle}
            aria-label="Recolher menu"
            className="text-muted-foreground"
            tabIndex={collapsed ? -1 : 0}
          >
            <PanelLeftClose className="size-4" strokeWidth={1.75} />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex shrink-0 justify-center overflow-hidden transition-[max-height,opacity,padding]",
          ease,
          collapsed ? "max-h-10 pb-2 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggle}
          aria-label="Expandir menu"
          className="text-sidebar-foreground/60 hover:border-sidebar-border hover:bg-sidebar-accent/50 hover:text-sidebar-foreground size-9 rounded-md border border-sidebar-border/80"
          tabIndex={collapsed ? 0 : -1}
        >
          <PanelLeft className="size-4" strokeWidth={1.75} />
        </Button>
      </div>

      <ScrollArea className={cn("flex-1", collapsed ? "px-0" : "px-1")}>
        <NavItems collapsed={collapsed} />
      </ScrollArea>

      <div
        className={cn(
          "border-sidebar-border overflow-hidden border-t transition-[max-height,opacity,padding,border-color]",
          ease,
          collapsed
            ? "pointer-events-none max-h-0 border-transparent py-0 opacity-0"
            : "max-h-20 px-4 py-3 opacity-100"
        )}
        aria-hidden={collapsed}
      >
        <p className="text-muted-foreground whitespace-nowrap text-[11px] leading-relaxed">
          Inteligência de marcas · v0.1
        </p>
      </div>
    </aside>
  )
}

export function MobileSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center gap-2.5 pr-14 pl-4">
        <BrandMark />
        <BrandCopy collapsed={false} />
      </div>
      <ScrollArea className="flex-1 px-1">
        <NavItems collapsed={false} onNavigate={onNavigate} />
      </ScrollArea>
    </div>
  )
}
