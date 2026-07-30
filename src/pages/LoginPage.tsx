import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("aminy@nomequemarca.com")
  const [password, setPassword] = useState("123456789")
  const [remember, setRemember] = useState(true)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    login(email, remember)
    navigate("/", { replace: true })
  }

  return (
    <div className="animate-fade-in grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#0d0d0d] px-10 py-12 text-[#e9e2d6] lg:flex lg:px-14 lg:py-14">
        <div
          className="pointer-events-none absolute -top-16 -right-20 size-[360px] rounded-full border border-white/6"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-10 right-5 size-[240px] rounded-full border border-white/5"
          aria-hidden
        />

        <div className="relative flex items-center gap-3">
          <div
            className="font-display flex size-9 items-center justify-center rounded-full border border-[#f4f0e9]/70 text-base text-[#f4f0e9]"
            aria-hidden
          >
            n
          </div>
          <p className="font-display text-[17px] text-[#f4f0e9]">
            Nome Que Marca
          </p>
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#bc5a2c] uppercase">
            IAPI · Acesso restrito
          </p>
          <blockquote className="font-display mt-6 text-[1.85rem] leading-[1.3] font-light text-[#f4f0e9] italic xl:text-[2rem]">
            “Toda marca que marca
            <br />
            deve ser registrada.”
          </blockquote>
        </div>

        <p className="relative text-xs text-[#e9e2d6]/45">
          Ambiente seguro · Dados criptografados
        </p>
      </aside>

      <div className="bg-background flex flex-col justify-center px-5 py-10 sm:px-8 md:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div
              className="bg-brand-gradient text-primary-foreground font-display flex size-8 items-center justify-center rounded-lg text-sm italic"
              aria-hidden
            >
              i
            </div>
            <div>
              <p className="font-display text-base leading-none tracking-tight">
                IAPI
              </p>
              <p className="text-muted-foreground mt-0.5 text-[10px] tracking-wide">
                Nome Que Marca
              </p>
            </div>
          </div>

          <h1 className="font-display text-[1.75rem] tracking-tight text-ink sm:text-3xl md:text-[2.1rem]">
            Bem-vinda de volta.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
            Acesse a plataforma para continuar gerindo suas marcas.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-email"
                className="text-[12.5px] font-semibold tracking-wide"
              >
                E-mail
              </label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card/60 h-11 rounded-[10px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-password"
                className="text-[12.5px] font-semibold tracking-wide"
              >
                Senha
              </label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-card/60 h-11 rounded-[10px]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-[13px]">
              <label className="text-muted-foreground flex cursor-pointer items-center gap-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={remember}
                  onClick={() => setRemember((v) => !v)}
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                    remember
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card"
                  )}
                >
                  {remember && (
                    <span className="block size-1.5 rounded-[1px] bg-current" />
                  )}
                </button>
                Manter conectada
              </label>
              <button
                type="button"
                className="text-primary font-medium hover:underline"
              >
                Esqueci a senha
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-[10px] text-[15px] shadow-md"
            >
              Entrar →
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-[13px]">
            Não tem acesso?{" "}
            <button
              type="button"
              className="font-medium text-ink hover:underline"
            >
              Solicitar demonstração
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
