export type Tone = 'good' | 'warn' | 'critical' | 'info'

export type DashboardPayload = {
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

export type ApiResponse = {
  ok: boolean
  data?: DashboardPayload
  error?: string | null
}

export type ViewMode = 'copilot' | 'monitoring'
