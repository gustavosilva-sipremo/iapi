import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { MobileSidebarNav } from "@/components/layout/AppSidebar"
import { currentUser, getNavItemByPath } from "@/data/nav"
import { useAuth } from "@/hooks/use-auth"
import { useSidebar } from "@/hooks/use-sidebar"
import { useTheme } from "@/hooks/use-theme"

export function AppTopbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { mobileOpen, setMobileOpen } = useSidebar()
  const { theme, toggle: toggleTheme } = useTheme()
  const active = getNavItemByPath(location.pathname)
  const title = active?.label ?? "IAPI"

  function handleLogout() {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="flex h-14 items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:px-8">
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground hidden text-[11px] tracking-[0.12em] uppercase sm:block">
              Estúdio
            </p>
            <h1 className="font-display truncate text-base leading-tight tracking-tight sm:text-lg md:text-xl">
              {title}
            </h1>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground shrink-0"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="relative hidden text-muted-foreground sm:inline-flex"
            aria-label="Notificações"
          >
            <Bell className="size-4" />
            <span className="bg-primary absolute top-1 right-1 size-1.5 rounded-full" />
          </Button>

          <Badge variant="danger" className="hidden md:inline-flex">
            3 prazos críticos
          </Badge>

          <div className="flex shrink-0 items-center gap-2 pl-0.5 sm:gap-2.5 sm:pl-1">
            <div className="hidden text-right md:block">
              <p className="text-sm leading-none font-medium">
                {currentUser.name}
              </p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                {currentUser.role}
              </p>
            </div>
            <Avatar className="size-8 ring-1 ring-border sm:size-9">
              <AvatarFallback>{currentUser.initials}</AvatarFallback>
            </Avatar>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-border/80 text-muted-foreground hover:text-primary shrink-0"
            onClick={handleLogout}
            aria-label="Sair"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[min(18.5rem,100vw)] max-w-full gap-0 p-0 sm:w-72"
        >
          <SheetTitle className="sr-only">Navegação</SheetTitle>
          <MobileSidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}
