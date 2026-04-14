import { useCallback, useEffect, useState } from 'react'
import { MonitoringView } from './components'
import type { ApiResponse, DashboardPayload } from './types'

export function LocalMonitoringApp() {
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
      <MonitoringView
        payload={payload}
        loading={loading}
        refreshing={refreshing}
        error={error}
        onRefresh={() => void loadData(true)}
      />
    </div>
  )
}
