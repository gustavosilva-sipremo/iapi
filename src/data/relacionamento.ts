import { initials } from "@/lib/initials"

export const clienteFilters = [
  { id: "todos", label: "Todos" },
  { id: "ativos", label: "Ativos" },
  { id: "prospects", label: "Prospects" },
  { id: "pj", label: "PJ" },
] as const

export type ClienteFilterId = (typeof clienteFilters)[number]["id"]

export type ClienteStatus = "Ativo" | "Prospect" | "Inativo"

export type Cliente = {
  id: string
  nome: string
  tipo: string
  segmento: string
  contato: string
  marcas: number
  status: ClienteStatus
  since: string
  initials: string
  avColor: string
}

const avatars = [
  "#8c1111",
  "#22314f",
  "#bc5a2c",
  "#3a5560",
  "#5e6b52",
  "#8a4a52",
]

export const clientesLista: Cliente[] = [
  ["Lumière Cosméticos", "PJ", "Beleza & Cosméticos", "contato@lumiere.com", 4, "Ativo", "2021"],
  ["Verbo Editora", "PJ", "Editorial & Mídia", "ana@verbo.com.br", 2, "Ativo", "2022"],
  ["Raiz Alimentos", "PJ", "Alimentação Natural", "rh@raiz.com", 3, "Ativo", "2020"],
  ["Tatame Studio", "PJ", "Esporte & Bem-estar", "ola@tatame.studio", 1, "Ativo", "2023"],
  ["Aurora Clínica", "PJ", "Saúde", "dra@auroraclinica.com", 5, "Ativo", "2019"],
  ["Ostra & Sal", "PJ", "Gastronomia", "reservas@ostraesal.com", 1, "Prospect", "2024"],
  ["Cobalto Tech", "PJ", "Tecnologia", "founders@cobalto.io", 2, "Ativo", "2023"],
].map((row, i) => {
  const [nome, tipo, segmento, contato, marcas, status, since] = row as [
    string,
    string,
    string,
    string,
    number,
    ClienteStatus,
    string,
  ]
  return {
    id: `cli-${i + 1}`,
    nome,
    tipo,
    segmento,
    contato,
    marcas,
    status,
    since,
    initials: initials(nome),
    avColor: avatars[i % avatars.length],
  }
})

export function matchesClienteFilter(
  cliente: Cliente,
  filter: ClienteFilterId
): boolean {
  if (filter === "todos") return true
  if (filter === "ativos") return cliente.status === "Ativo"
  if (filter === "prospects") return cliente.status === "Prospect"
  if (filter === "pj") return cliente.tipo === "PJ"
  return true
}

export type LeadItem = {
  id: string
  empresa: string
  nome: string
  interesse: string
  valor: string
  origem: string
  /** ISO YYYY-MM-DD — follow-up / próximo contato */
  prazo: string
  descricao: string
}

export type LeadColumn = {
  id: string
  title: string
  value: string
  items: LeadItem[]
}

export const leadColumns: LeadColumn[] = [
  {
    id: "novo",
    title: "Novo",
    value: "R$ 32k",
    items: [
      {
        id: "l1",
        empresa: "Estúdio Bossa",
        nome: "Mariana R.",
        interesse: "Naming",
        valor: "R$ 8.500",
        origem: "Indicação",
        prazo: "2026-07-30",
        descricao: "Primeiro contato via indicação da Raiz. Quer naming para rebrand.",
      },
      {
        id: "l2",
        empresa: "Café Matiz",
        nome: "Pedro L.",
        interesse: "Naming + INPI",
        valor: "R$ 12.000",
        origem: "Site",
        prazo: "2026-08-01",
        descricao: "Formulário do site; pediu escopo completo com registro.",
      },
    ],
  },
  {
    id: "qualificado",
    title: "Qualificado",
    value: "R$ 41k",
    items: [
      {
        id: "l3",
        empresa: "Editora Norte",
        nome: "Lucas F.",
        interesse: "Identidade verbal",
        valor: "R$ 15.000",
        origem: "LinkedIn",
        prazo: "2026-08-04",
        descricao: "Call feita; alinhado tom editorial e prazo de 6 semanas.",
      },
      {
        id: "l4",
        empresa: "Clínica Vera",
        nome: "Dra. Vera",
        interesse: "Registro INPI",
        valor: "R$ 6.800",
        origem: "Indicação",
        prazo: "2026-07-31",
        descricao: "Já tem naming; foco em classes NCL e monitoramento.",
      },
    ],
  },
  {
    id: "proposta",
    title: "Proposta enviada",
    value: "R$ 58k",
    items: [
      {
        id: "l5",
        empresa: "Grupo Aurora",
        nome: "Roberto S.",
        interesse: "Pacote completo",
        valor: "R$ 34.000",
        origem: "Evento",
        prazo: "2026-08-05",
        descricao: "Proposta enviada em 22/07. Aguardando retorno do board.",
      },
      {
        id: "l6",
        empresa: "Naturê",
        nome: "Sofia M.",
        interesse: "Naming",
        valor: "R$ 9.500",
        origem: "Site",
        prazo: "2026-08-02",
        descricao: "Proposta de naming enviada; follow-up agendado.",
      },
    ],
  },
  {
    id: "negociacao",
    title: "Negociação",
    value: "R$ 27k",
    items: [
      {
        id: "l7",
        empresa: "Vinhos do Sul",
        nome: "Carlos A.",
        interesse: "Naming + registro",
        valor: "R$ 18.000",
        origem: "Indicação",
        prazo: "2026-08-06",
        descricao: "Negociando escopo de registro internacional.",
      },
    ],
  },
  {
    id: "ganho",
    title: "Ganho",
    value: "R$ 22k",
    items: [
      {
        id: "l8",
        empresa: "Cobalto Tech",
        nome: "Founders",
        interesse: "Pacote naming",
        valor: "R$ 9.600",
        origem: "Indicação",
        prazo: "2026-07-20",
        descricao: "Contrato assinado. Kickoff concluído.",
      },
      {
        id: "l9",
        empresa: "Ostra & Sal",
        nome: "Chef Duda",
        interesse: "Naming",
        valor: "R$ 12.000",
        origem: "Site",
        prazo: "2026-07-22",
        descricao: "Fechado naming; proposta de registro em aberto.",
      },
    ],
  },
]
