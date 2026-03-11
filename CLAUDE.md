# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # Install dependencies
npm run dev    # Start development server (Vite)
npm run build  # Production build
```

There is no test runner configured in this project.

## Architecture

This is a React 18 + TypeScript + Vite single-page application. State is persisted entirely in `localStorage` under the key `expense-tracker-data` — there is no backend.

**Entry point:** `src/main.tsx` → `src/app/App.tsx`

**State management:** All expense state lives in `App.tsx` as a single `expenses: Expense[]` array. The `Expense` interface is defined and exported from `AddExpenseForm.tsx`:

```ts
interface Expense {
  id: string;       // Date.now().toString()
  amount: number;
  category: string;
  date: string;     // ISO date string (YYYY-MM-DD)
  description: string;
}
```

**Feature components** (in `src/app/components/`):
- `AddExpenseForm.tsx` — form to add expenses; also exports the `Expense` type and `CATEGORIES` array
- `ExpenseList.tsx` — renders filterable expense rows with delete
- `ExpenseSummary.tsx` — 4 stat cards (total, monthly, top category, average)
- `ExpenseChart.tsx` — Recharts pie (by category) and bar (monthly trend) charts via Tabs
- `ExpenseFilter.tsx` — category filter buttons; filters applied in `App.tsx`

**UI primitives** (`src/app/components/ui/`): shadcn/ui components built on Radix UI primitives. Do not edit these directly — they are the design system base.

**Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`). Theme tokens (colors, radius, fonts) are defined as CSS custom properties in `src/styles/theme.css` and exposed to Tailwind via `@theme inline`. Dark mode uses the `.dark` class strategy. Styles are loaded via `src/styles/index.css` which imports `fonts.css`, `tailwind.css`, and `theme.css`.

**Path alias:** `@` maps to `src/` (configured in `vite.config.ts`).

**Additional dependencies worth knowing:** `lucide-react` for icons, `recharts` for charts, `react-hook-form` (installed but not yet used — the form uses local `useState`), `motion` for animations, `next-themes` for theme toggling.
