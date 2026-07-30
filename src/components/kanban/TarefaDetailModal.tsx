import { useEffect, useRef, useState } from "react"

import { DatePicker } from "@/components/DatePicker"
import {
  ChipSelect,
  KanbanDetailModal,
  PropertyField,
} from "@/components/kanban/KanbanDetailModal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type {
  TarefaItem,
  TarefaPrioridade,
  TarefaStatus,
} from "@/data/processos"
import { initials } from "@/lib/initials"

const PRIORIDADES: TarefaPrioridade[] = ["Alta", "Média", "Baixa"]
const STATUS_OPTIONS: TarefaStatus[] = [
  "A fazer",
  "Em andamento",
  "Em revisão",
  "Concluída",
]

type TarefaDetailModalProps = {
  item: TarefaItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (item: TarefaItem) => void
  onDelete: (id: string) => void
}

export function TarefaDetailModal({
  item,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: TarefaDetailModalProps) {
  const [draft, setDraft] = useState<TarefaItem | null>(null)
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
  }, [open, item])

  if (!draft) return null

  function commit(next: TarefaItem) {
    setDraft(next)
    onSave(next)
  }

  function patch(partial: Partial<TarefaItem>) {
    const next: TarefaItem = { ...draft!, ...partial }
    if (partial.responsavel != null) {
      next.resInit = initials(partial.responsavel) || draft!.resInit
    }
    commit(next)
  }

  return (
    <KanbanDetailModal
      open={open}
      onOpenChange={onOpenChange}
      title={draft.titulo}
      eyebrow="Tarefa"
      deleteLabel="Excluir tarefa"
      onDelete={() => onDelete(draft.id)}
      main={
        <>
          <Input
            value={draft.titulo}
            onChange={(e) => patch({ titulo: e.target.value })}
            className="font-display border-transparent bg-transparent px-0 text-2xl font-medium tracking-tight shadow-none focus-visible:ring-0"
            placeholder="Nome da tarefa"
          />
          <PropertyField label="Descrição">
            <Textarea
              value={draft.descricao}
              onChange={(e) => patch({ descricao: e.target.value })}
              placeholder="Adicione contexto, links ou próximos passos…"
              className="bg-card/40 min-h-36"
            />
          </PropertyField>
        </>
      }
      side={
        <>
          <PropertyField label="Status">
            <ChipSelect
              value={draft.status}
              options={STATUS_OPTIONS}
              onChange={(status) => patch({ status })}
            />
          </PropertyField>
          <PropertyField label="Prioridade">
            <ChipSelect
              value={draft.prioridade}
              options={PRIORIDADES}
              onChange={(prioridade) => patch({ prioridade })}
            />
          </PropertyField>
          <PropertyField label="Prazo">
            <DatePicker
              value={draft.prazo}
              onChange={(prazo) => patch({ prazo })}
            />
          </PropertyField>
          <PropertyField label="Cliente">
            <Input
              value={draft.cliente}
              onChange={(e) => patch({ cliente: e.target.value })}
              className="bg-card/50"
            />
          </PropertyField>
          <PropertyField label="Responsável">
            <Input
              value={draft.responsavel}
              onChange={(e) => patch({ responsavel: e.target.value })}
              className="bg-card/50"
            />
          </PropertyField>
        </>
      }
    />
  )
}
