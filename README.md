# IQMaster

A modern, culture-fair online IQ test experience — inspired by classic certificate funnels, rebuilt with transparent pricing and calmer UX.

## Stack

- Vite + React + TypeScript
- React Router
- Netlify (SPA hosting + Functions)
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

## Deploy (Netlify)

Connected Git deploys use `netlify.toml`. For production payments, replace the demo unlock in `src/pages/TestPayment.tsx` with Stripe Checkout.

## Note

Scores are entertainment/education estimates, not clinical diagnoses.
