import { Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { AppTopbar } from "@/components/layout/AppTopbar"
import { useAuth } from "@/hooks/use-auth"
import { SidebarProvider } from "@/hooks/use-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

function PageFallback() {
  return (
    <div
      className="animate-fade-in flex min-h-40 items-center justify-center"
      aria-busy="true"
      aria-label="Carregando"
    >
      <div className="border-border border-t-primary size-6 animate-spin rounded-full border-2" />
    </div>
  )
}

export function AppShell() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={200}>
        <div className="relative z-0 flex min-h-dvh">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppTopbar />
            <main className="flex-1 px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-8 md:px-8 md:py-10">
              <div className="animate-fade-in mx-auto w-full max-w-6xl">
                <Suspense fallback={<PageFallback />}>
                  <Outlet />
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
