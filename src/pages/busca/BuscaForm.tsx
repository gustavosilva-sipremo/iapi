import { Plus, Search } from "lucide-react"

import { ChoiceChip, FormToggle } from "@/components/FormControls"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  buscaBoolOps,
  buscaClassesNcl,
  buscaTipos,
  type BuscaBoolOpId,
  type BuscaTipoId,
} from "@/data/inpi"

const EXTRA_FILTERS = [
  { label: "Situação", value: "Todas" as string | null },
  { label: "Apresentação", value: "Todas" as string | null },
  { label: "Titular", value: null },
  { label: "Depósito a partir de", value: "01/2020" as string | null },
]

export type BuscaFormState = {
  termo: string
  termoExtra: string
  tipo: BuscaTipoId
  boolOp: BuscaBoolOpId
  classes: string[]
  fonetica: boolean
  titular: boolean
  vigentes: boolean
}

type BuscaFormProps = {
  state: BuscaFormState
  onChange: (patch: Partial<BuscaFormState>) => void
  onSearch: () => void
  onClear: () => void
}

export function BuscaForm({ state, onChange, onSearch, onClear }: BuscaFormProps) {
  function toggleClass(code: string) {
    onChange({
      classes: state.classes.includes(code)
        ? state.classes.filter((c) => c !== code)
        : [...state.classes, code],
    })
  }

  return (
    <section
      className="animate-fade-in-up border-border/70 flex flex-col gap-6 rounded-xl border p-4 sm:gap-7 sm:p-6"
      style={{ animationDelay: "60ms" }}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="busca-termo"
          className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase"
        >
          Termo de busca
        </label>
        <Input
          id="busca-termo"
          value={state.termo}
          onChange={(e) => onChange({ termo: e.target.value })}
          className="bg-card/50 h-11 text-base"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-muted-foreground shrink-0 text-xs">Tipo</span>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Tipo de busca"
        >
          {buscaTipos.map((item) => (
            <ChoiceChip
              key={item.id}
              active={state.tipo === item.id}
              onClick={() => onChange({ tipo: item.id })}
            >
              {item.label}
            </ChoiceChip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Operador booleano"
        >
          {buscaBoolOps.map((item) => (
            <ChoiceChip
              key={item.id}
              active={state.boolOp === item.id}
              onClick={() => onChange({ boolOp: item.id })}
            >
              {item.label}
            </ChoiceChip>
          ))}
        </div>
        <Input
          value={state.termoExtra}
          onChange={(e) => onChange({ termoExtra: e.target.value })}
          className="bg-card/50 sm:max-w-xs"
          aria-label="Termo adicional"
        />
      </div>

      <Button type="button" variant="ghost" size="sm" className="w-fit">
        <Plus className="size-4" />
        Adicionar termo
      </Button>

      <div className="border-border/60 border-t pt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
            Classes NCL · selecione várias
          </label>
          <button
            type="button"
            className="text-primary text-xs font-medium hover:underline"
          >
            Lista de correspondência de classes →
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {buscaClassesNcl.map((code) => (
            <ChoiceChip
              key={code}
              active={state.classes.includes(code)}
              onClick={() => toggleClass(code)}
            >
              NCL {code}
            </ChoiceChip>
          ))}
          <Button type="button" size="sm" variant="ghost">
            <Plus className="size-3.5" />
            classe
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
        <FormToggle
          checked={state.fonetica}
          onChange={(fonetica) => onChange({ fonetica })}
          label="Busca fonética"
          hint="(ch≈x · ss≈ç · y≈i)"
        />
        <FormToggle
          checked={state.titular}
          onChange={(titular) => onChange({ titular })}
          label="Buscar também no titular"
        />
        <FormToggle
          checked={state.vigentes}
          onChange={(vigentes) => onChange({ vigentes })}
          label="Apenas marcas vigentes"
        />
      </div>

      <div className="border-border/60 border-t pt-6">
        <p className="text-muted-foreground mb-3 text-[11px] tracking-[0.12em] uppercase">
          Outros filtros
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRA_FILTERS.map((filter) => (
            <div key={filter.label} className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-xs">{filter.label}</span>
              {filter.value === null ? (
                <Input placeholder="Nome / CNPJ" className="bg-card/50 h-9" />
              ) : (
                <div className="border-border/80 text-muted-foreground flex h-9 items-center justify-between rounded-md border px-3 text-sm">
                  <span>{filter.value}</span>
                  <span aria-hidden>▾</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={onSearch}>
          <Search className="size-4" />
          Pesquisar
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border/80"
          onClick={onClear}
        >
          Limpar
        </Button>
        <span className="text-muted-foreground ml-auto text-xs">
          Parâmetros:{" "}
          <span className="text-ink">
            Colidência · NCL {state.classes.slice(0, 2).join(" · ") || "—"}
          </span>
        </span>
      </div>
    </section>
  )
}
