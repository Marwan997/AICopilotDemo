# Server Dashboard UI

Live dark-mode monitoring dashboard for this machine.

## Features

- Live Windows host metrics
- CPU, memory, disk and network counters
- TCP state breakdown
- Top processes
- Recent Windows system log events
- Windows Defender and firewall status
- OpenClaw status, update check and deep security audit output
- Internet latency and jitter sampling to 1.1.1.1
- In-memory short history for trend charts
- Auto-refresh every 15 seconds

## Run in stable local serve mode

```bash
npm install
npm run serve
```

This builds the frontend and starts two fixed local services:
- dashboard UI on `http://127.0.0.1:8080`
- API health on `http://127.0.0.1:4173/api/health`

## Dev mode

```bash
npm run dev
```

Dev mode starts:
- frontend on `http://127.0.0.1:5173`
- monitoring API on `http://127.0.0.1:4173`

## Notes

- The backend collector is Windows-oriented and uses PowerShell plus OpenClaw CLI commands.
- History is currently kept in memory and resets when the server restarts.
- Internet quality currently uses ping latency and jitter, not full download/upload speed tests yet.
- `openclaw security audit --deep` is relatively heavy, so if needed we can move it to a slower refresh cadence or cache tier.
