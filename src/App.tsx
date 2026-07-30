import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { BuscaPage } from "@/pages/BuscaPage"
import { CasosPage } from "@/pages/CasosPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { DominiosPage } from "@/pages/DominiosPage"
import { MonitoramentoPage } from "@/pages/MonitoramentoPage"
import { PlaceholderPage } from "@/pages/PlaceholderPage"

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
          <Route path="prazos" element={<PlaceholderPage />} />
          <Route path="tarefas" element={<PlaceholderPage />} />
          <Route path="agenda" element={<PlaceholderPage />} />
          <Route path="clientes" element={<PlaceholderPage />} />
          <Route path="leads" element={<PlaceholderPage />} />
          <Route path="financeiro" element={<PlaceholderPage />} />
          <Route path="usuarios" element={<PlaceholderPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
