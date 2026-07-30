export const buscaTipos = [
  { id: "radical", label: "Radical" },
  { id: "exata", label: "Exata" },
  { id: "prefixo", label: "Prefixo" },
  { id: "fonetica", label: "Fonética" },
] as const

export type BuscaTipoId = (typeof buscaTipos)[number]["id"]

export const buscaBoolOps = [
  { id: "e", label: "E" },
  { id: "ou", label: "OU" },
  { id: "e-nao", label: "E NÃO" },
] as const

export type BuscaBoolOpId = (typeof buscaBoolOps)[number]["id"]

export const buscaClassesNcl = [
  "03",
  "05",
  "44",
  "41",
  "09",
  "35",
  "25",
  "29",
] as const

export type BuscaResultTone =
  | "ok"
  | "info"
  | "bronze"
  | "neutral"
  | "danger"

export type BuscaResultado = {
  id: string
  marca: string
  titular: string
  apres: string
  classe: string
  situacao: string
  numero: string
  tone: BuscaResultTone
  fonetico: boolean
  propria: boolean
  logoColor: string
}

export const buscaResultsCount = 128
export const buscaFoneticosCount = 12

export const buscaResultados: BuscaResultado[] = [
  {
    id: "b1",
    marca: "LUMIÈRE",
    titular: "Lumière Cosméticos Ltda",
    apres: "Nominativa",
    classe: "NCL 03",
    situacao: "Registrado",
    numero: "923.481.207",
    tone: "ok",
    fonetico: false,
    propria: true,
    logoColor: "#8c1111",
  },
  {
    id: "b2",
    marca: "LUMIERE",
    titular: "Brilho Belleza Ltda",
    apres: "Mista",
    classe: "NCL 03",
    situacao: "Em exame",
    numero: "906.554.210",
    tone: "info",
    fonetico: true,
    propria: false,
    logoColor: "#22314f",
  },
  {
    id: "b3",
    marca: "LUMYÈRE",
    titular: "Farma Lux S.A.",
    apres: "Nominativa",
    classe: "NCL 05",
    situacao: "Publicado",
    numero: "914.220.870",
    tone: "bronze",
    fonetico: true,
    propria: false,
    logoColor: "#bc5a2c",
  },
  {
    id: "b4",
    marca: "LUMIÉR",
    titular: "Clínica Luz Ltda",
    apres: "Mista",
    classe: "NCL 44",
    situacao: "Sobrestado",
    numero: "921.118.443",
    tone: "neutral",
    fonetico: true,
    propria: false,
    logoColor: "#3a5560",
  },
  {
    id: "b5",
    marca: "LU MIERE",
    titular: "Cosmética Norte ME",
    apres: "Nominativa",
    classe: "NCL 03",
    situacao: "Indeferido",
    numero: "909.776.001",
    tone: "danger",
    fonetico: false,
    propria: false,
    logoColor: "#5e6b52",
  },
  {
    id: "b6",
    marca: "ILUMIERE",
    titular: "Lume Iluminação S.A.",
    apres: "Mista",
    classe: "NCL 11",
    situacao: "Registrado",
    numero: "917.443.220",
    tone: "ok",
    fonetico: false,
    propria: false,
    logoColor: "#8a4a52",
  },
]

export const monitorStats = [
  {
    id: "robo",
    label: "Status do robô",
    value: "Ativo",
    sub: "última varredura há 8 min",
    live: true,
    tone: "success" as const,
  },
  {
    id: "marcas",
    label: "Marcas monitoradas",
    value: "184",
    sub: "INPI + internet",
    live: false,
    tone: "default" as const,
  },
  {
    id: "alertas",
    label: "Alertas novos",
    value: "5",
    sub: "3 de alta prioridade",
    live: false,
    tone: "danger" as const,
  },
  {
    id: "colidencias",
    label: "Colidências no mês",
    value: "23",
    sub: "9 notificadas a clientes",
    live: false,
    tone: "default" as const,
  },
]

export const monitorSources = [
  { id: "todas", label: "Todas as fontes" },
  { id: "inpi", label: "INPI · RPI" },
  { id: "internet", label: "Internet" },
] as const

export type MonitorSourceId = (typeof monitorSources)[number]["id"]

export type AlertaSeveridade = "critico" | "alto" | "medio" | "baixo"

export type MonitorAlerta = {
  id: string
  fonte: "INPI" | "Internet"
  similaridade: number
  conflito: string
  protegida: string
  escopo: string
  origem: string
  date: string
  severidade: AlertaSeveridade
}

export const monitorAlertas: MonitorAlerta[] = [
  {
    id: "a1",
    fonte: "INPI",
    similaridade: 94,
    conflito: "LUMIERE BELLE",
    protegida: "LUMIÈRE",
    escopo: "NCL 03",
    origem: "RPI 2795 · depósito 906.998.220",
    date: "há 2 dias",
    severidade: "critico",
  },
  {
    id: "a2",
    fonte: "INPI",
    similaridade: 91,
    conflito: "AURORA CLINIC",
    protegida: "Aurora Clínica",
    escopo: "NCL 44",
    origem: "RPI 2794 · depósito 907.112.043",
    date: "há 5 dias",
    severidade: "alto",
  },
  {
    id: "a3",
    fonte: "Internet",
    similaridade: 88,
    conflito: "verboeditora.net",
    protegida: "Verbo Editora",
    escopo: "Domínio",
    origem: "Registro de domínio ativo",
    date: "há 3 dias",
    severidade: "alto",
  },
  {
    id: "a4",
    fonte: "Internet",
    similaridade: 76,
    conflito: "@raiz.alimentos",
    protegida: "Raiz Alimentos",
    escopo: "Instagram",
    origem: "Perfil comercial não autorizado",
    date: "há 1 semana",
    severidade: "medio",
  },
  {
    id: "a5",
    fonte: "Internet",
    similaridade: 70,
    conflito: "Tatame Co.",
    protegida: "Tatame Studio",
    escopo: "Marketplace",
    origem: "Anúncio em marketplace",
    date: "há 1 semana",
    severidade: "medio",
  },
]

export function matchesMonitorSource(
  alerta: MonitorAlerta,
  source: MonitorSourceId
): boolean {
  if (source === "todas") return true
  if (source === "inpi") return alerta.fonte === "INPI"
  return alerta.fonte === "Internet"
}

export type DomainCheck = {
  id: string
  name: string
  available: boolean
}

export type SocialCheck = {
  id: string
  rede: string
  handle: string
  available: boolean
}

export const domainChecks: DomainCheck[] = [
  { id: "d1", name: "lumiere.com", available: false },
  { id: "d2", name: "lumiere.com.br", available: true },
  { id: "d3", name: "lumiere.io", available: true },
  { id: "d4", name: "lumiere.app", available: true },
  { id: "d5", name: "lumiere.store", available: true },
  { id: "d6", name: "lumiere.net", available: false },
]

export const socialChecks: SocialCheck[] = [
  { id: "s1", rede: "Instagram", handle: "@lumiere", available: false },
  { id: "s2", rede: "X / Twitter", handle: "@lumiere", available: true },
  { id: "s3", rede: "TikTok", handle: "@lumiere", available: true },
  { id: "s4", rede: "YouTube", handle: "@lumiere", available: true },
  { id: "s5", rede: "LinkedIn", handle: "in/lumiere", available: true },
]
