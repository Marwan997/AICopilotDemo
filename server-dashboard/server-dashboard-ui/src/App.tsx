import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { vendorCases } from './demoData'
import { CopilotView, MonitoringView } from './components'
import type { ApiResponse, DashboardPayload, ViewMode } from './types'

function App() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('copilot')
  const [chefSearch, setChefSearch] = useState('')
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null)

  const selectedChefId = useMemo(() => {
    const trimmed = chefSearch.trim()
    if (!trimmed) return null
    const parsed = Number(trimmed)
    return Number.isInteger(parsed) ? parsed : null
  }, [chefSearch])

  const chefBranches = useMemo(
    () => (selectedChefId === null ? [] : vendorCases.filter((vendor) => vendor.mainChefId === selectedChefId)),
    [selectedChefId],
  )

  const selectedVendor = useMemo(
    () => chefBranches.find((vendor) => vendor.vendorId === selectedVendorId) ?? null,
    [chefBranches, selectedVendorId],
  )

  const loadData = useCallback(async (force = false) => {
    try {
      force ? setRefreshing(true) : setLoading(true)
      const apiBase = `${window.location.protocol}//${window.location.hostname}:4173`
      const response = await fetch(`${apiBase}${force ? '/api/refresh' : '/api/dashboard'}`, {
        method: force ? 'POST' : 'GET',
      })
      const json = (await response.json()) as ApiResponse
      if (!json.ok || !json.data) throw new Error(json.error ?? 'Failed to load dashboard data')
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

  return (
    <div className="dashboard-shell">
      <div className="view-switcher panel">
        <div>
          <p className="eyebrow">Mode</p>
          <h2>Choose the experience</h2>
        </div>
        <div className="toggle-group">
          <button
            className={`toggle-button ${viewMode === 'copilot' ? 'toggle-button-active' : ''}`}
            onClick={() => setViewMode('copilot')}
          >
            AM Copilot Demo
          </button>
          <button
            className={`toggle-button ${viewMode === 'monitoring' ? 'toggle-button-active' : ''}`}
            onClick={() => setViewMode('monitoring')}
          >
            Server Monitoring
          </button>
        </div>
      </div>

      {viewMode === 'copilot' ? (
        <CopilotView
          chefSearch={chefSearch}
          onChefSearchChange={(value) => {
            setChefSearch(value)
            setSelectedVendorId(null)
          }}
          selectedChefId={selectedChefId}
          chefBranches={chefBranches}
          selectedVendor={selectedVendor}
          onSelectVendor={(vendor) => setSelectedVendorId(vendor?.vendorId ?? null)}
        />
      ) : (
        <MonitoringView
          payload={payload}
          loading={loading}
          refreshing={refreshing}
          error={error}
          onRefresh={() => void loadData(true)}
        />
      )}
    </div>
  )
}

export default App
