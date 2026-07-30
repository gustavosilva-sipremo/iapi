import { useEffect, useRef, useState } from "react"

import { DatePicker } from "@/components/DatePicker"
import {
  ChipSelect,
  KanbanDetailModal,
  PropertyField,
} from "@/components/kanban/KanbanDetailModal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { leadColumns, type LeadItem } from "@/data/relacionamento"
import { formatBrl, parseBrl } from "@/lib/money"

const ORIGENS = ["Indicação", "Site", "LinkedIn", "Evento", "Manual"] as const
const STAGE_OPTIONS = leadColumns.map((c) => ({
  value: c.id,
  label: c.title,
}))

export type LeadKanbanItem = LeadItem & { columnId: string }

type LeadDetailModalProps = {
  item: LeadKanbanItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (item: LeadKanbanItem) => void
  onDelete: (id: string) => void
}

export function LeadDetailModal({
  item,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: LeadDetailModalProps) {
  const [draft, setDraft] = useState<LeadKanbanItem | null>(null)
  const [valorInput, setValorInput] = useState("")
  const hydratedIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!open) {
      hydratedIdRef.current = null
      return
    }
    if (!item) return
    if (hydratedIdRef.current === item.id) return
    hydratedIdRef.current = item.id
    setDraft({ ...item })
    setValorInput(item.valor)
  }, [open, item])

  if (!draft) return null

  function commit(next: LeadKanbanItem) {
    setDraft(next)
    onSave(next)
  }

  function patch(partial: Partial<LeadKanbanItem>) {
    commit({ ...draft!, ...partial })
  }

  const origemValue = (
    ORIGENS.includes(draft.origem as (typeof ORIGENS)[number])
      ? draft.origem
      : "Manual"
  ) as (typeof ORIGENS)[number]

  return (
    <KanbanDetailModal
      open={open}
      onOpenChange={onOpenChange}
      title={draft.empresa}
      eyebrow="Lead"
      deleteLabel="Excluir lead"
      onDelete={() => onDelete(draft.id)}
      main={
        <>
          <Input
            value={draft.empresa}
            onChange={(e) => patch({ empresa: e.target.value })}
            className="font-display border-transparent bg-transparent px-0 text-2xl font-medium tracking-tight shadow-none focus-visible:ring-0"
            placeholder="Empresa"
          />
          <PropertyField label="Notas">
            <Textarea
              value={draft.descricao}
              onChange={(e) => patch({ descricao: e.target.value })}
              placeholder="Contexto da conversa, próximos passos…"
              className="bg-card/40 min-h-36"
            />
          </PropertyField>
        </>
      }
      side={
        <>
          <PropertyField label="Etapa">
            <ChipSelect
              value={draft.columnId}
              options={STAGE_OPTIONS}
              onChange={(columnId) => patch({ columnId })}
            />
          </PropertyField>
          <PropertyField label="Contato">
            <Input
              value={draft.nome}
              onChange={(e) => patch({ nome: e.target.value })}
              className="bg-card/50"
            />
          </PropertyField>
          <PropertyField label="Interesse">
            <Input
              value={draft.interesse}
              onChange={(e) => patch({ interesse: e.target.value })}
              className="bg-card/50"
            />
          </PropertyField>
          <PropertyField label="Valor">
            <Input
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              onBlur={() => {
                const amount = parseBrl(valorInput)
                const formatted = amount > 0 ? formatBrl(amount) : draft.valor
                setValorInput(formatted)
                patch({ valor: formatted })
              }}
              className="bg-card/50 font-mono"
              inputMode="numeric"
            />
          </PropertyField>
          <PropertyField label="Follow-up">
            <DatePicker
              value={draft.prazo}
              onChange={(prazo) => patch({ prazo })}
            />
          </PropertyField>
          <PropertyField label="Origem">
            <ChipSelect
              value={origemValue}
              options={ORIGENS}
              onChange={(origem) => patch({ origem })}
            />
          </PropertyField>
        </>
      }
    />
  )
}
