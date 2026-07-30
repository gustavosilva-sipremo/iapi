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
import { useKanbanDraft } from "@/hooks/use-kanban-draft"
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
  const { draft, setDraft, patchLocal } = useKanbanDraft(item, open)

  if (!draft) return null

  function flush(partial?: Partial<TarefaItem>) {
    const next: TarefaItem = { ...draft!, ...partial }
    if (partial?.responsavel != null) {
      next.resInit = initials(partial.responsavel) || draft!.resInit
    }
    setDraft(next)
    onSave(next)
  }

  return (
    <KanbanDetailModal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && draft) onSave(draft)
        onOpenChange(nextOpen)
      }}
      title={draft.titulo}
      eyebrow="Tarefa"
      deleteLabel="Excluir tarefa"
      onDelete={() => onDelete(draft.id)}
      main={
        <>
          <Input
            value={draft.titulo}
            onChange={(e) => patchLocal({ titulo: e.target.value })}
            onBlur={() => flush()}
            className="font-display border-transparent bg-transparent px-0 text-2xl font-medium tracking-tight shadow-none focus-visible:ring-0"
            placeholder="Nome da tarefa"
          />
          <PropertyField label="Descrição">
            <Textarea
              value={draft.descricao}
              onChange={(e) => patchLocal({ descricao: e.target.value })}
              onBlur={() => flush()}
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
              onChange={(status) => flush({ status })}
            />
          </PropertyField>
          <PropertyField label="Prioridade">
            <ChipSelect
              value={draft.prioridade}
              options={PRIORIDADES}
              onChange={(prioridade) => flush({ prioridade })}
            />
          </PropertyField>
          <PropertyField label="Prazo">
            <DatePicker
              value={draft.prazo}
              onChange={(prazo) => flush({ prazo })}
            />
          </PropertyField>
          <PropertyField label="Cliente">
            <Input
              value={draft.cliente}
              onChange={(e) => patchLocal({ cliente: e.target.value })}
              onBlur={() => flush()}
              className="bg-card/50"
            />
          </PropertyField>
          <PropertyField label="Responsável">
            <Input
              value={draft.responsavel}
              onChange={(e) =>
                patchLocal({
                  responsavel: e.target.value,
                  resInit: initials(e.target.value) || draft.resInit,
                })
              }
              onBlur={() => flush()}
              className="bg-card/50"
            />
          </PropertyField>
        </>
      }
    />
  )
}
