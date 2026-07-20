# IAPI · Nome Que Marca

Esqueleto do dashboard de gestão de marcas, processos e operações do estúdio.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (Radix)
- React Router

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` — a home é o dashboard (sem landing/login).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Lint com oxlint |

## Estrutura

- `src/components/layout` — shell (sidebar colapsável + topbar)
- `src/pages` — Dashboard e placeholders das demais seções
- `src/data` — navegação e mocks
- `.ref/` — material de referência do produto (não faz parte do build)
