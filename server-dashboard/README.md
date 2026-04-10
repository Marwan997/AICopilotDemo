# Server Dashboard

Dark-mode monitoring dashboard scaffold for this machine, styled to feel closer to OpenClaw's dashboard.

## What it shows right now

- Host health overview
- Security posture summary
- Platform/service status cards
- TCP connection state summary
- Top process resource usage
- Disk usage snapshot
- Network adapter counters
- Recent system log events
- Next-step action list

## Current state

This first pass uses real snapshot data gathered from the host during setup, then renders it in a polished static UI.

Pending next step:

- replace hardcoded snapshots with live collectors
- finish parsing `openclaw status --deep`
- finish parsing `openclaw security audit --deep`
- add internet speed, latency, jitter and history collection
- add alerting and thresholds

## Run

```bash
cd server-dashboard/server-dashboard-ui
npm install
npm run dev
```

## Build

```bash
npm run build
```
