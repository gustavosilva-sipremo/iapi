import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  ChartColumn,
  Search,
  Radar,
  Globe,
  FolderKanban,
  Clock3,
  CheckSquare,
  CalendarDays,
  Users,
  Handshake,
  Wallet,
  UserCog,
} from "lucide-react"

export type NavItem = {
  id: string
  label: string
  path: string
  icon: LucideIcon
  badge?: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Visão geral",
    items: [
      { id: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
      {
        id: "analytics",
        label: "Analytics",
        path: "/analytics",
        icon: ChartColumn,
      },
    ],
  },
  {
    label: "Inteligência INPI",
    items: [
      { id: "busca", label: "Busca INPI", path: "/busca", icon: Search },
      {
        id: "monitoramento",
        label: "Monitoramento",
        path: "/monitoramento",
        icon: Radar,
        badge: "5",
      },
      {
        id: "dominios",
        label: "Domínios & Redes",
        path: "/dominios",
        icon: Globe,
      },
    ],
  },
  {
    label: "Meus processos",
    items: [
      {
        id: "casos",
        label: "Meus Pedidos",
        path: "/casos",
        icon: FolderKanban,
        badge: "12",
      },
      {
        id: "prazos",
        label: "Prazos",
        path: "/prazos",
        icon: Clock3,
        badge: "3",
      },
      { id: "tarefas", label: "Tarefas", path: "/tarefas", icon: CheckSquare },
      { id: "agenda", label: "Agenda", path: "/agenda", icon: CalendarDays },
    ],
  },
  {
    label: "Relacionamento",
    items: [
      { id: "clientes", label: "Clientes", path: "/clientes", icon: Users },
      {
        id: "leads",
        label: "Leads & Propostas",
        path: "/leads",
        icon: Handshake,
      },
    ],
  },
  {
    label: "Gestão",
    items: [
      { id: "financeiro", label: "Financeiro", path: "/financeiro", icon: Wallet },
      { id: "usuarios", label: "Usuários", path: "/usuarios", icon: UserCog },
    ],
  },
]

export function getNavItemByPath(pathname: string): NavItem | undefined {
  const normalized = pathname === "" ? "/" : pathname
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === normalized) return item
    }
  }
  return undefined
}

export const currentUser = {
  name: "Aminy Gusmão",
  role: "Administradora",
  initials: "AG",
}
