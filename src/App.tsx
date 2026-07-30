import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { AgendaPage } from "@/pages/AgendaPage"
import { BuscaPage } from "@/pages/BuscaPage"
import { CasosPage } from "@/pages/CasosPage"
import { ClientesPage } from "@/pages/ClientesPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { DominiosPage } from "@/pages/DominiosPage"
import { FinanceiroPage } from "@/pages/FinanceiroPage"
import { LeadsPage } from "@/pages/LeadsPage"
import { MonitoramentoPage } from "@/pages/MonitoramentoPage"
import { PrazosPage } from "@/pages/PrazosPage"
import { TarefasPage } from "@/pages/TarefasPage"
import { UsuariosPage } from "@/pages/UsuariosPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
  )
}
