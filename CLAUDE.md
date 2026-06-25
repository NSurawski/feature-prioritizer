# Feature Prioritizer

A visual prioritization tool for PMs to score, rank, and communicate feature priorities using RICE, ICE, and Value vs. Effort frameworks.

## Tech Stack

- React 19 + TypeScript
- Vite 8 (dev server + build)
- Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- Recharts 3 (scatter plot / matrix visualization)
- localStorage for persistence (no backend)

## Commands

- `npm run dev` — Start dev server (http://localhost:5173)
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build
- `npm test` — Run tests once (Vitest)
- `npm run test:watch` — Run tests in watch mode

## Project Structure

```
src/
├── types.ts              # Feature types, scoring formulas, categories
├── hooks/
│   └── useLocalStorage.ts # Generic localStorage persistence hook
├── components/
│   ├── FeatureForm.tsx    # Add/edit form with framework-specific inputs
│   ├── FeatureList.tsx    # Ranked list sorted by priority score
│   ├── PriorityMatrix.tsx # 2x2 scatter plot with quadrant labels
│   └── ExportButton.tsx   # Copy prioritization as markdown
├── App.tsx               # Main layout, state management, framework switcher
├── main.tsx              # Entry point
└── index.css             # Tailwind import
```

## Code Conventions

- Use `type` imports for TypeScript types (`import type { Feature } from ...`)
- Tailwind classes for all styling (no CSS modules or inline styles)
- Dark theme only (gray-950 background)
- State lives in `App.tsx`, passed down as props (no context/state library)
- Features persist to localStorage under keys `fp-features` and `fp-framework`

## Architecture Notes

- Single-page app, no routing
- Fully client-side, no backend or auth
- Desktop-first (no mobile optimization)
- Three scoring frameworks share the same `Feature` data model — each feature stores scores for all frameworks simultaneously
- The scatter plot dynamically adjusts axes and reference lines based on the active framework
