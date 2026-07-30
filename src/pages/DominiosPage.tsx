import { useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { domainChecks, socialChecks } from "@/data/inpi"

export function DominiosPage() {
  const [termo, setTermo] = useState("lumiere")

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-3xl">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          05 — Inteligência INPI
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Domínios & redes sociais
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Antes de registrar o nome, confira a disponibilidade do{" "}
          <strong className="font-medium text-ink">domínio</strong> e dos{" "}
          <strong className="font-medium text-ink">@usernames</strong> nas redes —
          tudo de uma vez.
        </p>
      </section>

      <section
        className="animate-fade-in-up flex flex-col gap-3 sm:flex-row sm:items-center"
        style={{ animationDelay: "60ms" }}
      >
        <Input
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          className="bg-card/50 h-11 max-w-md text-base"
          placeholder="Nome ou marca"
          aria-label="Nome para verificar"
        />
        <Button type="button" className="w-fit shrink-0">
          <Search className="size-4" />
          Verificar
        </Button>
      </section>

      <section
        className="animate-fade-in-up grid gap-10 lg:grid-cols-2 lg:gap-12"
        style={{ animationDelay: "120ms" }}
      >
        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Domínios
          </h3>
          <p className="text-muted-foreground mt-1 mb-5 text-sm">
            Extensões principais para “{termo || "…"}”.
          </p>
          <ul className="flex flex-col">
            {domainChecks.map((domain) => (
              <li
                key={domain.id}
                className="border-border/70 flex items-center justify-between gap-4 border-b py-3.5 last:border-0"
              >
                <span className="font-mono text-sm text-ink">{domain.name}</span>
                <Badge variant={domain.available ? "success" : "danger"}>
                  {domain.available ? "Disponível" : "Indisponível"}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Redes sociais
          </h3>
          <p className="text-muted-foreground mt-1 mb-5 text-sm">
            Handles e perfis relacionados.
          </p>
          <ul className="flex flex-col">
            {socialChecks.map((social) => (
              <li
                key={social.id}
                className="border-border/70 flex items-center justify-between gap-4 border-b py-3.5 last:border-0"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-ink">
                    {social.rede}
                  </span>
                  <span className="text-muted-foreground ml-2 font-mono text-xs">
                    {social.handle}
                  </span>
                </div>
                <Badge variant={social.available ? "success" : "danger"}>
                  {social.available ? "Disponível" : "Indisponível"}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
