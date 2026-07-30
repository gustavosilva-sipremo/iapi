export const prazosKpis = [
  { id: "criticos", label: "Críticos · ≤ 3 dias", value: "3", tone: "danger" as const },
  { id: "atencao", label: "Atenção · esta semana", value: "9", tone: "warning" as const },
  { id: "programados", label: "Programados · 30 dias", value: "24", tone: "default" as const },
]

export type PrazoUrgencia = "critico" | "alto" | "medio" | "baixo"

export type PrazoItem = {
  id: string
  titulo: string
  marca: string
  numero: string
  cliente: string
  dia: string
  mes: string
  vence: string
  urgencia: PrazoUrgencia
  tipo: string
  responsavel: string
}

export const prazosLista: PrazoItem[] = [
  {
    id: "p1",
    titulo: "Resposta a exigência",
    marca: "Verbo",
    numero: "923.512.880",
    cliente: "Verbo Editora",
    dia: "28",
    mes: "JUN",
    vence: "em 2 dias",
    urgencia: "critico",
    tipo: "Resposta",
    responsavel: "Marina A.",
  },
  {
    id: "p2",
    titulo: "Pagamento de concessão",
    marca: "Aurora",
    numero: "923.488.305",
    cliente: "Aurora Clínica",
    dia: "29",
    mes: "JUN",
    vence: "em 3 dias",
    urgencia: "critico",
    tipo: "Pagamento",
    responsavel: "Financeiro",
  },
  {
    id: "p3",
    titulo: "Manifestação a oposição",
    marca: "Raiz",
    numero: "923.502.119",
    cliente: "Raiz Alimentos",
    dia: "30",
    mes: "JUN",
    vence: "em 4 dias",
    urgencia: "critico",
    tipo: "Manifestação",
    responsavel: "Carla M.",
  },
  {
    id: "p4",
    titulo: "Prorrogação de prazo",
    marca: "Tatame",
    numero: "923.498.640",
    cliente: "Tatame Studio",
    dia: "04",
    mes: "JUL",
    vence: "em 8 dias",
    urgencia: "alto",
    tipo: "Prorrogação",
    responsavel: "Marina A.",
  },
  {
    id: "p5",
    titulo: "Comprovação de uso",
    marca: "Lumière",
    numero: "923.481.207",
    cliente: "Lumière Cosméticos",
    dia: "11",
    mes: "JUL",
    vence: "em 15 dias",
    urgencia: "medio",
    tipo: "Comprovação",
    responsavel: "Carla M.",
  },
  {
    id: "p6",
    titulo: "Pagamento de retribuição",
    marca: "Cobalto",
    numero: "923.541.262",
    cliente: "Cobalto Tech",
    dia: "22",
    mes: "JUL",
    vence: "em 26 dias",
    urgencia: "baixo",
    tipo: "Pagamento",
    responsavel: "Financeiro",
  },
]

export type TarefaPrioridade = "Alta" | "Média" | "Baixa"
export type TarefaStatus =
  | "A fazer"
  | "Em andamento"
  | "Em revisão"
  | "Concluída"

export type TarefaItem = {
  id: string
  titulo: string
  cliente: string
  prioridade: TarefaPrioridade
  status: TarefaStatus
  responsavel: string
  resInit: string
  prazo: string
  avColor: string
}

