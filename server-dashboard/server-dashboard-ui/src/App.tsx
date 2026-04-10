import './App.css'

type StatusTone = 'good' | 'warn' | 'critical' | 'info'

type MetricCard = {
  label: string
  value: string
  detail: string
  tone?: StatusTone
}

type ServiceRow = {
  name: string
  status: string
  port: string
  detail: string
  tone: StatusTone
}

type EventRow = {
  time: string
  source: string
  level: string
  message: string
  tone: StatusTone
}

type ProcessRow = {
  name: string
  cpu: string
  memory: string
  note: string
}

const overviewCards: MetricCard[] = [
  {
    label: 'CPU Load',
    value: '37.1%',
    detail: 'Current total processor time',
    tone: 'warn',
  },
  {
    label: 'Memory Free',
    value: '20.1 GB',
    detail: '20.1 / 31.9 GB visible RAM available',
    tone: 'good',
  },
  {
    label: 'Disk Free',
    value: '375.4 GB',
    detail: 'System drive C: free capacity',
    tone: 'good',
  },
  {
    label: 'Network Throughput',
    value: '9.1 KB/s',
    detail: 'Intel I211 live interface traffic snapshot',
    tone: 'info',
  },
]

const securityCards: MetricCard[] = [
  {
    label: 'Windows Defender',
    value: 'Protected',
    detail: 'Realtime, behavior, IOAV and signatures enabled',
    tone: 'good',
  },
  {
    label: 'Firewall',
    value: 'Enabled',
    detail: 'Domain, Private and Public profiles active',
    tone: 'good',
  },
  {
    label: 'OpenClaw Audit',
    value: 'Pending output',
    detail: 'Deep audit command started, result not returned yet',
    tone: 'warn',
  },
  {
    label: 'OpenClaw Version',
    value: 'Update available',
    detail: 'Stable channel, npm update 2026.4.9 available',
    tone: 'warn',
  },
]

const serviceRows: ServiceRow[] = [
  {
    name: 'OpenClaw Gateway',
    status: 'Inspecting',
    port: 'pending',
    detail: 'Waiting for deep status command output',
    tone: 'info',
  },
  {
    name: 'Microsoft Defender',
    status: 'Online',
    port: 'system',
    detail: 'Realtime protection and signatures healthy',
    tone: 'good',
  },
  {
    name: 'Windows Firewall',
    status: 'Online',
    port: 'system',
    detail: 'All firewall profiles enabled',
    tone: 'good',
  },
  {
    name: 'SQL Server',
    status: 'Observed',
    port: 'unknown',
    detail: 'sqlservr is active and consuming resources',
    tone: 'warn',
  },
]

const topProcesses: ProcessRow[] = [
  { name: 'System', cpu: '20645.48', memory: '16.5 MB', note: 'Kernel/system services' },
  { name: 'iCUE', cpu: '8998.83', memory: '129.7 MB', note: 'Corsair device control' },
  { name: 'Discord', cpu: '7922.31', memory: '438.3 MB', note: 'User desktop workload' },
  { name: 'dwm', cpu: '6768.48', memory: '105.7 MB', note: 'Desktop compositor' },
  { name: 'sqlservr', cpu: '5356.22', memory: '117.7 MB', note: 'Database engine' },
  { name: 'Corsair.Service', cpu: '2450.45', memory: '840.1 MB', note: 'High resident memory' },
]

const events: EventRow[] = [
  {
    time: '13:54',
    source: 'e1rexpress',
    level: 'Information',
    message: 'Intel I211 link established at 1 Gbps full duplex.',
    tone: 'good',
  },
  {
    time: '13:54',
    source: 'e1rexpress',
    level: 'Warning',
    message: 'Network link disconnected shortly before reconnecting.',
    tone: 'warn',
  },
  {
    time: '13:49',
    source: 'Hyper-V VmSwitch',
    level: 'Information',
    message: 'WSL Hyper-V firewall virtual switch port deleted cleanly.',
    tone: 'info',
  },
  {
    time: '13:21',
    source: 'Hyper-V VmSwitch',
    level: 'Information',
    message: 'WSL virtual networking initialized and attached successfully.',
    tone: 'info',
  },
]

const connectionStats = [
  { state: 'Established', value: 55 },
  { state: 'Listen', value: 37 },
  { state: 'Bound', value: 50 },
  { state: 'TimeWait', value: 4 },
  { state: 'CloseWait', value: 3 },
  { state: 'FinWait2', value: 1 },
]

