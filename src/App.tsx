import { useMemo, useState } from 'react'
import './App.css'
import { vendorCases } from './demoData'
import { CopilotView } from './components'

function App() {
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

  return (
    <div className="dashboard-shell">
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
    </div>
  )
}

export default App
