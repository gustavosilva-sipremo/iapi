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

## Deploy (Vercel)

O projeto já está configurado com `vercel.json` (SPA rewrite para o React Router).

1. Suba o repositório no GitHub
2. Em [vercel.com/new](https://vercel.com/new), importe o repo
3. Framework: **Vite** (detectado automaticamente) — Build `npm run build`, Output `dist`
4. Deploy

Rotas como `/analytics` e `/casos` funcionam em refresh graças ao rewrite para `index.html`.

## Estrutura

- `src/components/layout` — shell (sidebar colapsável + topbar)
- `src/pages` — Dashboard, Analytics, Meus Pedidos e placeholders
- `src/data` — navegação e mocks
- `.ref/` — material de referência do produto (não faz parte do build)
