# web

UMAKER public landing page, implemented with Next.js App Router and exported as a static Cloudflare Pages site.

Current scope:

- One public landing page only.
- Static multilingual routes use `app/[locale]` for non-default locales: `/zh/` is Simplified Chinese.
- `/` is the English default. It redirects in the browser to `/zh/` only when `navigator.languages` starts with `zh`; all other browsers stay on `/`.
- Manual language switching sets a session flag so selecting English from `/zh/` is not immediately overridden by the browser-language redirect.
- Page copy is centralized in `lib/i18n.ts`; do not duplicate localized JSX pages.
- Strategy detail pages and public strategy monitor are intentionally out of scope.
- Public metrics are marked as demo or scope indicators, not live performance.
- Particle visuals are semantic topology components. They receive generic nodes and edges, and must not couple directly to strategy or exchange business logic.
- Page reveal motion uses `motion`; scroll narrative sequencing uses `gsap`.
- All animation must respect reduced-motion preferences.

```bash
pnpm --filter @umaker/web dev
pnpm --filter @umaker/web build
pnpm --filter @umaker/web typecheck
```

The production build uses `next build --webpack` to keep local and CI static export stable in environments where Turbopack cannot bind its internal IPC endpoint.

Local dev runs on:

```text
http://localhost:8788
```

Static export output:

```text
apps/web/out
```

Cloudflare Pages deploy uses:

```bash
pnpm --filter @umaker/web deploy
```
