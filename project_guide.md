# The Chefz AI Center - Project Guide

## What this project is

This is an AM Copilot demo for account managers.

The goal is to help an AM:
- start from a brand or portfolio
- review the portfolio performance first
- understand which branches deserve attention
- drill into one branch only when needed
- use AI as an interpretation layer, not as the source of truth

In short, the analytics provide the numbers and the AI helps explain them and suggest commercial actions.

---

## What the app shows

### 1. Homepage / portfolio directory
The homepage lists all available brands or portfolios.

Each row represents one `main_chef_id` portfolio and shows:
- brand name
- `main_chef_id`
- branch count
- cuisine
- primary city
- total orders
- total GMV
- portfolio trend
- average score

This is meant to show scale immediately instead of hiding the dataset behind search.

---

### 2. Search
The main search input uses `main_chef_id`.

That means:
- you search by portfolio or brand id
- not by a single branch id
- not by merchant name text

Example:
- `1000`
- `1001`

---

### 3. Portfolio summary
After selecting a brand, the app shows a portfolio-first summary across all branches.

This includes:
- branch count
- orders
- GMV
- AOV
- delivered rate
- cancel rate
- free delivery percentage
- net take

### How to interpret portfolio trends
The orders and GMV trends are:
- **not running sums since the start of the dataset**
- **not lifetime totals**
- a comparison between the most recent period and the previous matching comparison period

So if orders trend is `+12%`, that means the recent comparison window is 12% above the previous one.

---

## Portfolio AI
The portfolio AI section is there to help an account manager understand:
- what kind of portfolio this is
- where the main upside is
- which branches deserve focus first
- what commercial levers make sense

### Important rule
The AI does **not** invent KPIs.

The AI only uses the existing data to generate:
- a summary
- likely explanations
- top AM actions
- talking points

The AI recommendations are deliberately framed around real AM work, such as:
- free delivery activation
- exclusive offers or exclusive access
- in-app marketing
- tailored growth plans and merchant pitches

It is **not** meant to act like an operations consultant.

---

## Branch selector
After the portfolio summary, the user gets a compact branch selector.

This is intentional.

The design principle is:
- first understand the brand or portfolio
- then shortlist the right branch
- then open branch detail

Each branch row shows:
- brand-based branch label
- city
- cuisine
- classification
- score
- recent orders

Example format:
- `KFC branch 100004`
- or in AI text: `KFC, Jeddah branch 100004`

---

## Branch detail
When a branch is selected, the app shows branch-level detail.

### Trends in branch detail
Like the portfolio trends, branch trends are:
- recent period vs previous matching period
- not cumulative since the beginning

### Operational KPIs
These are direct branch metrics from the curated dataset, including:
- delivered rate
- decline rate
- cancel rate
- free delivery rate
- subsidy ratio
- net take ratio

These are base signals used to understand branch quality and commercial setup.

### Peer position
Peer position shows how the branch ranks against comparable peers in the dataset.

It is expressed as percentile-style values.

Higher values mean the branch is stronger versus more peers for that metric.

Examples shown there include:
- orders percentile
- GMV percentile
- AOV percentile
- quality percentile
- efficiency percentile

### Composite score blocks
The branch score area includes:
- Growth
- Quality
- Efficiency
- Seasonality
- Benchmark

These are composite scoring dimensions from the curated demo dataset.

They are used to summarize the branch profile in a compact way and feed the AI explanation layer.

### Who calculated these?
These values are part of the curated demo dataset and supporting scoring logic for this prototype.

The AI does **not** calculate these metrics.
The AI reads and interprets them.

---

## How an AM should use this demo

Recommended flow:

1. Open the homepage and scan the available brands
2. Search by `main_chef_id` if you already know the portfolio
3. Review the portfolio summary first
4. Read the portfolio AI recommendations
5. Open one branch from the branch selector
6. Review branch-level KPIs and peer position
7. Use the branch AI section for merchant-facing talking points

This keeps the workflow close to real AM behavior:
- start broad
- narrow intelligently
- act branch by branch only when justified

---

## What to trust vs what to treat as explanation

### Trust as data layer
These are the system facts in the demo:
- orders
- GMV
- AOV
- delivered rate
- cancel rate
- decline rate
- free delivery rate
- subsidy ratio
- net take ratio
- percentile positions
- scoring dimensions

### Treat as explanation layer
These are the AI-generated interpretation outputs:
- summaries
- likely causes
- action recommendations
- merchant talking points
- watchouts

The AI should help the AM move faster, but it should not replace the underlying KPI review.

---

## Local app URLs

Main demo:
- `http://127.0.0.1:8080/`

Local monitoring route:
- `http://127.0.0.1:8080/monitoring`

Local monitoring API:
- `http://127.0.0.1:4173/`

---

## Current architecture notes

- Frontend: React + Vite + TypeScript
- Local demo currently uses embedded curated frontend data
- Monitoring is local-only and separate from the public demo flow
- GitHub Pages version is intended to remain demo-focused and cleaner than the local setup

---

## About images / screenshots

This guide does not include screenshots yet.

If you want, the next step can be:
1. capture screenshots of the homepage, portfolio summary, branch selector, and branch detail
2. add them into this guide
3. export the guide to PDF

That would give you a proper shareable handoff document.
