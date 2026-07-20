import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { AppTopbar } from "@/components/layout/AppTopbar"
import { SidebarProvider } from "@/hooks/use-sidebar"
import { ThemeProvider } from "@/hooks/use-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppShell() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <TooltipProvider delayDuration={200}>
          <div className="relative z-0 flex min-h-dvh">
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <AppTopbar />
              <main className="flex-1 px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-8 md:px-8 md:py-10">
                <div className="animate-fade-in mx-auto w-full max-w-6xl">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
