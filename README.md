# Feature Prioritizer

A visual prioritization tool that helps PMs score, rank, and communicate feature priorities using proven frameworks. Try the [live demo](https://nsurawski.github.io/feature-prioritizer/) — no account needed.

## Problem & Product Insight

PMs constantly face the question: "Why are we building X instead of Y?" Most teams rely on spreadsheets or gut instinct. Spreadsheets lack visualization, are hard to share, and don't enforce consistent scoring. This leads to:

- Inconsistent prioritization across features
- Difficulty communicating trade-offs to stakeholders
- Time wasted rebuilding priority matrices every quarter

This tool gives PMs a fast, visual way to score features and defend prioritization decisions with data.

## Features

- **Three frameworks** — Score features using RICE, ICE, or Value vs. Effort
- **Interactive 2x2 matrix** — Scatter plot with quadrant labels (Quick Wins, Big Bets, Fill-Ins, Money Pit)
- **Auto-ranked list** — Features sorted by priority score with color-coded categories
- **Export as markdown** — Copy a formatted prioritization table for stakeholder presentations
- **Sample data** — Pre-loaded features to explore immediately, with a reset button to restore them
- **localStorage persistence** — Your data stays in the browser across sessions, no backend needed

## Frameworks

### RICE Score
- **Reach** — Users impacted per quarter
- **Impact** — Impact per user (0.25 minimal to 3 massive)
- **Confidence** — Estimate confidence (50-100%)
- **Effort** — Person-months required
- **Formula:** (Reach x Impact x Confidence) / Effort

### ICE Score
- **Impact** — 1-10 scale
- **Confidence** — 1-10 scale
- **Ease** — 1-10 scale (inverse of effort)
- **Formula:** Impact x Confidence x Ease

### Value vs. Effort
- **Value** — 1-10 scale (combines reach + impact)
- **Effort** — 1-10 scale
- **Quadrants:** Quick Wins, Big Bets, Fill-Ins, Money Pit

## Tech Stack

- **Frontend:** React 19 + TypeScript (strict)
- **Build:** Vite
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts (scatter plot visualization)
- **Persistence:** localStorage (no backend)

## Getting Started

```bash
git clone https://github.com/NSurawski/feature-prioritizer.git
cd feature-prioritizer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it locally.

## Usage

1. Select a scoring framework (RICE, ICE, or Value vs. Effort)
2. Add features with names, descriptions, categories, and scores
3. View the ranked list and interactive scatter plot
4. Click **Copy as Markdown** to export for presentations

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
├── App.tsx               # Layout, state management, framework switcher
├── main.tsx              # Entry point
└── index.css             # Tailwind import
```

## Portfolio Context

This was built as a PM portfolio project to demonstrate how product managers make and defend prioritization decisions. See the [PRD](PRD.md) for the full product thinking — including user segments, success metrics, and v1 constraints.

## Author

Built by Nicole Surawski as part of her transition into Product Management.
