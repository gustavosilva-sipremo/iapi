import { useEffect, useState } from "react"

import { DatePicker } from "@/components/DatePicker"
import {
  ChipSelect,
  KanbanDetailModal,
  PropertyField,
} from "@/components/kanban/KanbanDetailModal"
import type { LeadKanbanItem } from "@/components/kanban/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { leadColumns } from "@/data/relacionamento"
import { useKanbanDraft } from "@/hooks/use-kanban-draft"
import { formatBrl, parseBrl } from "@/lib/money"

const ORIGENS = ["Indicação", "Site", "LinkedIn", "Evento", "Manual"] as const
const STAGE_OPTIONS = leadColumns.map((c) => ({
  value: c.id,
  label: c.title,
}))

export type { LeadKanbanItem }

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
  const { draft, setDraft, patchLocal } = useKanbanDraft(item, open)
  const [valorInput, setValorInput] = useState("")
  const cardId = draft?.id ?? null

  useEffect(() => {
    if (!cardId || !draft) return
    setValorInput(draft.valor)
    // Only re-sync when opening a different card — not on every draft patch.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId])

  if (!draft) return null

  function flush(partial?: Partial<LeadKanbanItem>) {
    const next = { ...draft!, ...partial }
    setDraft(next)
    onSave(next)
  }

  const origemValue = (
    ORIGENS.includes(draft.origem as (typeof ORIGENS)[number])
      ? draft.origem
      : "Manual"
  ) as (typeof ORIGENS)[number]

  return (
    <KanbanDetailModal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && draft) onSave(draft)
        onOpenChange(nextOpen)
      }}
      title={draft.empresa}
      eyebrow="Lead"
      deleteLabel="Excluir lead"
      onDelete={() => onDelete(draft.id)}
      main={
        <>
          <Input
            value={draft.empresa}
            onChange={(e) => patchLocal({ empresa: e.target.value })}
            onBlur={() => flush()}
            className="font-display border-transparent bg-transparent px-0 text-2xl font-medium tracking-tight shadow-none focus-visible:ring-0"
            placeholder="Empresa"
          />
          <PropertyField label="Notas">
            <Textarea
              value={draft.descricao}
              onChange={(e) => patchLocal({ descricao: e.target.value })}
              onBlur={() => flush()}
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
              onChange={(columnId) => flush({ columnId })}
            />
          </PropertyField>
          <PropertyField label="Contato">
            <Input
              value={draft.nome}
              onChange={(e) => patchLocal({ nome: e.target.value })}
              onBlur={() => flush()}
              className="bg-card/50"
            />
          </PropertyField>
          <PropertyField label="Interesse">
            <Input
              value={draft.interesse}
              onChange={(e) => patchLocal({ interesse: e.target.value })}
              onBlur={() => flush()}
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
                flush({ valor: formatted })
              }}
              className="bg-card/50 font-mono"
              inputMode="numeric"
            />
          </PropertyField>
          <PropertyField label="Follow-up">
            <DatePicker
              value={draft.prazo}
              onChange={(prazo) => flush({ prazo })}
            />
          </PropertyField>
          <PropertyField label="Origem">
            <ChipSelect
              value={origemValue}
              options={ORIGENS}
              onChange={(origem) => flush({ origem })}
            />
          </PropertyField>
        </>
      }
    />
  )
}
