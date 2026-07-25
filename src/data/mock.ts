export const kpis = [
  {
    id: "processos",
    label: "Processos ativos",
    value: "24",
    hint: "3 novos neste mês",
  },
  {
    id: "prazos",
    label: "Prazos críticos",
    value: "3",
    hint: "nos próximos 3 dias",
    tone: "danger" as const,
  },
  {
    id: "tarefas",
    label: "Tarefas do dia",
    value: "7",
    hint: "2 em revisão",
  },
  {
    id: "receita",
    label: "Receita do mês",
    value: "R$ 48,2k",
    hint: "+12% vs. mês anterior",
  },
]

export type DeadlineUrgency = "critico" | "atencao" | "programado"

export const upcomingDeadlines = [
  {
    id: "d1",
    title: "Resposta a exigência",
    process: "BR512024001234",
    client: "Ateliê Lume",
    due: "Hoje",
    urgency: "critico" as DeadlineUrgency,
  },
  {
    id: "d2",
    title: "Pagamento de concessão",
    process: "BR512023008901",
    client: "Casa Verdant",
    due: "Em 2 dias",
    urgency: "critico" as DeadlineUrgency,
  },
  {
    id: "d3",
    title: "Manifestação a oposição",
    process: "BR512024000456",
    client: "Studio Névoa",
    due: "Em 5 dias",
    urgency: "atencao" as DeadlineUrgency,
  },
  {
    id: "d4",
    title: "Comprovação de uso",
    process: "BR512020003321",
    client: "Marca Serena",
    due: "Em 18 dias",
    urgency: "programado" as DeadlineUrgency,
  },
]

export type TaskPriority = "alta" | "media" | "baixa"

export const priorityTasks = [
  {
    id: "t1",
    title: "Revisar busca fonética — marca Aurora",
    client: "Aurora Skin",
    assignee: "Renata",
    priority: "alta" as TaskPriority,
  },
  {
    id: "t2",
    title: "Preparar petição de oposição",
    client: "Studio Névoa",
    assignee: "Aminy",
    priority: "alta" as TaskPriority,
  },
  {
    id: "t3",
    title: "Enviar proposta de naming",
    client: "Flor & Sal",
    assignee: "Camila",
    priority: "media" as TaskPriority,
  },
  {
    id: "t4",
    title: "Atualizar timeline do processo",
    client: "Casa Verdant",
    assignee: "Renata",
    priority: "baixa" as TaskPriority,
  },
]

export const processPipeline = [
  { id: "deposito", label: "Depósito", count: 4 },
  { id: "publicacao", label: "Publicação", count: 6 },
  { id: "oposicao", label: "Oposição", count: 2 },
  { id: "exame", label: "Exame", count: 7 },
  { id: "concessao", label: "Concessão", count: 3 },
  { id: "registro", label: "Registro", count: 2 },
]

export const analyticsRangeFilters = [
  { id: "mes", label: "Mês" },
  { id: "trimestre", label: "Trimestre" },
  { id: "ano", label: "Ano" },
] as const

export type AnalyticsRangeId = (typeof analyticsRangeFilters)[number]["id"]

export const depositsByMonth = {
  total: 342,
  delta: "↑ 18% YoY",
  year: 2026,
  months: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"] as const,
  values: [22, 26, 24, 30, 28, 34, 31, 38, 35, 42, 39, 46],
}

export const portfolioStatus = {
  active: 184,
  deferralRate: "98%",
  segments: [
    { id: "exame", label: "Em exame", value: 72, color: "var(--primary)" },
    { id: "publicado", label: "Publicado", value: 31, color: "var(--blush)" },
    {
      id: "registrado",
      label: "Registrado",
      value: 49,
      color: "#3e5b45",
    },
    {
      id: "outros",
      label: "Outros",
      value: 32,
      color: "color-mix(in srgb, var(--ink) 22%, transparent)",
    },
  ],
}

/** Tempo médio até registro (semanas), jan–dez */
export const avgTimeToRegister = [52, 49, 47, 44, 46, 41, 38, 40, 36, 33, 31, 29]

export const topNiceClasses = [
  { cls: "NCL 3", name: "Cosméticos", count: 38, pct: 100 },
  { cls: "NCL 41", name: "Educação & Esporte", count: 29, pct: 76 },
  { cls: "NCL 9", name: "Software", count: 24, pct: 63 },
  { cls: "NCL 43", name: "Alimentação", count: 19, pct: 50 },
  { cls: "NCL 44", name: "Saúde", count: 15, pct: 40 },
]

export const casoFilters = [
  { id: "todos", label: "Todos" },
  { id: "exame", label: "Em exame" },
  { id: "exigencia", label: "Exigência" },
  { id: "publicado", label: "Publicado" },
  { id: "registrado", label: "Registrado" },
] as const

export type CasoFilterId = (typeof casoFilters)[number]["id"]

export type CasoStatusTone =
  | "ok"
  | "warn"
  | "bronze"
  | "info"
  | "neutral"

export type CasoPedido = {
  id: string
  marca: string
  numero: string
  cliente: string
  classe: string
  status: string
  fase: string
  progress: number
  tone: CasoStatusTone
}

export const casosPedidos: CasoPedido[] = [
  {
    id: "c1",
    marca: "Lumière",
    numero: "923.481.207",
    cliente: "Lumière Cosméticos",
    classe: "NCL 3",
    status: "Registrado",
    fase: "Concluído",
    progress: 100,
    tone: "ok",
  },
  {
    id: "c2",
    marca: "Verbo",
    numero: "923.512.880",
    cliente: "Verbo Editora",
    classe: "NCL 16",
    status: "Exigência",
    fase: "Aguardando resposta",
    progress: 62,
    tone: "warn",
  },
  {
    id: "c3",
    marca: "Raiz",
    numero: "923.502.119",
    cliente: "Raiz Alimentos",
    classe: "NCL 29",
    status: "Publicado RPI",
    fase: "Prazo de oposição",
    progress: 78,
    tone: "bronze",
  },
  {
    id: "c4",
    marca: "Tatame",
    numero: "923.498.640",
    cliente: "Tatame Studio",
    classe: "NCL 41",
    status: "Em análise",
    fase: "Exame de mérito",
    progress: 48,
    tone: "info",
  },
  {
    id: "c5",
    marca: "Aurora",
    numero: "923.488.305",
    cliente: "Aurora Clínica",
    classe: "NCL 44",
    status: "Registrado",
    fase: "Concluído",
    progress: 100,
    tone: "ok",
  },
  {
    id: "c6",
    marca: "Ostra & Sal",
    numero: "923.530.077",
    cliente: "Ostra & Sal",
    classe: "NCL 43",
    status: "Em análise",
    fase: "Exame formal",
    progress: 30,
    tone: "info",
  },
  {
    id: "c7",
    marca: "Cobalto",
    numero: "923.541.262",
    cliente: "Cobalto Tech",
    classe: "NCL 9",
    status: "Busca prévia",
    fase: "Análise de viabilidade",
    progress: 12,
    tone: "neutral",
  },
]

export function matchesCasoFilter(
  caso: CasoPedido,
  filter: CasoFilterId
): boolean {
  if (filter === "todos") return true
  if (filter === "exame") return caso.status === "Em análise"
  if (filter === "exigencia") return caso.status === "Exigência"
  if (filter === "publicado") return caso.status.startsWith("Publicado")
  if (filter === "registrado") return caso.status === "Registrado"
  return true
}
