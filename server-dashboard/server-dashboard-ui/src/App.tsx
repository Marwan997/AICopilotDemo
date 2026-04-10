import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

type Tone = 'good' | 'warn' | 'critical' | 'info'

type DashboardPayload = {
  meta?: {
    lastFastCollectionAt?: string | null
    lastSlowCollectionAt?: string | null
  }
  timestamp: string
  host?: {
    WindowsProductName?: string
    WindowsVersion?: string
    OsHardwareAbstractionLayer?: string
    CsTotalPhysicalMemory?: number
  }
  os?: {
    freePhysicalMemoryGB?: number
    totalVisibleMemoryGB?: number
    lastBootUpTime?: string
  }
  counters?: {
    cpuPercent?: number
    memoryAvailableMB?: number
    diskPercent?: number
    network?: { path: string; value: number }[]
  }
  processes?: { ProcessName?: string; Id?: number; CPU?: number; WSMB?: number }[]
  firewall?: {
    Name?: string
    Enabled?: boolean
    DefaultInboundAction?: string
    DefaultOutboundAction?: string
  }[]
  defender?: {
    AMServiceEnabled?: boolean
    AntivirusEnabled?: boolean
    RealTimeProtectionEnabled?: boolean
    BehaviorMonitorEnabled?: boolean
    IoavProtectionEnabled?: boolean
    AntivirusSignatureLastUpdated?: string
  }
  adapters?: {
    Name?: string
    ReceivedBytes?: number
    SentBytes?: number
    ReceivedUnicastPackets?: number
    SentUnicastPackets?: number
  }[]
  connections?: { Name?: string; Count?: number }[]
  disks?: { Name?: string; UsedGB?: number; FreeGB?: number; UsedPercent?: number }[]
  events?: {
    TimeCreated?: string
    LevelDisplayName?: string
    ProviderName?: string
    Id?: number
    Message?: string
  }[]
  internet?: {
    latencyMs?: number | null
    jitterMs?: number | null
    packetSamples?: number[]
  }
  openclaw?: {
    status?: string
    updateStatus?: string
    audit?: string
  }
  derived?: {
    cpuTone?: Tone
    diskTone?: Tone
    internetTone?: Tone
    memoryUsedPercent?: number
  }
  history?: {
    timestamp: string
    cpuPercent: number
    memoryFreeGb: number
    memoryUsedPercent: number
    diskUsedPercent: number
    latencyMs: number | null
    jitterMs: number | null
    internetQuality: Tone
  }[]
}

type ApiResponse = {
  ok: boolean
  data?: DashboardPayload
  error?: string | null
}

function formatBytes(bytes?: number) {
  if (bytes === undefined || Number.isNaN(bytes)) return 'n/a'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = bytes
  let index = 0
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index += 1
  }
  return `${value.toFixed(value >= 100 || index === 0 ? 0 : 1)} ${units[index]}`
}

function formatNumber(value?: number | null, suffix = '') {
  if (value === undefined || value === null || Number.isNaN(value)) return 'n/a'
  return `${value}${suffix}`
}

function formatDate(value?: string) {
  if (!value) return 'n/a'
  return new Date(value).toLocaleString()
}

function toneClass(tone: Tone = 'info') {
  return `tone-${tone}`
}

function metricTone(value: number, warn: number, critical: number): Tone {
  if (value >= critical) return 'critical'
  if (value >= warn) return 'warn'
  return 'good'
}

