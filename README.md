# IQ Master

A small logic-and-pattern quiz built with **Vite + React + TypeScript** and served by
**Netlify Functions**. Questions are delivered by an API function (without the answer
key), and submissions are graded server-side.

## Stack

- Vite + React 18 + TypeScript (SPA)
- Netlify Functions (`netlify/functions/`) for the `/api/questions` and `/api/score` endpoints
- [`@netlify/vite-plugin`](https://www.npmjs.com/package/@netlify/vite-plugin) so Netlify
  primitives (Functions, env vars) work in local `vite` dev — no `netlify dev` wrapper needed

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

The dev server serves both the React app and the Netlify Functions at `/api/*`.

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with Netlify support |
| `npm run build`     | Type-check and build the production bundle to `dist/` |
| `npm run preview`   | Preview the production build locally          |
| `npm run typecheck` | Run the TypeScript compiler with no emit      |

## API

| Method | Path             | Description                                    |
| ------ | ---------------- | ---------------------------------------------- |
| `GET`  | `/api/questions` | Returns quiz questions (no answer key)         |
| `POST` | `/api/score`     | Grades `{ answers: { [id]: choiceIndex } }`    |

## Deployment

Configured for Netlify via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirect to `index.html`
