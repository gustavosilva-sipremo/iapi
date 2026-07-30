import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  agendaCalDays,
  agendaCompromissos,
  agendaMonthLabel,
  agendaWeekDays,
} from "@/data/processos"
import { cn } from "@/lib/utils"

export function AgendaPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
            06 — Operação
          </p>
          <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
            Agenda
          </h2>
          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
            Reuniões, prazos e rituais do estúdio no calendário.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-tight text-ink sm:text-xl">
            {agendaMonthLabel}
          </span>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-border/80"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-border/80"
              aria-label="Próximo mês"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section
        className="animate-fade-in-up grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10"
        style={{ animationDelay: "80ms" }}
      >
        <div className="min-w-0">
          <div className="text-muted-foreground mb-2 grid grid-cols-7 gap-1 font-mono text-[10px] tracking-[0.12em] uppercase sm:gap-1.5">
            {agendaWeekDays.map((day) => (
              <div key={day} className="px-1 py-1 text-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {agendaCalDays.map((cell) => (
              <div
                key={cell.day}
                className={cn(
                  "border-border/70 flex min-h-14 flex-col gap-1 overflow-hidden rounded-lg border p-1.5 sm:min-h-20 sm:p-2",
                  cell.isToday && "border-primary bg-primary/8"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums sm:text-xs",
                    cell.isToday ? "text-primary font-medium" : "text-ink"
                  )}
                >
                  {cell.day}
                </span>
                <div className="hidden flex-col gap-0.5 sm:flex">
                  {cell.events.map((ev) => (
                    <div
                      key={ev.label}
                      className="truncate rounded px-1 py-0.5 text-[9px] leading-tight font-medium text-white"
                      style={{ background: ev.color }}
                      title={ev.label}
                    >
                      {ev.label}
                    </div>
                  ))}
                </div>
                {cell.events.length > 0 && (
                  <div className="mt-auto flex gap-0.5 sm:hidden">
                    {cell.events.map((ev) => (
                      <span
                        key={ev.label}
                        className="size-1.5 rounded-full"
                        style={{ background: ev.color }}
                        aria-hidden
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Próximos compromissos
          </h3>
          <ul className="mt-4 flex flex-col sm:mt-5">
            {agendaCompromissos.map((item) => (
              <li
                key={item.id}
                className="border-border/70 flex items-start gap-3 border-b py-3.5 last:border-0"
              >
                <span
                  className="mt-1.5 size-2.5 shrink-0 rounded-full"
                  style={{ background: item.color }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {item.meta}
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 font-mono text-[11px] tabular-nums">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
