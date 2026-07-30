import { useState } from "react"

import { PageHeader } from "@/components/PageHeader"
import { BuscaForm, type BuscaFormState } from "@/pages/busca/BuscaForm"
import { BuscaResults } from "@/pages/busca/BuscaResults"

const initialForm: BuscaFormState = {
  termo: "lumière",
  termoExtra: "lumiere",
  tipo: "radical",
  boolOp: "ou",
  classes: ["03", "05"],
  fonetica: true,
  titular: false,
  vigentes: false,
}

export function BuscaPage() {
  const [form, setForm] = useState<BuscaFormState>(initialForm)
  const [showResults, setShowResults] = useState(true)

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="03 — Inteligência INPI"
        title="Busca de marcas · INPI"
        maxWidthClassName="max-w-3xl"
        description={
          <>
            Pesquisa por{" "}
            <strong className="font-medium text-ink">radical</strong>,{" "}
            <strong className="font-medium text-ink">exata</strong> ou{" "}
            <strong className="font-medium text-ink">fonética</strong>, com
            operadores{" "}
            <strong className="font-medium text-ink">E / OU / E NÃO</strong> e
            várias classes ao mesmo tempo. Colidência e correspondência de
            classes num só lugar.
          </>
        }
      />

      <BuscaForm
        state={form}
        onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
        onSearch={() => setShowResults(true)}
        onClear={() => {
          setForm({
            ...initialForm,
            termo: "",
            termoExtra: "",
            classes: [],
          })
          setShowResults(false)
        }}
      />

      {showResults ? <BuscaResults /> : null}
    </div>
  )
}
