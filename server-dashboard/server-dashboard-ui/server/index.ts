import cors from 'cors'
import express from 'express'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)
const app = express()
const PORT = 4173
const HISTORY_LIMIT = 60

type Tone = 'good' | 'warn' | 'critical' | 'info'

type Sample = {
  timestamp: string
  cpuPercent: number
  memoryFreeGb: number
  memoryUsedPercent: number
  diskUsedPercent: number
  latencyMs: number | null
  jitterMs: number | null
  internetQuality: Tone
}

const history: Sample[] = []
let latestSnapshot: Record<string, unknown> | null = null
let collectionError: string | null = null

app.use(cors())

function clampHistory(sample: Sample) {
  history.push(sample)
  while (history.length > HISTORY_LIMIT) history.shift()
}

function safeJsonParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function runPowerShellJson(script: string) {
  const encoded = Buffer.from(script, 'utf16le').toString('base64')
  const { stdout } = await execAsync(`powershell -NoProfile -EncodedCommand ${encoded}`, {
    maxBuffer: 1024 * 1024 * 8,
  })
  return stdout.trim()
}

async function pingHost(host: string) {
  try {
    const { stdout } = await execAsync(`PING.EXE -n 4 ${host}`, { maxBuffer: 1024 * 1024 })
    const matches = [...stdout.matchAll(/time[=<](\d+)ms/gi)].map((m) => Number(m[1]))
    const summary = stdout.match(/Average = (\d+)ms/i)
    const latency = summary ? Number(summary[1]) : matches[0] ?? null
    let jitter: number | null = null

    if (matches.length >= 2) {
      const avg = matches.reduce((a, b) => a + b, 0) / matches.length
      const variance = matches.reduce((acc, value) => acc + (value - avg) ** 2, 0) / matches.length
      jitter = Number(Math.sqrt(variance).toFixed(1))
    }

    return { latencyMs: latency, jitterMs: jitter, packetSamples: matches }
  } catch {
    return { latencyMs: null, jitterMs: null, packetSamples: [] as number[] }
  }
}

async function getOpenClawCommand(command: string) {
  try {
    const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 1024 * 8 })
    return (stdout || stderr).trim()
  } catch (error) {
    const output = error instanceof Error && 'message' in error ? String(error.message) : 'command failed'
    return output
  }
}

function toneForCpu(value: number): Tone {
  if (value >= 90) return 'critical'
  if (value >= 65) return 'warn'
  return 'good'
}

function toneForDisk(value: number): Tone {
  if (value >= 90) return 'critical'
  if (value >= 75) return 'warn'
  return 'good'
}

function toneForLatency(value: number | null): Tone {
  if (value === null) return 'critical'
  if (value >= 120) return 'critical'
  if (value >= 60) return 'warn'
  return 'good'
}

