# IQMaster

A modern, culture-fair online IQ test experience — inspired by classic certificate funnels, rebuilt with transparent pricing and calmer UX.

## Live site

- **Production:** https://security-master.github.io/iqmaster/
- Local: http://127.0.0.1:5173

## Stack

- Vite + React + TypeScript + React Router
- GitHub Pages hosting
- Optional Supabase (results sync, contact inbox, org invites)
- Local session / credits when cloud is not configured

## Features

- Landing, About, FAQ, Blog (SEO articles), Pricing, Contact
- Age tracks: kids / teens / adult
- 30 visual matrix questions, early finish, integrity checks
- Demo unlock (Stripe later) or organization credit unlock
- Ability profile, richer printable report, social share
- Portable recovery codes + Display Results reopen
- Org dashboard: invites, participants, white-label colors, webhook
- TR/EN language toggle

## Develop

```bash
npm install
npm run dev
```

## Optional cloud setup (recommended)

1. Create a free Supabase project
2. Run SQL from `supabase/schema.sql` in the Supabase SQL Editor
3. Add GitHub Actions secrets (or local `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_CONTACT_TO_EMAIL` (optional FormSubmit fallback)
4. Redeploy GitHub Pages

Without Supabase, the app still works with localStorage + recovery codes.

## Build / deploy

```bash
npm run build
```

Push to `main` → **Deploy GitHub Pages** workflow.

For GitHub Pages path hosting, CI sets `GITHUB_PAGES=true` (base `/iqmaster/`).

## Note

Scores are entertainment/education estimates, not clinical diagnoses. Stripe is not connected yet.
