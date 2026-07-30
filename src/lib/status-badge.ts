import type { VariantProps } from "class-variance-authority"

import { badgeVariants } from "@/components/ui/badge"

export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>

export type StatusTone =
  | "ok"
  | "warn"
  | "bronze"
  | "info"
  | "neutral"
  | "danger"
  | "wine"

const toneToVariant: Record<StatusTone, BadgeVariant> = {
  ok: "success",
  warn: "warning",
  bronze: "bronze",
  info: "info",
  neutral: "muted",
  danger: "danger",
  wine: "danger",
}

export function badgeVariantFromTone(tone: StatusTone): BadgeVariant {
  return toneToVariant[tone] ?? "muted"
}

export function badgeVariantFromClienteStatus(
  status: "Ativo" | "Prospect" | "Inativo"
): BadgeVariant {
  if (status === "Ativo") return "success"
  if (status === "Prospect") return "bronze"
  return "muted"
}

export function badgeVariantFromUsuarioStatus(
  status: "Ativo" | "Convidado" | "Inativo"
): BadgeVariant {
  if (status === "Ativo") return "success"
  if (status === "Convidado") return "bronze"
  return "muted"
}

export function badgeVariantFromTituloStatus(
  status: "Pago" | "Pendente" | "Atrasado" | "Agendado"
): BadgeVariant {
  if (status === "Pago") return "success"
  if (status === "Atrasado") return "danger"
  if (status === "Agendado") return "info"
  return "bronze"
}

export function badgeVariantFromPrioridade(
  prioridade: "Alta" | "Média" | "Baixa" | "alta" | "media" | "baixa"
): BadgeVariant {
  const normalized = prioridade.toLowerCase()
  if (normalized === "alta") return "danger"
  if (normalized === "média" || normalized === "media") return "bronze"
  return "muted"
}

export function badgeVariantFromDeadlineUrgency(
  urgency: "critico" | "atencao" | "programado"
): BadgeVariant {
  if (urgency === "critico") return "danger"
  if (urgency === "atencao") return "soft"
  return "outline"
}
