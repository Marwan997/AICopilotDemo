import { useMemo, useState } from 'react'
import './App.css'
import { curatedVendorCases } from './curatedVendorData'
import { CopilotView } from './components'

function App() {
  const [selectedChefId, setSelectedChefId] = useState<number | null>(curatedVendorCases[0]?.mainChefId ?? null)
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null)

  const chefBranches = useMemo(
    () => (selectedChefId === null ? [] : curatedVendorCases.filter((vendor) => vendor.mainChefId === selectedChefId)),
    [selectedChefId],
  )

  const selectedVendor = useMemo(
    () => chefBranches.find((vendor) => vendor.vendorId === selectedVendorId) ?? null,
    [chefBranches, selectedVendorId],
  )

  return (
    <div className="dashboard-shell">
      <CopilotView
        selectedChefId={selectedChefId}
        onSelectChefId={(chefId) => {
          setSelectedChefId(chefId)
          setSelectedVendorId(null)
        }}
        chefBranches={chefBranches}
        selectedVendor={selectedVendor}
        onSelectVendor={(vendor) => setSelectedVendorId(vendor?.vendorId ?? null)}
      />
    </div>
  )
}

export default App
