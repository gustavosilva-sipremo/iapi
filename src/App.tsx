import { lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { AuthProvider } from "@/hooks/use-auth"
import { ThemeProvider } from "@/hooks/use-theme"
import { DashboardPage } from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage"

const AnalyticsPage = lazy(() =>
  import("@/pages/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage }))
)
const AgendaPage = lazy(() =>
  import("@/pages/AgendaPage").then((m) => ({ default: m.AgendaPage }))
)
const BuscaPage = lazy(() =>
  import("@/pages/BuscaPage").then((m) => ({ default: m.BuscaPage }))
)
const CasosPage = lazy(() =>
  import("@/pages/CasosPage").then((m) => ({ default: m.CasosPage }))
)
const ClientesPage = lazy(() =>
  import("@/pages/ClientesPage").then((m) => ({ default: m.ClientesPage }))
)
const DominiosPage = lazy(() =>
  import("@/pages/DominiosPage").then((m) => ({ default: m.DominiosPage }))
)
const FinanceiroPage = lazy(() =>
  import("@/pages/FinanceiroPage").then((m) => ({ default: m.FinanceiroPage }))
)
const LeadsPage = lazy(() =>
  import("@/pages/LeadsPage").then((m) => ({ default: m.LeadsPage }))
)
const MonitoramentoPage = lazy(() =>
  import("@/pages/MonitoramentoPage").then((m) => ({
    default: m.MonitoramentoPage,
  }))
)
const PrazosPage = lazy(() =>
  import("@/pages/PrazosPage").then((m) => ({ default: m.PrazosPage }))
)
const TarefasPage = lazy(() =>
  import("@/pages/TarefasPage").then((m) => ({ default: m.TarefasPage }))
)
const UsuariosPage = lazy(() =>
  import("@/pages/UsuariosPage").then((m) => ({ default: m.UsuariosPage }))
)

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppShell />}>
              <Route index element={<DashboardPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="busca" element={<BuscaPage />} />
              <Route path="monitoramento" element={<MonitoramentoPage />} />
              <Route path="dominios" element={<DominiosPage />} />
              <Route path="casos" element={<CasosPage />} />
              <Route path="prazos" element={<PrazosPage />} />
              <Route path="tarefas" element={<TarefasPage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="clientes" element={<ClientesPage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="financeiro" element={<FinanceiroPage />} />
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