const disks = [
  { name: 'C:', used: 62, free: '375.4 GB free / 998.7 GB total' },
  { name: 'X:', used: 84, free: '318.7 GB free / 1.89 TB total' },
]

const adapters = [
  {
    name: 'Ethernet 2',
    rx: '1.26 GB',
    tx: '33.3 MB',
    packets: '944k in / 207k out',
  },
  {
    name: 'vEthernet (WSL)',
    rx: '5.3 MB',
    tx: '566.9 MB',
    packets: '61k in / 103k out',
  },
]

function toneClass(tone: StatusTone = 'info') {
  return `tone-${tone}`
}

function MetricGrid({ title, subtitle, cards }: { title: string; subtitle: string; cards: MetricCard[] }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{subtitle}</h2>
        </div>
      </div>
      <div className="metric-grid">
        {cards.map((card) => (
          <article key={card.label} className={`metric-card ${toneClass(card.tone)}`}>
            <span className="metric-label">{card.label}</span>
            <strong className="metric-value">{card.value}</strong>
            <span className="metric-detail">{card.detail}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="dashboard-shell">
      <header className="hero-panel panel">
        <div>
          <p className="eyebrow">Mario • Host Monitoring</p>
          <h1>Server command center</h1>
          <p className="hero-copy">
            Dark-mode operations dashboard for this machine, shaped around current Windows,
            OpenClaw, security, process, network and log signals.
          </p>
        </div>
        <div className="hero-stats">
          <div className="hero-pill tone-good">Host online since 2026-04-07 18:49</div>
          <div className="hero-pill tone-warn">OpenClaw update available</div>
          <div className="hero-pill tone-info">37 listening sockets observed</div>
        </div>
      </header>

      <MetricGrid title="Overview" subtitle="Core health snapshot" cards={overviewCards} />
      <MetricGrid title="Security" subtitle="Protection and posture" cards={securityCards} />

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Platform status</h2>
            </div>
          </div>
          <div className="table-grid">
            {serviceRows.map((row) => (
              <div key={row.name} className="table-row">
                <div>
                  <strong>{row.name}</strong>
                  <p>{row.detail}</p>
                </div>
                <div className="table-meta">
                  <span className={`status-chip ${toneClass(row.tone)}`}>{row.status}</span>
                  <span>{row.port}</span>
                </div>
              </div>
            ))}
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
            {connectionStats.map((item) => (
              <div key={item.state} className="bar-row">
                <div className="bar-row-header">
                  <span>{item.state}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(item.value, 4)}%` }} />
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
            {topProcesses.map((process) => (
              <div key={process.name} className="process-row">
                <div>
                  <strong>{process.name}</strong>
                  <p>{process.note}</p>
                </div>
                <div className="process-metrics">
                  <span>CPU {process.cpu}</span>
                  <span>RAM {process.memory}</span>
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
            {disks.map((disk) => (
              <div key={disk.name} className="disk-card">
                <div className="bar-row-header">
                  <strong>{disk.name}</strong>
                  <span>{disk.used}% used</span>
                </div>
                <div className="bar-track large">
                  <div className="bar-fill" style={{ width: `${disk.used}%` }} />
                </div>
                <p>{disk.free}</p>
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
              <h2>Network interface counters</h2>
            </div>
          </div>
          <div className="table-grid">
            {adapters.map((adapter) => (
              <div key={adapter.name} className="table-row compact">
                <div>
                  <strong>{adapter.name}</strong>
                  <p>{adapter.packets}</p>
                </div>
                <div className="process-metrics align-right">
                  <span>RX {adapter.rx}</span>
                  <span>TX {adapter.tx}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Actions</p>
              <h2>Next improvements</h2>
            </div>
          </div>
          <ul className="action-list">
            <li>Replace snapshot values with live PowerShell or Node collectors on an interval.</li>
            <li>Finish parsing pending OpenClaw deep status and deep audit results.</li>
            <li>Add internet latency, jitter and speed-test history with scheduled sampling.</li>
            <li>Add alert thresholds and notification routing for critical signals.</li>
          </ul>
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
          {events.map((event, index) => (
            <div key={`${event.time}-${index}`} className="event-row">
              <div className={`event-marker ${toneClass(event.tone)}`} />
              <div className="event-time">{event.time}</div>
              <div>
                <div className="event-headline">
                  <strong>{event.source}</strong>
                  <span>{event.level}</span>
                </div>
                <p>{event.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