export const tarefasLista: TarefaItem[] = [
  {
    id: "t1",
    titulo: "Validar lista de nomes — Cobalto",
    cliente: "Cobalto Tech",
    prioridade: "Alta",
    status: "A fazer",
    responsavel: "Marina A.",
    resInit: "MA",
    prazo: "Hoje",
    avColor: "#8c1111",
  },
  {
    id: "t2",
    titulo: "Redigir manifesto de marca — Raiz",
    cliente: "Raiz Alimentos",
    prioridade: "Média",
    status: "A fazer",
    responsavel: "Carla M.",
    resInit: "CM",
    prazo: "Amanhã",
    avColor: "#22314f",
  },
  {
    id: "t3",
    titulo: "Responder exigência INPI — Verbo",
    cliente: "Verbo Editora",
    prioridade: "Alta",
    status: "Em andamento",
    responsavel: "Marina A.",
    resInit: "MA",
    prazo: "2 dias",
    avColor: "#bc5a2c",
  },
  {
    id: "t4",
    titulo: "Preparar proposta — Ostra & Sal",
    cliente: "Ostra & Sal",
    prioridade: "Média",
    status: "Em andamento",
    responsavel: "João P.",
    resInit: "JP",
    prazo: "3 dias",
    avColor: "#3a5560",
  },
  {
    id: "t5",
    titulo: "Revisar dicionário verbal — Aurora",
    cliente: "Aurora Clínica",
    prioridade: "Baixa",
    status: "Em revisão",
    responsavel: "Carla M.",
    resInit: "CM",
    prazo: "Sex",
    avColor: "#5e6b52",
  },
  {
    id: "t6",
    titulo: "Enviar certificado — Lumière",
    cliente: "Lumière Cosméticos",
    prioridade: "Alta",
    status: "Concluída",
    responsavel: "Financeiro",
    resInit: "FI",
    prazo: "Ok",
    avColor: "#8a4a52",
  },
]

export const tarefaColumns: {
  id: TarefaStatus
  title: TarefaStatus
  dot: string
}[] = [
  { id: "A fazer", title: "A fazer", dot: "#6e655b" },
  { id: "Em andamento", title: "Em andamento", dot: "var(--primary)" },
  { id: "Em revisão", title: "Em revisão", dot: "#bc5a2c" },
  { id: "Concluída", title: "Concluída", dot: "#3e5b45" },
]

export const agendaWeekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"]

export type CalEvent = {
  label: string
  color: string
}

export type CalDay = {
  day: number
  isToday: boolean
  events: CalEvent[]
}

/** Junho 2026 começa em segunda — grade sem células vazias no início */
const eventsByDay: Record<number, CalEvent[]> = {
  26: [{ label: "Reunião · Cobalto", color: "var(--primary)" }],
  28: [{ label: "Exigência Verbo", color: "var(--primary)" }],
  29: [{ label: "Concessão Aurora", color: "#bc5a2c" }],
  2: [{ label: "Call naming Raiz", color: "#3e5b45" }],
  4: [{ label: "Prazo Tatame", color: "#8a5a1e" }],
  11: [{ label: "Comprovação Lumière", color: "#3a5560" }],
  15: [{ label: "Workshop marca", color: "#3e5b45" }],
}

export const agendaMonthLabel = "Junho 2026"
export const agendaTodayDay = 26

export const agendaCalDays: CalDay[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  return {
    day,
    isToday: day === agendaTodayDay,
    events: eventsByDay[day] ?? [],
  }
})

export type AgendaCompromisso = {
  id: string
  title: string
  meta: string
  time: string
  color: string
}

export const agendaCompromissos: AgendaCompromisso[] = [
  {
    id: "ag1",
    title: "Reunião de naming — Cobalto Tech",
    meta: "Hoje · sala virtual",
    time: "14:00",
    color: "var(--primary)",
  },
  {
    id: "ag2",
    title: "Resposta a exigência — Verbo",
    meta: "28 jun · INPI",
    time: "—",
    color: "#8a5a1e",
  },
  {
    id: "ag3",
    title: "Concessão — Aurora Clínica",
    meta: "29 jun · pagamento",
    time: "—",
    color: "#bc5a2c",
  },
  {
    id: "ag4",
    title: "Call de validação — Raiz",
    meta: "02 jul · cliente",
    time: "10:30",
    color: "#3e5b45",
  },
  {
    id: "ag5",
    title: "Workshop de marca — interno",
    meta: "15 jul · estúdio",
    time: "09:00",
    color: "#3a5560",
  },
]
