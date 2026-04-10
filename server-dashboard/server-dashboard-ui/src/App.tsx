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
  }
  os?: {
    freePhysicalMemoryGB?: number
    totalVisibleMemoryGB?: number
    lastBootUpTime?: string
  }
  counters?: {
    cpuPercent?: number
    network?: { path: string; value: number }[] | { path: string; value: number }
  }
  processes?: { ProcessName?: string; Id?: number; CPU?: number; WSMB?: number }[]
  firewall?: { Name?: string; Enabled?: boolean | number }[]
  defender?: {
    AntivirusEnabled?: boolean
    RealTimeProtectionEnabled?: boolean
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
    Message?: string
  }[]
  internet?: {
    latencyMs?: number | null
    jitterMs?: number | null
  }
  openclaw?: {
    status?: string
    updateStatus?: string
    audit?: string
  }
  derived?: {
    internetTone?: Tone
    memoryUsedPercent?: number
  }
  history?: {
    timestamp: string
    cpuPercent: number
    memoryUsedPercent: number
    diskUsedPercent: number
    latencyMs: number | null
  }[]
}

type ApiResponse = {
  ok: boolean
  data?: DashboardPayload
  error?: string | null
}

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
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

function formatDate(value?: string) {
  if (!value) return 'n/a'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
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
      const apiBase = `${window.location.protocol}//${window.location.hostname}:4173`
      const response = await fetch(`${apiBase}${force ? '/api/refresh' : '/api/dashboard'}`, {
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

  if (loading && !payload) {
    return <div className="loading-state">Loading live monitoring data…</div>
  }

  if (!payload) {
    return <div className="loading-state">Dashboard data unavailable.</div>
  }

  const connections = asArray(payload.connections)
  const disks = asArray(payload.disks)
  const processes = asArray(payload.processes)
  const adapters = asArray(payload.adapters)
  const events = asArray(payload.events)
  const firewallProfiles = asArray(payload.firewall)
  const history = asArray(payload.history)
  const networkCounters = asArray(payload.counters?.network)

  const cpuPercent = Number(payload.counters?.cpuPercent ?? 0)
  const memoryUsedPercent = Number(payload.derived?.memoryUsedPercent ?? 0)
  const memoryFree = Number(payload.os?.freePhysicalMemoryGB ?? 0)
  const memoryTotal = Number(payload.os?.totalVisibleMemoryGB ?? 0)
  const diskPrimary = disks[0]
  const latency = payload.internet?.latencyMs ?? null
  const networkTotal = networkCounters.reduce((sum, item) => sum + Number(item.value ?? 0), 0)
  const firewallEnabled = firewallProfiles.length > 0 ? firewallProfiles.every((profile) => Boolean(profile.Enabled)) : false
  const defenderHealthy = Boolean(payload.defender?.AntivirusEnabled && payload.defender?.RealTimeProtectionEnabled)

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
            <span>{payload.host?.WindowsProductName ?? 'Windows host'}</span>
            <span>{payload.host?.WindowsVersion ?? 'n/a'}</span>
            <span>Last sample {formatDate(payload.timestamp)}</span>
            <span>OpenClaw cache {formatDate(payload.meta?.lastSlowCollectionAt ?? undefined)}</span>
          </div>
        </div>
        <div className="hero-actions">
          <div className={`hero-pill tone-${payload.derived?.internetTone ?? 'info'}`}>
            Internet {latency === null ? 'offline' : `${latency} ms`}
          </div>
          <div className="hero-pill tone-info">CPU {cpuPercent.toFixed(1)}%</div>
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
          <article className="metric-card tone-info">
            <span className="metric-label">CPU Load</span>
            <strong className="metric-value">{cpuPercent.toFixed(1)}%</strong>
            <span className="metric-detail">Live total processor time</span>
          </article>
          <article className="metric-card tone-info">
            <span className="metric-label">Memory Pressure</span>
            <strong className="metric-value">{memoryUsedPercent.toFixed(1)}%</strong>
            <span className="metric-detail">{memoryFree.toFixed(1)} GB free of {memoryTotal.toFixed(1)} GB</span>
          </article>
          <article className="metric-card tone-info">
            <span className="metric-label">Primary Disk</span>
            <strong className="metric-value">{Number(diskPrimary?.UsedPercent ?? 0).toFixed(1)}%</strong>
            <span className="metric-detail">{Number(diskPrimary?.FreeGB ?? 0).toFixed(1)} GB free on {diskPrimary?.Name ?? 'C:'}</span>
          </article>
          <article className={`metric-card tone-${payload.derived?.internetTone ?? 'info'}`}>
            <span className="metric-label">Internet Latency</span>
            <strong className="metric-value">{latency === null ? 'offline' : `${latency} ms`}</strong>
            <span className="metric-detail">Jitter {payload.internet?.jitterMs ?? 'n/a'} ms</span>
          </article>
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
          <article className={`metric-card ${defenderHealthy ? 'tone-good' : 'tone-critical'}`}>
            <span className="metric-label">Windows Defender</span>
            <strong className="metric-value">{defenderHealthy ? 'Protected' : 'Attention'}</strong>
            <span className="metric-detail">Signatures {formatDate(payload.defender?.AntivirusSignatureLastUpdated)}</span>
          </article>
          <article className={`metric-card ${firewallEnabled ? 'tone-good' : 'tone-critical'}`}>
            <span className="metric-label">Firewall</span>
            <strong className="metric-value">{firewallEnabled ? 'Enabled' : 'Check needed'}</strong>
            <span className="metric-detail">{firewallProfiles.length} profiles checked</span>
          </article>
          <article className="metric-card tone-warn">
            <span className="metric-label">OpenClaw Audit</span>
            <strong className="metric-value">Loaded</strong>
            <span className="metric-detail">{payload.openclaw?.audit?.split('\n')[0] || 'Audit output available'}</span>
          </article>
          <article className="metric-card tone-warn">
            <span className="metric-label">OpenClaw Updates</span>
            <strong className="metric-value">Status</strong>
            <span className="metric-detail">{payload.openclaw?.updateStatus?.split('\n')[0] || 'Update status available'}</span>
          </article>
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
              <div className="bar-row-header"><strong>CPU</strong><span>{cpuPercent.toFixed(1)}%</span></div>
              <MiniChart values={history.map((item) => Number(item.cpuPercent ?? 0))} />
            </div>
            <div className="history-card">
              <div className="bar-row-header"><strong>Memory used</strong><span>{memoryUsedPercent.toFixed(1)}%</span></div>
              <MiniChart values={history.map((item) => Number(item.memoryUsedPercent ?? 0))} color="var(--warn)" />
            </div>
            <div className="history-card">
              <div className="bar-row-header"><strong>Disk used</strong><span>{Number(diskPrimary?.UsedPercent ?? 0).toFixed(1)}%</span></div>
              <MiniChart values={history.map((item) => Number(item.diskUsedPercent ?? 0))} color="var(--good)" />
            </div>
            <div className="history-card">
              <div className="bar-row-header"><strong>Latency</strong><span>{latency === null ? 'n/a' : `${latency} ms`}</span></div>
              <MiniChart values={history.map((item) => Number(item.latencyMs ?? 0))} color="var(--accent-2)" />
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
            {connections.map((item, index) => (
              <div key={`${item.Name ?? 'state'}-${index}`} className="bar-row">
                <div className="bar-row-header">
                  <span>{item.Name ?? 'Unknown'}</span>
                  <strong>{item.Count ?? 0}</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.min(Number(item.Count ?? 0) * 1.8, 100)}%` }} />
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
            {processes.map((process, index) => (
              <div key={`${process.ProcessName ?? 'process'}-${process.Id ?? index}`} className="process-row">
                <div>
                  <strong>{process.ProcessName ?? 'Unknown'}</strong>
                  <p>PID {process.Id ?? 'n/a'}</p>
                </div>
                <div className="process-metrics">
                  <span>CPU {process.CPU ?? 'n/a'}</span>
                  <span>RAM {process.WSMB ?? 'n/a'} MB</span>
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
            {disks.map((disk, index) => (
              <div key={`${disk.Name ?? 'disk'}-${index}`} className="disk-card">
                <div className="bar-row-header">
                  <strong>{disk.Name ?? 'Disk'}</strong>
                  <span>{Number(disk.UsedPercent ?? 0).toFixed(1)}% used</span>
                </div>
                <div className="bar-track large">
                  <div className="bar-fill" style={{ width: `${Number(disk.UsedPercent ?? 0)}%` }} />
                </div>
                <p>{Number(disk.FreeGB ?? 0).toFixed(1)} GB free / {Number(disk.UsedGB ?? 0).toFixed(1)} GB used</p>
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
            {adapters.map((adapter, index) => (
              <div key={`${adapter.Name ?? 'adapter'}-${index}`} className="table-row compact">
                <div>
                  <strong>{adapter.Name ?? 'Unknown adapter'}</strong>
                  <p>Packets {adapter.ReceivedUnicastPackets ?? 0} in / {adapter.SentUnicastPackets ?? 0} out</p>
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
            <pre>{payload.openclaw?.status ?? 'n/a'}</pre>
            <h3>Update status</h3>
            <pre>{payload.openclaw?.updateStatus ?? 'n/a'}</pre>
            <h3>Security audit</h3>
            <pre>{payload.openclaw?.audit ?? 'n/a'}</pre>
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
          {events.slice(0, 8).map((event, index) => {
            const level = event.LevelDisplayName ?? 'Information'
            const tone = /error/i.test(level) ? 'critical' : /warn/i.test(level) ? 'warn' : 'info'
            return (
              <div key={`${event.TimeCreated ?? 'event'}-${index}`} className="event-row">
                <div className={`event-marker tone-${tone}`} />
                <div className="event-time">{formatDate(event.TimeCreated)}</div>
                <div>
                  <div className="event-headline">
                    <strong>{event.ProviderName ?? 'Unknown source'}</strong>
                    <span>{event.LevelDisplayName ?? 'Info'}</span>
                  </div>
                  <p>{event.Message?.replace(/\s+/g, ' ').trim() ?? 'No message'}</p>
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
