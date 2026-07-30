import { Plus } from "lucide-react"

import { PageHeader } from "@/components/PageHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { perfisLista, usuariosLista } from "@/data/gestao"
import { badgeVariantFromUsuarioStatus } from "@/lib/status-badge"

export function UsuariosPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      <PageHeader
        eyebrow="10 — Gestão"
        title="Usuários & perfis"
        description="Controle de acesso da equipe — quem vê o quê no estúdio."
        action={
          <Button type="button" className="w-fit shrink-0">
            <Plus className="size-4" />
            Convidar usuário
          </Button>
        }
      />

      <section
        className="animate-fade-in-up grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ animationDelay: "60ms" }}
      >
        {perfisLista.map((perfil) => (
          <div
            key={perfil.id}
            className="border-border/80 border-b pb-4 sm:border sm:rounded-xl sm:border-border/70 sm:p-4 sm:pb-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-base tracking-tight text-ink sm:text-lg">
                {perfil.nome}
              </h3>
              <span className="text-muted-foreground font-mono text-xs tabular-nums">
                {perfil.count}
              </span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {perfil.desc}
            </p>
          </div>
        ))}
      </section>

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <div className="border-border/70 hidden overflow-hidden rounded-xl border md:block">
          <div className="text-muted-foreground grid grid-cols-[1.8fr_1.1fr_1fr_1fr] gap-4 border-b border-border/70 px-5 py-3 font-mono text-[10px] tracking-[0.12em] uppercase">
            <div>Usuário</div>
            <div>Perfil</div>
            <div>Status</div>
            <div>Último acesso</div>
          </div>
          <ul>
            {usuariosLista.map((user) => (
              <li
                key={user.id}
                className="hover:bg-primary/[0.03] grid grid-cols-[1.8fr_1.1fr_1fr_1fr] items-center gap-4 border-b border-border/60 px-5 py-3.5 transition-colors last:border-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-9 ring-1 ring-border">
                    <AvatarFallback
                      className="font-display text-[11px] text-white"
                      style={{ background: user.avColor }}
                    >
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {user.nome}
                    </p>
                    <p className="text-muted-foreground mt-0.5 truncate text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: user.perfilColor }}
                    aria-hidden
                  />
                  <span className="text-sm text-ink">{user.perfil}</span>
                </div>
                <div>
                  <Badge variant={badgeVariantFromUsuarioStatus(user.status)}>
                    {user.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{user.acesso}</p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col md:hidden">
          {usuariosLista.map((user) => (
            <li
              key={user.id}
              className="border-border/70 flex gap-3 border-b py-4 last:border-0"
            >
              <Avatar className="size-10 shrink-0 ring-1 ring-border">
                <AvatarFallback
                  className="font-display text-xs text-white"
                  style={{ background: user.avColor }}
                >
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{user.nome}</p>
                  <Badge
                    variant={badgeVariantFromUsuarioStatus(user.status)}
                    className="shrink-0"
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 truncate text-xs">
                  {user.email}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-ink">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: user.perfilColor }}
                      aria-hidden
                    />
                    {user.perfil}
                  </span>
                  <span className="text-muted-foreground">· {user.acesso}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
