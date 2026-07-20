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
