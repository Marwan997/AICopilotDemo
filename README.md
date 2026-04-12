# AI Copilot Demo

AM Copilot demo focused on account manager workflows.

## What it does

- Search by `main_chef_id`
- Show brand or portfolio KPI summary first
- Show AI-generated portfolio analysis and recommendations
- Let the user choose a branch from a compact selector
- Show branch-level detail only after branch selection

## Local development

```bash
npm install
npm run dev
```

Open the app at:
- `http://127.0.0.1:5173`

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

This repo is configured for GitHub Pages at:
- <https://marwan997.github.io/AICopilotDemo/>

## Notes

- This is a frontend demo app built with Vite, React, and TypeScript.
- The KPI data is currently demo data for product presentation and iteration.
- The intended UX is portfolio-first, branch drilldown second.
