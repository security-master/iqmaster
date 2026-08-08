# IQMaster

A modern, culture-fair online IQ test experience — inspired by classic certificate funnels, rebuilt with transparent pricing and calmer UX.

## Stack

- Vite + React + TypeScript
- React Router
- Cloudflare Pages (+ Pages Functions)
- Local session storage for demo unlock flow

## Features

- Landing, About, FAQ, Blog, Pricing, Contact
- 30 original SVG matrix questions (6 options each)
- Timed test with reviewable answers
- Profile capture → demo checkout ($19) → scored results + printable certificate
- Display Results via Test ID + security code

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Cloudflare Pages)

### Option A — GitHub Actions (recommended)

1. Create a Cloudflare API token with **Cloudflare Pages: Edit**
2. Add repo secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to `main` (or run the **Deploy Cloudflare Pages** workflow)

### Option B — Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=iqmaster
```

### Option C — Cloudflare dashboard Git integration

Connect `security-master/iqmaster` in Workers & Pages → Create → Connect to Git.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

## Note

Scores are entertainment/education estimates, not clinical diagnoses.

## Live preview

- Temporary site: https://iqmaster-preview.dandelion-flock.workers.dev
- Progress: https://iqmaster-preview.dandelion-flock.workers.dev/progress
- Local: http://127.0.0.1:5173
- Claim temporary Cloudflare account (≈60 min):  
  https://dash.cloudflare.com/claim-preview?claimToken=IBCVMKqwMippyvStCt_CEin2FI4WWLvK4J-X3bpwwg4

### Permanent hosting (recommended)

1. Open https://github.com/security-master/iqmaster/settings/pages
2. Source → **GitHub Actions**
3. Push to `main` (workflow: Deploy GitHub Pages)
4. Site URL will be: `https://security-master.github.io/iqmaster/`

```bash
npm run build
rm -f dist/_redirects
npx wrangler deploy --temporary --config wrangler.preview.toml
```

