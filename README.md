# Cloudflare Workers Full-Stack Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/laciferin2024/coin.fi)

A production-ready full-stack application template built on Cloudflare Workers. Features a React frontend with Vite, shadcn/ui components, TailwindCSS, and a Hono-powered Workers backend with Durable Objects for persistent state.

## Features

- **Cloudflare Workers Backend**: Serverless API with Hono routing, CORS, logging, and error handling.
- **Durable Objects**: Built-in SQLite-backed storage for counters, lists, and persistent data.
- **React 18 Frontend**: Vite-powered, TypeScript, with React Router, TanStack Query, and client-side state management.
- **Modern UI**: shadcn/ui components, TailwindCSS with custom design tokens, dark mode, animations, and responsive design.
- **State Management**: Immer/Zustand ready, TanStack Query for data fetching.
- **Developer Experience**: Hot reload, TypeScript end-to-end, ESLint, error boundaries, and client error reporting.
- **Demo Endpoints**: Counter, demo items CRUD operations using Durable Objects.
- **Layout Options**: Optional app sidebar with collapsible mobile support.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, shadcn/ui, Lucide React, Framer Motion, React Router, TanStack Query, Sonner (toasts), Radix UI primitives.
- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite).
- **Tools**: Bun (package manager), Wrangler (CLI), ESLint, PostCSS.
- **Utilities**: clsx, tailwind-merge, Zod, UUID, Date-fns.

## Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed.
   - [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/installation/) installed and authenticated (`wrangler login`).

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

3. **Development**:
   ```bash
   bun run dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`). Frontend and Worker hot-reload.

4. **Type Generation** (for Worker env types):
   ```bash
   bun run cf-typegen
   ```

## Development

### Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server (Vite + Worker preview). |
| `bun run build` | Build frontend assets. |
| `bun run lint` | Run ESLint. |
| `bun run preview` | Preview production build. |
| `bun run deploy` | Build + deploy to Cloudflare. |
| `bun run cf-typegen` | Generate Worker types. |

### Project Structure

```
├── src/              # React frontend
├── worker/           # Cloudflare Worker backend
├── shared/           # Shared types & mocks
├── tailwind.config.js # Tailwind + shadcn config
└── wrangler.jsonc    # Worker config
```

- **Frontend Customization**: Edit `src/pages/HomePage.tsx`. Add routes in `src/main.tsx`.
- **Backend Routes**: Add endpoints in `worker/userRoutes.ts` (auto-loaded).
- **Durable Objects**: Extend `worker/durableObject.ts`.
- **UI Components**: Use shadcn/ui from `@/components/ui/*`. Add custom in `src/components/`.
- **Theme**: Toggle with `ThemeToggle`. Custom CSS vars in `src/index.css`.

### API Endpoints (Demo)

Base URL: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check. |
| GET | `/api/test` | Simple test. |
| GET | `/api/counter` | Get counter value (Durable Object). |
| POST | `/api/counter/increment` | Increment counter. |
| GET/POST/PUT/DELETE | `/api/demo` | CRUD demo items (Durable Object). |
| POST | `/api/client-errors` | Report frontend errors. |

### Env Bindings (Wrangler)

- `GlobalDurableObject`: Durable Object namespace.

## Deployment

Deploy to Cloudflare Workers with Pages integration (SPA + API):

```bash
bun run deploy
```

This builds frontend assets and deploys the Worker. Assets are served as a single-page app.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/laciferin2024/coin.fi)

### Custom Domain & Config

Edit `wrangler.jsonc`:
- Update `name`.
- Add secrets: `wrangler secret put <NAME>`.
- Custom assets/domain in `assets` block.

### Production Tips

- Enable Workers Analytics Engine for metrics.
- Use KV/R2 for additional storage.
- Minify with Vite (enabled in prod).
- Monitor with Cloudflare dashboard.

## Contributing

1. Fork & clone.
2. `bun install`.
3. `bun run dev`.
4. Submit PR.

Report issues via GitHub.

## License

MIT. See [LICENSE](LICENSE) for details.