function MiniChart({ values, color = 'var(--accent)' }: { values: number[]; color?: string }) {
  const points = useMemo(() => {
    if (!values.length) return ''
    const max = Math.max(...values, 1)
    return values
      .map((value, index) => {
        const x = (index / Math.max(values.length - 1, 1)) * 100
        const y = 100 - (value / max) * 100
        return `${x},${y}`
      })
      .join(' ')
  }, [values])

  return (
    <svg viewBox="0 0 100 100" className="mini-chart" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async (force = false) => {
    try {
      force ? setRefreshing(true) : setLoading(true)
      const response = await fetch(force ? '/api/refresh' : '/api/dashboard', {
        method: force ? 'POST' : 'GET',
      })
      const json = (await response.json()) as ApiResponse
      if (!json.ok || !json.data) {
        throw new Error(json.error ?? 'Failed to load dashboard data')
      }
      setPayload(json.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown dashboard error')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void loadData(false)
    const timer = window.setInterval(() => void loadData(false), 15000)
    return () => window.clearInterval(timer)
  }, [loadData])

  const cpuPercent = payload?.counters?.cpuPercent ?? 0
  const memoryFree = payload?.os?.freePhysicalMemoryGB ?? 0
  const memoryTotal = payload?.os?.totalVisibleMemoryGB ?? 0
  const memoryUsedPercent = payload?.derived?.memoryUsedPercent ?? 0
  const diskPrimary = payload?.disks?.[0]
  const latency = payload?.internet?.latencyMs ?? null
  const jitter = payload?.internet?.jitterMs ?? null
  const networkTotal = (payload?.counters?.network ?? []).reduce((sum, item) => sum + item.value, 0)
  const firewallEnabled = (payload?.firewall ?? []).every((profile) => profile.Enabled)
  const defenderHealthy = Boolean(payload?.defender?.AntivirusEnabled && payload?.defender?.RealTimeProtectionEnabled)
  const auditText = payload?.openclaw?.audit ?? ''
  const updateText = payload?.openclaw?.updateStatus ?? ''
  const auditTone: Tone = auditText.toLowerCase().includes('potential') || auditText.toLowerCase().includes('warning') ? 'warn' : 'good'
  const updateTone: Tone = updateText.toLowerCase().includes('update available') ? 'warn' : 'good'
  const history = payload?.history ?? []

  const overviewCards: { label: string; value: string; detail: string; tone: Tone }[] = [
    {
      label: 'CPU Load',
      value: `${cpuPercent.toFixed(1)}%`,
      detail: 'Live total processor time',
      tone: metricTone(cpuPercent, 65, 90),
    },
    {
      label: 'Memory Pressure',
      value: `${memoryUsedPercent.toFixed(1)}%`,
      detail: `${memoryFree.toFixed(1)} GB free of ${memoryTotal.toFixed(1)} GB`,
      tone: metricTone(memoryUsedPercent, 70, 85),
    },
    {
      label: 'Primary Disk',
      value: `${diskPrimary?.UsedPercent?.toFixed(1) ?? '0'}%`,
      detail: `${diskPrimary?.FreeGB?.toFixed(1) ?? '0'} GB free on ${diskPrimary?.Name ?? 'C:'}`,
      tone: metricTone(diskPrimary?.UsedPercent ?? 0, 75, 90),
    },
    {
      label: 'Internet Latency',
      value: latency === null ? 'offline' : `${latency} ms`,
      detail: `Jitter ${formatNumber(jitter, ' ms')} to 1.1.1.1`,
      tone: payload?.derived?.internetTone ?? 'info',
    },
  ]

  const securityCards: { label: string; value: string; detail: string; tone: Tone }[] = [
    {
      label: 'Windows Defender',
      value: defenderHealthy ? 'Protected' : 'Attention',
      detail: `Signatures ${formatDate(payload?.defender?.AntivirusSignatureLastUpdated)}`,
      tone: defenderHealthy ? 'good' : 'critical',
    },
    {
      label: 'Firewall',
      value: firewallEnabled ? 'Enabled' : 'Disabled',
      detail: `${payload?.firewall?.length ?? 0} profiles checked`,
      tone: firewallEnabled ? 'good' : 'critical',
    },
    {
      label: 'OpenClaw Audit',
      value: auditTone === 'good' ? 'Healthy' : 'Issues found',
      detail: auditText.split('\n').find((line) => line.trim()) ?? 'Audit output loaded',
      tone: auditTone,
    },
    {
      label: 'OpenClaw Updates',
      value: updateTone === 'warn' ? 'Available' : 'Current',
      detail: updateText.split('\n').find((line) => line.includes('Update')) ?? 'Update status loaded',
      tone: updateTone,
    },
  ]

  if (loading) {
    return <div className="loading-state">Loading live monitoring data…</div>
  }

  return (
    <div className="dashboard-shell">
      <header className="hero-panel panel">
        <div>
          <p className="eyebrow">Mario • Live Monitoring</p>
          <h1>Server command center</h1>
          <p className="hero-copy">
            Live Windows and OpenClaw monitoring, refreshed automatically with local collector data.
          </p>
          <div className="hero-meta">
            <span>{payload?.host?.WindowsProductName ?? 'Windows host'}</span>
            <span>{payload?.host?.WindowsVersion ?? 'n/a'}</span>
            <span>Last sample {formatDate(payload?.timestamp)}</span>
            <span>OpenClaw cache {formatDate(payload?.meta?.lastSlowCollectionAt ?? undefined)}</span>
          </div>
        </div>
        <div className="hero-actions">
          <div className={`hero-pill ${toneClass(payload?.derived?.internetTone ?? 'info')}`}>
            Internet {latency === null ? 'offline' : `${latency} ms`}
          </div>
          <div className={`hero-pill ${toneClass(metricTone(cpuPercent, 65, 90))}`}>
            CPU {cpuPercent.toFixed(1)}%
          </div>
          <button className="refresh-button" onClick={() => void loadData(true)} disabled={refreshing}>
            {refreshing ? 'Refreshing…' : 'Refresh now'}
          </button>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Core health snapshot</h2>
          </div>
        </div>
        <div className="metric-grid">
          {overviewCards.map((card) => (
            <article key={card.label} className={`metric-card ${toneClass(card.tone)}`}>
              <span className="metric-label">{card.label}</span>
              <strong className="metric-value">{card.value}</strong>
              <span className="metric-detail">{card.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Security</p>
            <h2>Protection and posture</h2>
          </div>
        </div>
        <div className="metric-grid">
          {securityCards.map((card) => (
            <article key={card.label} className={`metric-card ${toneClass(card.tone)}`}>
              <span className="metric-label">{card.label}</span>
              <strong className="metric-value">{card.value}</strong>
              <span className="metric-detail">{card.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">History</p>
              <h2>Recent trend lines</h2>
            </div>
          </div>
          <div className="history-grid">
            <div className="history-card">
              <div className="bar-row-header">
                <strong>CPU</strong>
                <span>{cpuPercent.toFixed(1)}%</span>
              </div>
              <MiniChart values={history.map((item) => item.cpuPercent)} color="var(--accent)" />
            </div>
            <div className="history-card">
              <div className="bar-row-header">
                <strong>Memory used</strong>
                <span>{memoryUsedPercent.toFixed(1)}%</span>
              </div>
              <MiniChart values={history.map((item) => item.memoryUsedPercent)} color="var(--warn)" />
            </div>
            <div className="history-card">
              <div className="bar-row-header">
                <strong>Disk used</strong>
                <span>{diskPrimary?.UsedPercent?.toFixed(1) ?? '0'}%</span>
              </div>
              <MiniChart values={history.map((item) => item.diskUsedPercent)} color="var(--good)" />
            </div>
            <div className="history-card">
              <div className="bar-row-header">
                <strong>Latency</strong>
                <span>{latency === null ? 'n/a' : `${latency} ms`}</span>
              </div>
              <MiniChart values={history.map((item) => item.latencyMs ?? 0)} color="var(--accent-2)" />
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Connections</p>
              <h2>TCP state spread</h2>
            </div>
          </div>
          <div className="bar-list">
            {(payload?.connections ?? []).map((item) => (
              <div key={item.Name} className="bar-row">
                <div className="bar-row-header">
                  <span>{item.Name}</span>
                  <strong>{item.Count}</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.min((item.Count ?? 0) * 1.8, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Processes</p>
              <h2>Top resource consumers</h2>
            </div>
          </div>
          <div className="process-list">
            {(payload?.processes ?? []).map((process) => (
              <div key={`${process.ProcessName}-${process.Id}`} className="process-row">
                <div>
                  <strong>{process.ProcessName}</strong>
                  <p>PID {process.Id}</p>
                </div>
                <div className="process-metrics">
                  <span>CPU {formatNumber(process.CPU)}</span>
                  <span>RAM {formatNumber(process.WSMB, ' MB')}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Storage</p>
              <h2>Filesystem pressure</h2>
            </div>
          </div>
          <div className="disk-list">
            {(payload?.disks ?? []).map((disk) => (
              <div key={disk.Name} className="disk-card">
                <div className="bar-row-header">
                  <strong>{disk.Name}</strong>
                  <span>{disk.UsedPercent?.toFixed(1)}% used</span>
                </div>
                <div className="bar-track large">
                  <div className="bar-fill" style={{ width: `${disk.UsedPercent ?? 0}%` }} />
                </div>
                <p>
                  {disk.FreeGB?.toFixed(1)} GB free / {disk.UsedGB?.toFixed(1)} GB used
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Adapters</p>
              <h2>Network interfaces</h2>
            </div>
          </div>
          <div className="table-grid">
            {(payload?.adapters ?? []).map((adapter) => (
              <div key={adapter.Name} className="table-row compact">
                <div>
                  <strong>{adapter.Name}</strong>
                  <p>
                    Packets {formatNumber(adapter.ReceivedUnicastPackets)} in / {formatNumber(adapter.SentUnicastPackets)} out
                  </p>
                </div>
                <div className="process-metrics align-right">
                  <span>RX {formatBytes(adapter.ReceivedBytes)}</span>
                  <span>TX {formatBytes(adapter.SentBytes)}</span>
                </div>
              </div>
            ))}
            <div className="table-row compact">
              <div>
                <strong>Aggregate throughput</strong>
                <p>All reported network interfaces</p>
              </div>
              <div className="process-metrics align-right">
                <span>{formatBytes(networkTotal)}/s</span>
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OpenClaw</p>
              <h2>Runtime and security output</h2>
            </div>
          </div>
          <div className="terminal-card">
            <h3>Status</h3>
            <pre>{payload?.openclaw?.status ?? 'n/a'}</pre>
            <h3>Update status</h3>
            <pre>{payload?.openclaw?.updateStatus ?? 'n/a'}</pre>
            <h3>Security audit</h3>
            <pre>{payload?.openclaw?.audit ?? 'n/a'}</pre>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">System log</p>
            <h2>Recent notable events</h2>
          </div>
        </div>
        <div className="event-list">
          {(payload?.events ?? []).slice(0, 8).map((event, index) => {
            const level = event.LevelDisplayName ?? 'Information'
            const tone: Tone = /error/i.test(level) ? 'critical' : /warn/i.test(level) ? 'warn' : 'info'
            return (
              <div key={`${event.TimeCreated}-${index}`} className="event-row">
                <div className={`event-marker ${toneClass(tone)}`} />
                <div className="event-time">{new Date(event.TimeCreated ?? '').toLocaleTimeString()}</div>
                <div>
                  <div className="event-headline">
                    <strong>{event.ProviderName}</strong>
                    <span>{event.LevelDisplayName}</span>
                  </div>
                  <p>{event.Message?.replace(/\s+/g, ' ').trim()}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default App
