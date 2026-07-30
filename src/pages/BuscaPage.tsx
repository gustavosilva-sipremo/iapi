import { useState, type ReactNode } from "react"
import { Plus, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  buscaBoolOps,
  buscaClassesNcl,
  buscaFoneticosCount,
  buscaResultados,
  buscaResultsCount,
  buscaTipos,
  type BuscaBoolOpId,
  type BuscaResultTone,
  type BuscaTipoId,
} from "@/data/inpi"
import { cn } from "@/lib/utils"

function statusVariant(tone: BuscaResultTone) {
  if (tone === "ok") return "success" as const
  if (tone === "info") return "info" as const
  if (tone === "bronze") return "bronze" as const
  if (tone === "danger") return "danger" as const
  return "muted" as const
}

function logoInitials(marca: string) {
  return marca.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3).toUpperCase()
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "outline"}
      className={cn(active ? undefined : "border-border/80 bg-transparent")}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent"
        )}
      >
        {checked && (
          <span className="block size-1.5 rounded-[1px] bg-current" />
        )}
      </button>
      <span>
        <span className="text-ink">{label}</span>
        {hint ? (
          <span className="text-muted-foreground ml-1.5 text-xs">{hint}</span>
        ) : null}
      </span>
    </label>
  )
}

export function BuscaPage() {
  const [termo, setTermo] = useState("lumière")
  const [termoExtra, setTermoExtra] = useState("lumiere")
  const [tipo, setTipo] = useState<BuscaTipoId>("radical")
  const [boolOp, setBoolOp] = useState<BuscaBoolOpId>("ou")
  const [classes, setClasses] = useState<string[]>(["03", "05"])
  const [fonetica, setFonetica] = useState(true)
  const [titular, setTitular] = useState(false)
  const [vigentes, setVigentes] = useState(false)
  const [showResults, setShowResults] = useState(true)

  function toggleClass(code: string) {
    setClasses((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-3xl">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          03 — Inteligência INPI
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Busca de marcas · INPI
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Pesquisa por <strong className="font-medium text-ink">radical</strong>
          , <strong className="font-medium text-ink">exata</strong> ou{" "}
          <strong className="font-medium text-ink">fonética</strong>, com
          operadores <strong className="font-medium text-ink">E / OU / E NÃO</strong>{" "}
          e várias classes ao mesmo tempo. Colidência e correspondência de
          classes num só lugar.
        </p>
      </section>

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
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="bg-card/50 h-11 text-base"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-muted-foreground shrink-0 text-xs">Tipo</span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tipo de busca">
            {buscaTipos.map((item) => (
              <Chip
                key={item.id}
                active={tipo === item.id}
                onClick={() => setTipo(item.id)}
              >
                {item.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Operador booleano">
            {buscaBoolOps.map((item) => (
              <Chip
                key={item.id}
                active={boolOp === item.id}
                onClick={() => setBoolOp(item.id)}
              >
                {item.label}
              </Chip>
            ))}
          </div>
          <Input
            value={termoExtra}
            onChange={(e) => setTermoExtra(e.target.value)}
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
              <Chip
                key={code}
                active={classes.includes(code)}
                onClick={() => toggleClass(code)}
              >
                NCL {code}
              </Chip>
            ))}
            <Button type="button" size="sm" variant="ghost">
              <Plus className="size-3.5" />
              classe
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          <Toggle
            checked={fonetica}
            onChange={setFonetica}
            label="Busca fonética"
            hint="(ch≈x · ss≈ç · y≈i)"
          />
          <Toggle
            checked={titular}
            onChange={setTitular}
            label="Buscar também no titular"
          />
          <Toggle
            checked={vigentes}
            onChange={setVigentes}
            label="Apenas marcas vigentes"
          />
        </div>

        <div className="border-border/60 border-t pt-6">
          <p className="text-muted-foreground mb-3 text-[11px] tracking-[0.12em] uppercase">
            Outros filtros
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Situação", value: "Todas" },
              { label: "Apresentação", value: "Todas" },
              { label: "Titular", value: null },
              { label: "Depósito a partir de", value: "01/2020" },
            ].map((filter) => (
              <div key={filter.label} className="flex flex-col gap-1.5">
                <span className="text-muted-foreground text-xs">
                  {filter.label}
                </span>
                {filter.value === null ? (
                  <Input
                    placeholder="Nome / CNPJ"
                    className="bg-card/50 h-9"
                  />
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
          <Button type="button" onClick={() => setShowResults(true)}>
            <Search className="size-4" />
            Pesquisar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-border/80"
            onClick={() => {
              setTermo("")
              setTermoExtra("")
              setClasses([])
              setShowResults(false)
            }}
          >
            Limpar
          </Button>
          <span className="text-muted-foreground ml-auto text-xs">
            Parâmetros:{" "}
            <span className="text-ink">
              Colidência · NCL {classes.slice(0, 2).join(" · ") || "—"}
            </span>
          </span>
        </div>
      </section>

      {showResults && (
        <section
          className="animate-fade-in-up flex flex-col gap-4"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-sm">
              <strong className="font-display text-lg font-normal text-ink tabular-nums">
                {buscaResultsCount}
              </strong>{" "}
              <span className="text-muted-foreground">resultados · </span>
              <span className="text-muted-foreground">
                {buscaFoneticosCount} foneticamente semelhantes
              </span>
            </p>
            <p className="text-muted-foreground text-xs">
              Ordenar: Relevância <span aria-hidden>▾</span>
            </p>
          </div>

          <div className="border-border/70 hidden overflow-hidden rounded-xl border md:block">
            <div className="text-muted-foreground grid grid-cols-[3.5rem_1.6fr_0.7fr_1fr_1.1fr] gap-4 border-b border-border/70 px-5 py-3 font-mono text-[10px] tracking-[0.12em] uppercase">
              <div>Logo</div>
              <div>Marca / Titular</div>
              <div>Classe</div>
              <div>Situação</div>
              <div>Nº do processo</div>
            </div>
            <ul>
              {buscaResultados.map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    className="hover:bg-primary/[0.04] grid w-full grid-cols-[3.5rem_1.6fr_0.7fr_1fr_1.1fr] items-center gap-4 border-b border-border/60 px-5 py-3.5 text-left transition-colors last:border-0"
                  >
                    <div
                      className="flex size-12 items-center justify-center rounded-[10px] border border-border/70 font-mono text-[9px] tracking-wide"
                      style={{
                        color: row.logoColor,
                        background: `repeating-linear-gradient(135deg, ${row.logoColor}26 0 6px, ${row.logoColor}0f 6px 12px)`,
                      }}
                    >
                      {logoInitials(row.marca)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-display text-[15px] tracking-tight text-ink">
                          {row.marca}
                        </span>
                        {row.fonetico && (
                          <Badge variant="info" className="text-[10px]">
                            Fonético
                          </Badge>
                        )}
                        {row.propria && (
                          <Badge variant="soft" className="text-[10px]">
                            Sua marca
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-0.5 truncate text-xs">
                        {row.titular} · {row.apres}
                      </p>
                    </div>
                    <p className="text-muted-foreground font-mono text-xs">
                      {row.classe}
                    </p>
                    <div>
                      <Badge variant={statusVariant(row.tone)}>
                        {row.situacao}
                      </Badge>
                    </div>
                    <p className="text-primary font-mono text-xs">
                      {row.numero} →
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-col md:hidden">
            {buscaResultados.map((row) => (
              <li
                key={row.id}
                className="border-border/70 border-b py-4 last:border-0"
              >
                <button type="button" className="flex w-full gap-3 text-left">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-border/70 font-mono text-[9px]"
                    style={{
                      color: row.logoColor,
                      background: `repeating-linear-gradient(135deg, ${row.logoColor}26 0 6px, ${row.logoColor}0f 6px 12px)`,
                    }}
                  >
                    {logoInitials(row.marca)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-display text-base text-ink">
                        {row.marca}
                      </span>
                      {row.fonetico && (
                        <Badge variant="info" className="text-[10px]">
                          Fonético
                        </Badge>
                      )}
                      {row.propria && (
                        <Badge variant="soft" className="text-[10px]">
                          Sua marca
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {row.titular} · {row.classe}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={statusVariant(row.tone)}>
                        {row.situacao}
                      </Badge>
                      <span className="text-primary font-mono text-[11px]">
                        {row.numero}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
