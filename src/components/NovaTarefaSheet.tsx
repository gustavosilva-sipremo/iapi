import { useId, useState, type FormEvent } from "react"

import { DatePicker } from "@/components/DatePicker"
import {
  ChipButton,
  FormField,
} from "@/components/kanban/FormPrimitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import type { TarefaItem, TarefaPrioridade, TarefaStatus } from "@/data/processos"
import { todayIso } from "@/lib/date"
import { initials } from "@/lib/initials"

const AVATAR_COLORS = [
  "#8c1111",
  "#22314f",
  "#bc5a2c",
  "#3a5560",
  "#5e6b52",
  "#8a4a52",
]

const PRIORIDADES: TarefaPrioridade[] = ["Alta", "Média", "Baixa"]
const STATUS_OPTIONS: TarefaStatus[] = [
  "A fazer",
  "Em andamento",
  "Em revisão",
  "Concluída",
]

type NovaTarefaSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (item: TarefaItem) => void
}

export function NovaTarefaSheet({
  open,
  onOpenChange,
  onCreate,
}: NovaTarefaSheetProps) {
  const formId = useId()
  const [titulo, setTitulo] = useState("")
  const [cliente, setCliente] = useState("")
  const [responsavel, setResponsavel] = useState("")
  const [descricao, setDescricao] = useState("")
  const [prazo, setPrazo] = useState(todayIso())
  const [prioridade, setPrioridade] = useState<TarefaPrioridade>("Média")
  const [status, setStatus] = useState<TarefaStatus>("A fazer")

  function reset() {
    setTitulo("")
    setCliente("")
    setResponsavel("")
    setDescricao("")
    setPrazo(todayIso())
    setPrioridade("Média")
    setStatus("A fazer")
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedTitulo = titulo.trim()
    const trimmedCliente = cliente.trim()
    const trimmedResponsavel = responsavel.trim()
    if (!trimmedTitulo || !trimmedCliente || !trimmedResponsavel) return

    onCreate({
      id: `t-${crypto.randomUUID()}`,
      titulo: trimmedTitulo,
      cliente: trimmedCliente,
      prioridade,
      status,
      responsavel: trimmedResponsavel,
      resInit: initials(trimmedResponsavel) || "??",
      prazo,
      descricao: descricao.trim(),
      avColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) reset()
      }}
    >
      <SheetContent
        side="right"
        className="w-full gap-0 sm:max-w-md sm:w-full"
      >
        <SheetHeader className="border-border/70 border-b pr-10">
          <SheetTitle>Nova tarefa</SheetTitle>
          <p className="text-muted-foreground text-sm">
            A tarefa entra no quadro em memória — clique no card para editar.
          </p>
        </SheetHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
        >
          <FormField label="Título" htmlFor={`${formId}-titulo`}>
            <Input
              id={`${formId}-titulo`}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex.: Revisar busca fonética"
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Cliente" htmlFor={`${formId}-cliente`}>
            <Input
              id={`${formId}-cliente`}
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ex.: Aurora Clínica"
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Responsável" htmlFor={`${formId}-resp`}>
            <Input
              id={`${formId}-resp`}
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Ex.: Marina A."
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Prazo">
            <DatePicker value={prazo} onChange={setPrazo} />
          </FormField>

          <FormField label="Descrição" htmlFor={`${formId}-desc`}>
            <Textarea
              id={`${formId}-desc`}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Contexto opcional…"
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Prioridade">
            <div className="flex flex-wrap gap-1.5">
              {PRIORIDADES.map((option) => (
                <ChipButton
                  key={option}
                  active={prioridade === option}
                  onClick={() => setPrioridade(option)}
                >
                  {option}
                </ChipButton>
              ))}
            </div>
          </FormField>

          <FormField label="Coluna inicial">
            <div className="flex flex-wrap gap-1.5">
              {STATUS_OPTIONS.map((option) => (
                <ChipButton
                  key={option}
                  active={status === option}
                  onClick={() => setStatus(option)}
                >
                  {option}
                </ChipButton>
              ))}
            </div>
          </FormField>

          <div className="mt-auto flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-border/80 flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Criar tarefa
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
