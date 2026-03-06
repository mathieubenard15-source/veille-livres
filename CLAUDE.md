# CLAUDE.md — Veille Livres

Application "Veille Livres" : landing page editoriale qui s'actualise automatiquement
chaque mercredi a 17h avec les sorties livres non-fiction de la semaine en France.

## Stack

- **Next.js 14** App Router, TypeScript
- **@vercel/kv** (Redis manage Vercel)
- **Anthropic API** `claude-opus-4-5` avec `web_search_20250305`
- **Vercel Cron Jobs** — `0 15 * * 3` (mer. 15h UTC = 17h Paris)

## Commandes

```bash
npm run dev        # Dev local
npm run build      # Build production
npm run lint       # ESLint
```

## Architecture

```
Vercel Cron (mer. 15h UTC)
  -> GET /api/cron [Authorization: Bearer CRON_SECRET]
    -> Anthropic API + web_search
      -> kv.set("digest:YYYY-MM-DD", json)
      -> kv.set("digest:latest", "digest:YYYY-MM-DD")
      -> kv.lpush("digest:index", "YYYY-MM-DD")
```

- `lib/prompt.ts` : System prompt, getWeekLabel(), getWeekKey(), getUserPrompt()
- `lib/digest.ts` : generateDigest(), getDigest(), listArchives() — logique KV
- `app/page.tsx` : Digest courant (revalidate 3600)
- `app/archives/page.tsx` : Grille des editions passees (revalidate 3600)
- `app/archives/[slug]/page.tsx` : Edition archivee (revalidate false)
- `components/DigestView.tsx` : Affichage digest complet (reutilise partout)

## Variables d'environnement

- `ANTHROPIC_API_KEY` — cle API Anthropic
- `CRON_SECRET` — secret pour authentifier le cron
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` — auto-injectees par Vercel KV

## Design

- Dark mode : fond #0f0f0f, accent jaune-or #e8c547
- Fonts : DM Sans (corps) + Playfair Display (titres)
- CSS custom dans globals.css (pas de Tailwind utility classes pour le layout)