async function collectSnapshot() {
  const psScript = String.raw`
$computer = Get-ComputerInfo | Select-Object WindowsProductName,WindowsVersion,OsHardwareAbstractionLayer,CsTotalPhysicalMemory
$os = Get-CimInstance Win32_OperatingSystem
$counters = Get-Counter '\Processor(_Total)\% Processor Time','\Memory\Available MBytes','\PhysicalDisk(_Total)\% Disk Time','\Network Interface(*)\Bytes Total/sec'
$cpuCounter = ($counters.CounterSamples | Where-Object { $_.Path -like '*processor(_total)*' } | Select-Object -First 1).CookedValue
$memoryCounter = ($counters.CounterSamples | Where-Object { $_.Path -like '*memory\available mbytes*' } | Select-Object -First 1).CookedValue
$diskCounter = ($counters.CounterSamples | Where-Object { $_.Path -like '*physicaldisk(_total)*' } | Select-Object -First 1).CookedValue
$networkCounters = $counters.CounterSamples | Where-Object { $_.Path -like '*network interface*bytes total/sec' } | ForEach-Object {
  [PSCustomObject]@{
    path = $_.Path
    value = [math]::Round($_.CookedValue, 2)
  }
}
$processes = Get-Process | Sort-Object CPU -Descending | Select-Object -First 8 ProcessName,Id,@{Name='CPU';Expression={[math]::Round($_.CPU,2)}},@{Name='WSMB';Expression={[math]::Round($_.WS/1MB,1)}}
$firewall = Get-NetFirewallProfile | Select-Object Name,Enabled,DefaultInboundAction,DefaultOutboundAction
$defender = Get-MpComputerStatus | Select-Object AMServiceEnabled,AntivirusEnabled,RealTimeProtectionEnabled,BehaviorMonitorEnabled,IoavProtectionEnabled,AntivirusSignatureLastUpdated
$adapters = Get-NetAdapterStatistics | Select-Object Name,@{Name='ReceivedBytes';Expression={$_.ReceivedBytes}},@{Name='SentBytes';Expression={$_.SentBytes}},ReceivedUnicastPackets,SentUnicastPackets
$connections = Get-NetTCPConnection | Group-Object State | Select-Object Name,Count
$disks = Get-PSDrive -PSProvider FileSystem | Select-Object Name,@{Name='UsedGB';Expression={[math]::Round($_.Used/1GB,2)}},@{Name='FreeGB';Expression={[math]::Round($_.Free/1GB,2)}},@{Name='UsedPercent';Expression={ if (($_.Used + $_.Free) -gt 0) {[math]::Round(($_.Used / ($_.Used + $_.Free)) * 100, 1)} else {0} }}
$events = Get-WinEvent -LogName System -MaxEvents 12 | Select-Object TimeCreated,LevelDisplayName,ProviderName,Id,Message
[PSCustomObject]@{
  host = $computer
  os = [PSCustomObject]@{
    freePhysicalMemoryGB = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
    totalVisibleMemoryGB = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
    lastBootUpTime = $os.LastBootUpTime
  }
  counters = [PSCustomObject]@{
    cpuPercent = [math]::Round($cpuCounter, 2)
    memoryAvailableMB = [math]::Round($memoryCounter, 2)
    diskPercent = [math]::Round($diskCounter, 2)
    network = $networkCounters
  }
  processes = $processes
  firewall = $firewall
  defender = $defender
  adapters = $adapters
  connections = $connections
  disks = $disks
  events = $events
} | ConvertTo-Json -Depth 6
`

  const [psRaw, ping, statusOutput, updateOutput, auditOutput] = await Promise.all([
    runPowerShellJson(psScript),
    pingHost('1.1.1.1'),
    getOpenClawCommand('openclaw status'),
    getOpenClawCommand('openclaw update status'),
    getOpenClawCommand('openclaw security audit --deep'),
  ])

  const parsed = safeJsonParse<Record<string, any>>(psRaw, {})
  const cpuPercent = Number(parsed?.counters?.cpuPercent ?? 0)
  const memoryFreeGb = Number(parsed?.os?.freePhysicalMemoryGB ?? 0)
  const totalMemoryGb = Number(parsed?.os?.totalVisibleMemoryGB ?? 0)
  const diskUsedPercent = Number(parsed?.disks?.[0]?.UsedPercent ?? parsed?.counters?.diskPercent ?? 0)
  const memoryUsedPercent = totalMemoryGb > 0 ? Number((((totalMemoryGb - memoryFreeGb) / totalMemoryGb) * 100).toFixed(1)) : 0

  const sample: Sample = {
    timestamp: new Date().toISOString(),
    cpuPercent,
    memoryFreeGb,
    memoryUsedPercent,
    diskUsedPercent,
    latencyMs: ping.latencyMs,
    jitterMs: ping.jitterMs,
    internetQuality: toneForLatency(ping.latencyMs),
  }

  clampHistory(sample)

  latestSnapshot = {
    timestamp: sample.timestamp,
    host: parsed.host,
    os: parsed.os,
    counters: parsed.counters,
    processes: parsed.processes,
    firewall: parsed.firewall,
    defender: parsed.defender,
    adapters: parsed.adapters,
    connections: parsed.connections,
    disks: parsed.disks,
    events: parsed.events,
    internet: ping,
    openclaw: {
      status: statusOutput,
      updateStatus: updateOutput,
      audit: auditOutput,
    },
    derived: {
      cpuTone: toneForCpu(cpuPercent),
      diskTone: toneForDisk(diskUsedPercent),
      internetTone: toneForLatency(ping.latencyMs),
      memoryUsedPercent,
    },
    history,
  }

  collectionError = null
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, latest: latestSnapshot ? 'ready' : 'warming', error: collectionError })
})

app.get('/api/dashboard', async (_req, res) => {
  try {
    if (!latestSnapshot) {
      await collectSnapshot()
    }
    res.json({ ok: true, data: latestSnapshot, error: collectionError })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'
    collectionError = message
    res.status(500).json({ ok: false, error: message, data: latestSnapshot })
  }
})

app.post('/api/refresh', async (_req, res) => {
  try {
    await collectSnapshot()
    res.json({ ok: true, data: latestSnapshot })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'
    collectionError = message
    res.status(500).json({ ok: false, error: message })
  }
})

collectSnapshot().catch((error) => {
  collectionError = error instanceof Error ? error.message : 'initial collection failed'
})

setInterval(() => {
  collectSnapshot().catch((error) => {
    collectionError = error instanceof Error ? error.message : 'scheduled collection failed'
  })
}, 30000)

app.listen(PORT, () => {
  console.log(`Monitoring API listening on http://127.0.0.1:${PORT}`)
})
