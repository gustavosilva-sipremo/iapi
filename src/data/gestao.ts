import { initials } from "@/lib/initials"

export const finKpis = [
  {
    id: "receita",
    label: "Receita · junho",
    value: "R$ 248.500",
    sub: "↑ 18% YoY",
    tone: "emphasis" as const,
  },
  {
    id: "receber",
    label: "A receber",
    value: "R$ 96.400",
    sub: "12 títulos",
    tone: "success" as const,
  },
  {
    id: "pagar",
    label: "A pagar",
    value: "R$ 38.200",
    sub: "7 títulos",
    tone: "danger" as const,
  },
  {
    id: "inadimplencia",
    label: "Inadimplência",
    value: "2,4%",
    sub: "1 título atrasado",
    tone: "warning" as const,
  },
]

export type TituloStatus = "Pago" | "Pendente" | "Atrasado" | "Agendado"

export type ContaReceber = {
  id: string
  cliente: string
  descricao: string
  valor: string
  venc: string
  status: TituloStatus
}

export type ContaPagar = {
  id: string
  fornecedor: string
  descricao: string
  valor: string
  venc: string
  status: TituloStatus
}

export const contasReceberTotal = "R$ 96.400"
export const contasPagarTotal = "R$ 38.200"

export const contasReceber: ContaReceber[] = [
  {
    id: "r1",
    cliente: "Lumière Cosméticos",
    descricao: "Registro INPI · 3ª parcela",
    valor: "R$ 4.200",
    venc: "05/07",
    status: "Pendente",
  },
  {
    id: "r2",
    cliente: "Aurora Clínica",
    descricao: "Identidade verbal",
    valor: "R$ 18.500",
    venc: "30/06",
    status: "Pendente",
  },
  {
    id: "r3",
    cliente: "Raiz Alimentos",
    descricao: "Naming + registro",
    valor: "R$ 12.800",
    venc: "12/07",
    status: "Pendente",
  },
  {
    id: "r4",
    cliente: "Cobalto Tech",
    descricao: "Pacote naming",
    valor: "R$ 9.600",
    venc: "20/06",
    status: "Atrasado",
  },
  {
    id: "r5",
    cliente: "Verbo Editora",
    descricao: "Acompanhamento anual",
    valor: "R$ 6.300",
    venc: "28/06",
    status: "Pago",
  },
]

export const contasPagar: ContaPagar[] = [
  {
    id: "p1",
    fornecedor: "INPI — GRU",
    descricao: "Retribuições do mês",
    valor: "R$ 14.300",
    venc: "27/06",
    status: "Agendado",
  },
  {
    id: "p2",
    fornecedor: "Estúdio Tipográfico",
    descricao: "Licença de fontes",
    valor: "R$ 3.900",
    venc: "01/07",
    status: "Pendente",
  },
  {
    id: "p3",
    fornecedor: "Contabilidade Lima",
    descricao: "Honorários",
    valor: "R$ 2.800",
    venc: "05/07",
    status: "Agendado",
  },
  {
    id: "p4",
    fornecedor: "Hospedagem & infra",
    descricao: "Servidores",
    valor: "R$ 1.200",
    venc: "10/07",
    status: "Pago",
  },
]

export type PerfilRole = {
  id: string
  nome: string
  desc: string
  count: string
}

export const perfisLista: PerfilRole[] = [
  {
    id: "admin",
    nome: "Administrador",
    desc: "Acesso total à plataforma e configurações.",
    count: "2",
  },
  {
    id: "advogado",
    nome: "Advogado",
    desc: "Processos, prazos, exigências e clientes.",
    count: "3",
  },
  {
    id: "analista",
    nome: "Analista",
    desc: "Naming, tarefas e identidade verbal.",
    count: "4",
  },
  {
    id: "financeiro",
    nome: "Financeiro",
    desc: "Contas, contratos e relatórios.",
    count: "2",
  },
]

export type UsuarioStatus = "Ativo" | "Convidado" | "Inativo"

export type Usuario = {
  id: string
  nome: string
  email: string
  perfil: string
  perfilColor: string
  status: UsuarioStatus
  acesso: string
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

const perfilColor: Record<string, string> = {
  Administrador: "var(--primary)",
  Advogado: "#3a5560",
  Analista: "#3e5b45",
  Financeiro: "#bc5a2c",
  Comercial: "#8a5a1e",
}

export const usuariosLista: Usuario[] = [
  ["Aminy Gusmão", "aminy@nomequemarca.com", "Administrador", "Ativo", "agora há pouco"],
  ["Marina Alves", "marina@nomequemarca.com", "Advogado", "Ativo", "há 2h"],
  ["Carla Mendes", "carla@nomequemarca.com", "Analista", "Ativo", "ontem"],
  ["João Prado", "joao@nomequemarca.com", "Comercial", "Ativo", "há 3 dias"],
  ["Beatriz Lima", "bia@contabilidade.com", "Financeiro", "Convidado", "—"],
  ["Rafael Souza", "rafael@nomequemarca.com", "Analista", "Inativo", "há 1 mês"],
].map((row, i) => {
  const [nome, email, perfil, status, acesso] = row as [
    string,
    string,
    string,
    UsuarioStatus,
    string,
  ]
  return {
    id: `u-${i + 1}`,
    nome,
    email,
    perfil,
    perfilColor: perfilColor[perfil] ?? "var(--muted-foreground)",
    status,
    acesso,
    initials: initials(nome),
    avColor: avatars[i % avatars.length],
  }
})
