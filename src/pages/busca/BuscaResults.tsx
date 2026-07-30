import { Badge } from "@/components/ui/badge"
import {
  buscaFoneticosCount,
  buscaResultados,
  buscaResultsCount,
} from "@/data/inpi"
import { badgeVariantFromTone } from "@/lib/status-badge"

function logoInitials(marca: string) {
  return marca.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3).toUpperCase()
}

function LogoMark({
  marca,
  color,
  className,
}: {
  marca: string
  color: string
  className?: string
}) {
  return (
    <div
      className={
        className ??
        "flex size-12 items-center justify-center rounded-[10px] border border-border/70 font-mono text-[9px] tracking-wide"
      }
      style={{
        color,
        background: `repeating-linear-gradient(135deg, ${color}26 0 6px, ${color}0f 6px 12px)`,
      }}
    >
      {logoInitials(marca)}
    </div>
  )
}

export function BuscaResults() {
  return (
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
                <LogoMark marca={row.marca} color={row.logoColor} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-display text-[15px] tracking-tight text-ink">
                      {row.marca}
                    </span>
                    {row.fonetico ? (
                      <Badge variant="info" className="text-[10px]">
                        Fonético
                      </Badge>
                    ) : null}
                    {row.propria ? (
                      <Badge variant="soft" className="text-[10px]">
                        Sua marca
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-muted-foreground mt-0.5 truncate text-xs">
                    {row.titular} · {row.apres}
                  </p>
                </div>
                <p className="text-muted-foreground font-mono text-xs">
                  {row.classe}
                </p>
                <div>
                  <Badge variant={badgeVariantFromTone(row.tone)}>
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
              <LogoMark
                marca={row.marca}
                color={row.logoColor}
                className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-border/70 font-mono text-[9px]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-display text-base text-ink">
                    {row.marca}
                  </span>
                  {row.fonetico ? (
                    <Badge variant="info" className="text-[10px]">
                      Fonético
                    </Badge>
                  ) : null}
                  {row.propria ? (
                    <Badge variant="soft" className="text-[10px]">
                      Sua marca
                    </Badge>
                  ) : null}
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {row.titular} · {row.classe}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant={badgeVariantFromTone(row.tone)}>
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
  )
}
