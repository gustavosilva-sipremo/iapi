import {
  kpis,
  upcomingDeadlines,
  priorityTasks,
  processPipeline,
  type DeadlineUrgency,
  type TaskPriority,
} from "@/data/mock"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

function formatToday(): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date())
}

function urgencyVariant(urgency: DeadlineUrgency) {
  if (urgency === "critico") return "danger" as const
  if (urgency === "atencao") return "soft" as const
  return "outline" as const
}

function priorityLabel(priority: TaskPriority) {
  if (priority === "alta") return "Alta"
  if (priority === "media") return "Média"
  return "Baixa"
}

export function DashboardPage() {
  const today = formatToday()

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <section className="animate-fade-in-up max-w-2xl">
        <p className="text-muted-foreground text-xs capitalize sm:text-sm">
          {today}
        </p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-[1.15] tracking-tight text-ink sm:mt-2 sm:text-3xl md:text-4xl">
          Bom dia, Aminy.
        </h2>
        <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[15px]">
          Um olhar sereno sobre o que pede atenção hoje — processos, prazos e
          o ritmo do estúdio.
        </p>
      </section>

      <section
        className="animate-fade-in-up grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        style={{ animationDelay: "60ms" }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="border-border/80 group border-b pb-3 transition-colors hover:border-primary/40 sm:pb-4"
          >
            <p className="text-muted-foreground text-[11px] tracking-wide sm:text-[12px]">
              {kpi.label}
            </p>
            <p
              className={cn(
                "font-display mt-1.5 text-2xl tracking-tight sm:mt-2 sm:text-3xl",
                kpi.tone === "danger" ? "text-destructive" : "text-ink"
              )}
            >
              {kpi.value}
            </p>
            <p className="text-muted-foreground mt-1 text-[11px] sm:mt-1.5 sm:text-xs">
              {kpi.hint}
            </p>
          </div>
        ))}
      </section>

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <div className="mb-4 sm:mb-5">
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Pipeline de processos
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Do depósito ao registro — visão do portfólio ativo.
          </p>
        </div>

        {/* Mobile: stack vertical */}
        <div className="flex flex-col gap-3 sm:hidden">
          {processPipeline.map((stage) => (
            <div
              key={stage.id}
              className="border-border/60 flex items-center justify-between gap-3 border-b pb-3 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
                  {stage.label}
                </span>
                <div className="bg-blush-soft mt-2 h-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary/70 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, stage.count * 12)}%`,
                    }}
                  />
                </div>
              </div>
              <span className="font-display text-xl text-ink tabular-nums">
                {stage.count}
              </span>
            </div>
          ))}
        </div>

        {/* sm+: horizontal pipeline */}
        <div className="hidden items-stretch sm:flex sm:flex-wrap sm:gap-0">
          {processPipeline.map((stage, index) => (
            <div
              key={stage.id}
              className="flex min-w-25 flex-1 items-stretch"
            >
              <div className="flex flex-1 flex-col gap-2 px-1 py-2">
                <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
                  {stage.label}
                </span>
                <span className="font-display text-2xl text-ink">
                  {stage.count}
                </span>
                <div className="bg-blush-soft h-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary/70 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, stage.count * 12)}%`,
                    }}
                  />
                </div>
              </div>
              {index < processPipeline.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="mx-1 h-auto opacity-50"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        className="animate-fade-in-up grid gap-8 sm:gap-10 lg:grid-cols-2"
        style={{ animationDelay: "180ms" }}
      >
        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Próximos prazos
          </h3>
          <p className="text-muted-foreground mt-1 mb-4 text-sm sm:mb-5">
            Alertas legais e obrigações do portfólio.
          </p>
          <ul className="flex flex-col">
            {upcomingDeadlines.map((item) => (
              <li
                key={item.id}
                className="border-border/70 flex flex-col gap-2 border-b py-3.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink sm:truncate">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                    {item.process} · {item.client}
                  </p>
                </div>
                <div className="flex shrink-0 items-start sm:flex-col sm:items-end sm:gap-1.5">
                  <Badge variant={urgencyVariant(item.urgency)}>
                    {item.due}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            Tarefas prioritárias
          </h3>
          <p className="text-muted-foreground mt-1 mb-4 text-sm sm:mb-5">
            O que move o dia — sem ruído.
          </p>
          <ul className="flex flex-col">
            {priorityTasks.map((task) => (
              <li
                key={task.id}
                className="border-border/70 flex flex-col gap-2 border-b py-3.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{task.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {task.client} · {task.assignee}
                  </p>
                </div>
                <Badge
                  variant={task.priority === "alta" ? "soft" : "outline"}
                  className="w-fit shrink-0"
                >
                  {priorityLabel(task.priority)}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
