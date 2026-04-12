import { useMemo } from 'react'
import chefzLogo from './chefz-logo.svg'
import { classificationTone, vendorCases, type VendorCase } from './demoData'
import type { DashboardPayload } from './types'
import { asArray, formatBytes, formatDate, formatMoney, formatPercent } from './utils'

export function MiniChart({ values, color = 'var(--accent)' }: { values: number[]; color?: string }) {
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

function VendorDetailCard({ vendor }: { vendor: VendorCase }) {
  const tone = classificationTone(vendor.classification)

  return (
    <article className="panel vendor-detail-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Vendor detail</p>
          <h2>
            Vendor {vendor.vendorId} • {vendor.city}
          </h2>
        </div>
        <span className={`status-chip tone-${tone}`}>{vendor.classification}</span>
      </div>

      <div className="metric-grid metric-grid-three">
        <article className="metric-card tone-info">
          <span className="metric-label">Orders trend</span>
          <strong className="metric-value">{vendor.kpis.ordersTrendPct.toFixed(1)}%</strong>
          <span className="metric-detail">
            {vendor.kpis.deliveredOrdersRecent} vs {vendor.kpis.deliveredOrdersPrev} delivered orders
          </span>
        </article>
        <article className="metric-card tone-info">
          <span className="metric-label">GMV trend</span>
          <strong className="metric-value">{vendor.kpis.gmvTrendPct.toFixed(1)}%</strong>
          <span className="metric-detail">
            {formatMoney(vendor.kpis.deliveredGmvRecent)} vs {formatMoney(vendor.kpis.deliveredGmvPrev)}
          </span>
        </article>
        <article className={`metric-card tone-${tone}`}>
          <span className="metric-label">AOV</span>
          <strong className="metric-value">{formatMoney(vendor.kpis.avgOrderValueRecent)}</strong>
          <span className="metric-detail">Current recent-period average order value</span>
        </article>
      </div>

      <div className="score-grid">
        <div className="score-card"><div className="bar-row-header"><strong>Growth</strong><span>{vendor.scores.growth.toFixed(1)}</span></div><div className="bar-track large"><div className="bar-fill" style={{ width: `${vendor.scores.growth}%` }} /></div></div>
        <div className="score-card"><div className="bar-row-header"><strong>Quality</strong><span>{vendor.scores.quality.toFixed(1)}</span></div><div className="bar-track large"><div className="bar-fill" style={{ width: `${vendor.scores.quality}%` }} /></div></div>
        <div className="score-card"><div className="bar-row-header"><strong>Efficiency</strong><span>{vendor.scores.efficiency.toFixed(1)}</span></div><div className="bar-track large"><div className="bar-fill" style={{ width: `${vendor.scores.efficiency}%` }} /></div></div>
        <div className="score-card"><div className="bar-row-header"><strong>Seasonality</strong><span>{vendor.scores.seasonality.toFixed(1)}</span></div><div className="bar-track large"><div className="bar-fill" style={{ width: `${vendor.scores.seasonality}%` }} /></div></div>
        <div className="score-card"><div className="bar-row-header"><strong>Benchmark</strong><span>{vendor.scores.benchmark.toFixed(1)}</span></div><div className="bar-track large"><div className="bar-fill" style={{ width: `${vendor.scores.benchmark}%` }} /></div></div>
      </div>

      <div className="two-column two-column-tight">
        <div className="panel inset-panel">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">Quality and support</p>
              <h3>Operational KPIs</h3>
            </div>
          </div>
          <div className="kpi-list">
            <div className="table-row compact"><strong>Delivered rate</strong><span>{formatPercent(vendor.kpis.deliveredRateRecent)}</span></div>
            <div className="table-row compact"><strong>Decline rate</strong><span>{formatPercent(vendor.kpis.declineRateRecent)}</span></div>
            <div className="table-row compact"><strong>Cancel rate</strong><span>{formatPercent(vendor.kpis.cancelRateRecent)}</span></div>
            <div className="table-row compact"><strong>Free delivery rate</strong><span>{formatPercent(vendor.kpis.freeDeliveryRateRecent)}</span></div>
            <div className="table-row compact"><strong>Subsidy ratio</strong><span>{formatPercent(vendor.kpis.subsidyRatioRecent, 2)}</span></div>
            <div className="table-row compact"><strong>Net take ratio</strong><span>{formatPercent(vendor.kpis.netTakeRatioRecent, 2)}</span></div>
          </div>
        </div>

        <div className="panel inset-panel">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">Peer position</p>
              <h3>Benchmark percentiles</h3>
            </div>
          </div>
          <div className="bar-list">
            {[
              ['Orders', vendor.benchmarks.ordersPercentile],
              ['GMV', vendor.benchmarks.gmvPercentile],
              ['AOV', vendor.benchmarks.aovPercentile],
              ['Quality', vendor.benchmarks.qualityPercentile],
              ['Efficiency', vendor.benchmarks.efficiencyPercentile],
            ].map(([label, value]) => (
              <div key={String(label)} className="bar-row">
                <div className="bar-row-header">
                  <span>{label}</span>
                  <strong>{Number(value).toFixed(1)}</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Number(value)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function CopilotCard({ vendor }: { vendor: VendorCase }) {
  const tone = classificationTone(vendor.classification)

  return (
    <article className="panel copilot-panel branch-copilot-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">AI Copilot</p>
          <h2>
            Vendor {vendor.vendorId} • {vendor.city}
          </h2>
        </div>
        <span className={`status-chip tone-${tone}`}>{vendor.classification}</span>
      </div>

      <div className="copilot-highlight-grid">
        <div className="copilot-highlight-card">
          <span className="copilot-highlight-label">Narrative</span>
          <p>{vendor.summary}</p>
        </div>
        <div className="copilot-highlight-card">
          <span className="copilot-highlight-label">AM move</span>
          <p>{vendor.actionHint}</p>
        </div>
      </div>

      <div className="copilot-block">
        <h3>Performance summary</h3>
        <p>{vendor.copilot.performanceSummary}</p>
      </div>

      <div className="copilot-block">
        <h3>Likely causes</h3>
        <ul className="action-list">
          {vendor.copilot.likelyCauses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="copilot-block">
        <h3>Top 3 AM actions</h3>
        <ol className="action-list ordered-list">
          {vendor.copilot.actions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="copilot-block">
        <h3>Merchant talking points</h3>
        <ul className="action-list">
          {vendor.copilot.talkingPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={`copilot-watchout tone-${tone}`}>
        <strong>Watchout</strong>
        <p>{vendor.copilot.watchout}</p>
      </div>
    </article>
  )
}

export function CopilotView({
  chefSearch,
  onChefSearchChange,
  selectedChefId,
  chefBranches,
  selectedVendor,
  onSelectVendor,
}: {
  chefSearch: string
  onChefSearchChange: (value: string) => void
  selectedChefId: number | null
  chefBranches: VendorCase[]
  selectedVendor: VendorCase | null
  onSelectVendor: (vendor: VendorCase | null) => void
}) {
  const classCounts = vendorCases.reduce<Record<string, number>>((acc, vendor) => {
    acc[vendor.classification] = (acc[vendor.classification] ?? 0) + 1
    return acc
  }, {})

  const showChefResults = Boolean(selectedChefId !== null && chefBranches.length > 0)

  const chefTotals = useMemo(() => {
    if (!chefBranches.length) return null

    const totals = chefBranches.reduce(
      (acc, branch) => {
        acc.ordersRecent += branch.kpis.deliveredOrdersRecent
        acc.ordersPrev += branch.kpis.deliveredOrdersPrev
        acc.gmvRecent += branch.kpis.deliveredGmvRecent
        acc.gmvPrev += branch.kpis.deliveredGmvPrev
        acc.deliveredRateWeighted += branch.kpis.deliveredRateRecent * branch.kpis.deliveredOrdersRecent
        acc.cancelRateWeighted += branch.kpis.cancelRateRecent * branch.kpis.deliveredOrdersRecent
        acc.declineRateWeighted += branch.kpis.declineRateRecent * branch.kpis.deliveredOrdersRecent
        acc.freeDeliveryRateWeighted += branch.kpis.freeDeliveryRateRecent * branch.kpis.deliveredOrdersRecent
        acc.subsidyRatioWeighted += branch.kpis.subsidyRatioRecent * branch.kpis.deliveredGmvRecent
        acc.netTakeRatioWeighted += branch.kpis.netTakeRatioRecent * branch.kpis.deliveredGmvRecent
        acc.classCounts[branch.classification] = (acc.classCounts[branch.classification] ?? 0) + 1
        return acc
      },
      {
        ordersRecent: 0,
        ordersPrev: 0,
        gmvRecent: 0,
        gmvPrev: 0,
        deliveredRateWeighted: 0,
        cancelRateWeighted: 0,
        declineRateWeighted: 0,
        freeDeliveryRateWeighted: 0,
        subsidyRatioWeighted: 0,
        netTakeRatioWeighted: 0,
        classCounts: {} as Record<string, number>,
      },
    )

    const weightedAov = totals.ordersRecent > 0 ? totals.gmvRecent / totals.ordersRecent : 0
    const ordersTrendPct = totals.ordersPrev > 0 ? ((totals.ordersRecent - totals.ordersPrev) / totals.ordersPrev) * 100 : 0
    const gmvTrendPct = totals.gmvPrev > 0 ? ((totals.gmvRecent - totals.gmvPrev) / totals.gmvPrev) * 100 : 0
    const deliveredRate = totals.ordersRecent > 0 ? totals.deliveredRateWeighted / totals.ordersRecent : 0
    const cancelRate = totals.ordersRecent > 0 ? totals.cancelRateWeighted / totals.ordersRecent : 0
    const declineRate = totals.ordersRecent > 0 ? totals.declineRateWeighted / totals.ordersRecent : 0
    const freeDeliveryRate = totals.ordersRecent > 0 ? totals.freeDeliveryRateWeighted / totals.ordersRecent : 0
    const subsidyRatio = totals.gmvRecent > 0 ? totals.subsidyRatioWeighted / totals.gmvRecent : 0
    const netTakeRatio = totals.gmvRecent > 0 ? totals.netTakeRatioWeighted / totals.gmvRecent : 0
    const topRiskBranch = [...chefBranches].sort((a, b) => b.kpis.cancelRateRecent - a.kpis.cancelRateRecent)[0]
    const topOpportunityBranch = [...chefBranches].sort((a, b) => b.scores.growth - a.scores.growth)[0]

    return {
      totalBranches: chefBranches.length,
      ordersRecent: totals.ordersRecent,
      ordersTrendPct,
      gmvRecent: totals.gmvRecent,
      gmvTrendPct,
      weightedAov,
      deliveredRate,
      cancelRate,
      declineRate,
      freeDeliveryRate,
      subsidyRatio,
      netTakeRatio,
      classCounts: totals.classCounts,
      topRiskBranch,
      topOpportunityBranch,
    }
  }, [chefBranches])

  const chefCopilot = useMemo(() => {
    if (!chefTotals || !selectedChefId) return null

    const portfolioStatus = chefTotals.classCounts['At Risk']
      ? 'portfolio attention is required because at least one branch is operationally at risk.'
      : chefTotals.classCounts['Needs Attention']
        ? 'the portfolio is stable overall but has efficiency or quality issues that need cleanup.'
        : 'the portfolio is broadly healthy with room to scale selectively.'

    const likelyCauses = [
      chefTotals.cancelRate >= 0.08
        ? 'Some branches are showing elevated cancellation pressure, which is dragging portfolio quality.'
        : 'Operational quality is broadly stable across the portfolio.',
      chefTotals.subsidyRatio >= 0.02
        ? 'Commercial support looks heavier than ideal, suggesting margin pressure in parts of the portfolio.'
        : 'Commercial efficiency is mostly controlled and not overly subsidy-led.',
      chefTotals.ordersTrendPct >= 15
        ? 'Demand momentum is present, so the key question is where to scale versus where to stabilize.'
        : 'Growth is modest, so branch prioritization matters more than broad scaling.',
    ]

    const actions = [
      `Prioritize branch ${chefTotals.topRiskBranch.vendorId} for operational review because it carries the highest cancellation risk.`,
      `Use branch ${chefTotals.topOpportunityBranch.vendorId} as the first growth bet because it shows the strongest upside signal.`,
      chefTotals.subsidyRatio >= 0.02
        ? 'Tighten broad support and move to more selective branch-level commercial actions.'
        : 'Protect current efficiency while scaling only the branches with proven operating quality.',
    ]

    const talkingPoints = [
      `Main chef ${selectedChefId} has ${chefTotals.totalBranches} branches, and the portfolio view suggests ${portfolioStatus}`,
      `The strongest opportunity branch right now is ${chefTotals.topOpportunityBranch.vendorId}, while the highest operational risk is branch ${chefTotals.topRiskBranch.vendorId}.`,
      'The AM focus should be branch prioritization, not treating every branch under the brand the same way.',
    ]

    return {
      summary: `Across ${chefTotals.totalBranches} branches, the portfolio is generating ${chefTotals.ordersRecent} delivered orders and ${formatMoney(chefTotals.gmvRecent)} in recent GMV. Overall, ${portfolioStatus}`,
      likelyCauses,
      actions,
      talkingPoints,
    }
  }, [chefTotals, selectedChefId])

  return (
    <>
      <header className="hero-panel panel hero-panel-copilot">
        <div>
          <div className="brand-lockup">
            <img src={chefzLogo} alt="The Chefz" className="brand-logo" />
            <div>
              <p className="eyebrow">Mario • Account Manager Copilot</p>
              <h1>Vendor action center</h1>
            </div>
          </div>
          <p className="hero-copy">
            Search by main_chef_id first, review all branches for that chef, then drill into a specific branch only when needed.
          </p>
          <div className="hero-meta">
            <span>Search by main_chef_id</span>
            <span>Branch-level analytics</span>
            <span>AI explains and recommends, it does not invent KPIs</span>
          </div>
        </div>
        <div className="hero-actions hero-actions-wide">
          <div className="hero-pill tone-good">Healthy {classCounts.Healthy ?? 0}</div>
          <div className="hero-pill tone-info">High Potential {classCounts['High Potential'] ?? 0}</div>
          <div className="hero-pill tone-critical">At Risk {classCounts['At Risk'] ?? 0}</div>
        </div>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Chef search</p>
            <h2>Find branches by main_chef_id</h2>
          </div>
        </div>
        <div className="search-panel">
          <input
            className="search-input"
            type="text"
            inputMode="numeric"
            placeholder="Enter main_chef_id, for example 1001"
            value={chefSearch}
            onChange={(event) => onChefSearchChange(event.target.value)}
          />
          {selectedChefId !== null ? (
            <button className="toggle-button" onClick={() => onSelectVendor(null)}>
              Show all chef branches
            </button>
          ) : null}
        </div>
        {chefSearch && !showChefResults ? <p className="search-hint">No branches found for that main_chef_id.</p> : null}
        {!chefSearch ? <p className="search-hint">Start with a main_chef_id to load the branch portfolio.</p> : null}
      </section>

      {showChefResults && chefTotals && chefCopilot ? (
        <>
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Portfolio summary</p>
                <h2>Main chef {selectedChefId} across all branches</h2>
              </div>
            </div>
            <div className="portfolio-metric-grid">
              <article className="metric-card tone-info">
                <span className="metric-label">Total branches</span>
                <strong className="metric-value">{chefTotals.totalBranches}</strong>
                <span className="metric-detail">{chefTotals.classCounts.Healthy ?? 0} healthy, {chefTotals.classCounts['At Risk'] ?? 0} at risk</span>
              </article>
              <article className="metric-card tone-info">
                <span className="metric-label">Delivered orders</span>
                <strong className="metric-value">{chefTotals.ordersRecent}</strong>
                <span className="metric-detail">{chefTotals.ordersTrendPct.toFixed(1)}% vs previous period</span>
              </article>
              <article className="metric-card tone-info">
                <span className="metric-label">Delivered GMV</span>
                <strong className="metric-value">{formatMoney(chefTotals.gmvRecent)}</strong>
                <span className="metric-detail">{chefTotals.gmvTrendPct.toFixed(1)}% vs previous period</span>
              </article>
              <article className="metric-card tone-info">
                <span className="metric-label">Weighted AOV</span>
                <strong className="metric-value">{formatMoney(chefTotals.weightedAov)}</strong>
                <span className="metric-detail">Portfolio average order value across all branches</span>
              </article>
            </div>
            <div className="portfolio-metric-grid compact-portfolio-grid">
              <article className="metric-card tone-info">
                <span className="metric-label">Delivered rate</span>
                <strong className="metric-value">{formatPercent(chefTotals.deliveredRate)}</strong>
                <span className="metric-detail">Weighted portfolio quality signal</span>
              </article>
              <article className="metric-card tone-critical">
                <span className="metric-label">Cancel rate</span>
                <strong className="metric-value">{formatPercent(chefTotals.cancelRate)}</strong>
                <span className="metric-detail">Watch branch {chefTotals.topRiskBranch.vendorId}</span>
              </article>
              <article className="metric-card tone-warn">
                <span className="metric-label">Subsidy ratio</span>
                <strong className="metric-value">{formatPercent(chefTotals.subsidyRatio, 2)}</strong>
                <span className="metric-detail">Free delivery {formatPercent(chefTotals.freeDeliveryRate)}</span>
              </article>
              <article className="metric-card tone-good">
                <span className="metric-label">Net take ratio</span>
                <strong className="metric-value">{formatPercent(chefTotals.netTakeRatio, 2)}</strong>
                <span className="metric-detail">Top opportunity branch {chefTotals.topOpportunityBranch.vendorId}</span>
              </article>
            </div>
          </section>

          <section className="branch-overview-grid">
            <div className="branch-detail-column">
              <article className="panel branch-copilot-card">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Portfolio AI Copilot</p>
                    <h2>Main chef {selectedChefId} AM recommendations</h2>
                  </div>
                  <span className="status-chip tone-info">All branches</span>
                </div>

                <div className="copilot-block">
                  <h3>Portfolio summary</h3>
                  <p>{chefCopilot.summary}</p>
                </div>

                <div className="copilot-block">
                  <h3>Likely causes</h3>
                  <ul className="action-list">
                    {chefCopilot.likelyCauses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="copilot-block">
                  <h3>Top AM actions</h3>
                  <ol className="action-list ordered-list">
                    {chefCopilot.actions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                <div className="copilot-block">
                  <h3>Talking points</h3>
                  <ul className="action-list">
                    {chefCopilot.talkingPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
            <div className="branch-copilot-column">
              <article className="panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Branch selector</p>
                    <h2>Main chef {selectedChefId} branch portfolio</h2>
                  </div>
                </div>
                <div className="vendor-grid branch-selector-grid">
                  {chefBranches.map((vendor) => {
                    const vendorTone = classificationTone(vendor.classification)
                    const selected = selectedVendor?.vendorId === vendor.vendorId
                    return (
                      <button
                        key={vendor.vendorId}
                        className={`vendor-card ${selected ? 'vendor-card-selected' : ''}`}
                        onClick={() => onSelectVendor(selected ? null : vendor)}
                      >
                        <div className="vendor-card-header">
                          <div>
                            <strong>Vendor {vendor.vendorId}</strong>
                            <p>
                              {vendor.city} • {vendor.cuisine}
                            </p>
                          </div>
                          <span className={`status-chip tone-${vendorTone}`}>{vendor.classification}</span>
                        </div>
                        <div className="vendor-score-row">
                          <span>Final score</span>
                          <strong>{vendor.finalScore.toFixed(1)}</strong>
                        </div>
                        <p className="vendor-summary">{vendor.summary}</p>
                        <div className="vendor-tags">
                          <span className="subtle-tag">Branch {vendor.vendorId}</span>
                          <span className="subtle-tag">Chef {vendor.mainChefId}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </article>
            </div>
          </section>

          {selectedVendor ? (
            <section className="branch-overview-grid">
              <div className="branch-detail-column">
                <VendorDetailCard vendor={selectedVendor} />
              </div>
              <div className="branch-copilot-column">
                <CopilotCard vendor={selectedVendor} />
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export function MonitoringView({ payload, loading, refreshing, error, onRefresh }: {
  payload: DashboardPayload | null
  loading: boolean
  refreshing: boolean
  error: string | null
  onRefresh: () => void
}) {
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
    <>
      <header className="hero-panel panel">
        <div>
          <div className="brand-lockup">
            <img src={chefzLogo} alt="The Chefz" className="brand-logo" />
            <div>
              <p className="eyebrow">Mario • Live Monitoring</p>
              <h1>Server command center</h1>
            </div>
          </div>
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
          <button className="refresh-button" onClick={onRefresh} disabled={refreshing}>
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
    </>
  )
}
