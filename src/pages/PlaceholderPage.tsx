import { useLocation } from "react-router-dom"

import { getNavItemByPath } from "@/data/nav"

export function PlaceholderPage() {
  const location = useLocation()
  const item = getNavItemByPath(location.pathname)
  const label = item?.label ?? "Seção"

  return (
    <div className="animate-fade-in-up mx-auto max-w-lg px-1 py-10 text-center sm:py-16">
      <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
        Em breve
      </p>
      <h2 className="font-display mt-3 text-2xl tracking-tight text-ink sm:text-3xl">
        {label}
      </h2>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:mt-4 sm:text-[15px]">
        Esta área fará parte do ecossistema IAPI. Por enquanto, o esqueleto
        garante a navegação — o conteúdo chega em seguida.
      </p>
    </div>
  )
}
