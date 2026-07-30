import { useId, useState, type FormEvent } from "react"

import { DatePicker } from "@/components/DatePicker"
import {
  ChipButton,
  FormField,
} from "@/components/kanban/FormPrimitives"
import type { LeadKanbanItem } from "@/components/kanban/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { leadColumns } from "@/data/relacionamento"
import { todayIso } from "@/lib/date"
import { formatBrl, parseBrl } from "@/lib/money"

const ORIGENS = ["Indicação", "Site", "LinkedIn", "Evento", "Manual"] as const
const DEFAULT_COLUMN = leadColumns[0]?.id ?? "novo"

type NovoLeadSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (item: LeadKanbanItem) => void
}

export function NovoLeadSheet({
  open,
  onOpenChange,
  onCreate,
}: NovoLeadSheetProps) {
  const formId = useId()
  const [empresa, setEmpresa] = useState("")
  const [nome, setNome] = useState("")
  const [interesse, setInteresse] = useState("")
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  const [prazo, setPrazo] = useState(todayIso())
  const [origem, setOrigem] = useState<(typeof ORIGENS)[number]>("Manual")
  const [columnId, setColumnId] = useState(DEFAULT_COLUMN)

  function reset() {
    setEmpresa("")
    setNome("")
    setInteresse("")
    setValor("")
    setDescricao("")
    setPrazo(todayIso())
    setOrigem("Manual")
    setColumnId(DEFAULT_COLUMN)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedEmpresa = empresa.trim()
    const trimmedNome = nome.trim()
    const trimmedInteresse = interesse.trim()
    const amount = parseBrl(valor)
    if (!trimmedEmpresa || !trimmedNome || !trimmedInteresse || amount <= 0) {
      return
    }

    onCreate({
      id: `l-${crypto.randomUUID()}`,
      empresa: trimmedEmpresa,
      nome: trimmedNome,
      interesse: trimmedInteresse,
      valor: formatBrl(amount),
      origem,
      prazo,
      descricao: descricao.trim(),
      columnId,
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
          <SheetTitle>Novo lead</SheetTitle>
          <p className="text-muted-foreground text-sm">
            O lead entra no pipeline em memória — clique no card para editar.
          </p>
        </SheetHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
        >
          <FormField label="Empresa" htmlFor={`${formId}-empresa`}>
            <Input
              id={`${formId}-empresa`}
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ex.: Estúdio Bossa"
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Contato" htmlFor={`${formId}-nome`}>
            <Input
              id={`${formId}-nome`}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Mariana R."
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Interesse" htmlFor={`${formId}-interesse`}>
            <Input
              id={`${formId}-interesse`}
              value={interesse}
              onChange={(e) => setInteresse(e.target.value)}
              placeholder="Ex.: Naming + INPI"
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Valor (R$)" htmlFor={`${formId}-valor`}>
            <Input
              id={`${formId}-valor`}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="8500 ou R$ 8.500"
              inputMode="numeric"
              required
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Follow-up">
            <DatePicker value={prazo} onChange={setPrazo} />
          </FormField>

          <FormField label="Notas" htmlFor={`${formId}-desc`}>
            <Textarea
              id={`${formId}-desc`}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Contexto opcional…"
              className="bg-card/50"
            />
          </FormField>

          <FormField label="Origem">
            <div className="flex flex-wrap gap-1.5">
              {ORIGENS.map((option) => (
                <ChipButton
                  key={option}
                  active={origem === option}
                  onClick={() => setOrigem(option)}
                >
                  {option}
                </ChipButton>
              ))}
            </div>
          </FormField>

          <FormField label="Etapa inicial">
            <div className="flex flex-wrap gap-1.5">
              {leadColumns.map((col) => (
                <ChipButton
                  key={col.id}
                  active={columnId === col.id}
                  onClick={() => setColumnId(col.id)}
                >
                  {col.title}
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
              Criar lead
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
