import { useMemo } from 'react'
import { classificationTone, type VendorCase } from './demoData'
import { curatedVendorCases } from './curatedVendorData'
import { getBrandName } from './brandDirectory'
import type { DashboardPayload } from './types'
import { asArray, formatDate, formatMoney, formatPercent } from './utils'

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
  const branchLabel = `${getBrandName(vendor.mainChefId)} branch ${vendor.vendorId}`

  return (
    <article className="panel vendor-detail-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Branch detail</p>
          <h2>
            {branchLabel} • {vendor.city}
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
  const branchLabel = `${getBrandName(vendor.mainChefId)} branch ${vendor.vendorId}`

  return (
    <article className="panel copilot-panel branch-copilot-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">AI Copilot</p>
          <h2>
            {branchLabel} • {vendor.city}
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
  const chefPortfolios = useMemo(() => {
    const portfolioMap = new Map<number, {
      mainChefId: number
      cuisine: string
      primaryCity: string
      branches: VendorCase[]
      branchCount: number
      ordersRecent: number
      ordersPrev: number
      gmvRecent: number
      gmvPrev: number
      weightedAov: number
      avgFinalScore: number
    }>()

    for (const vendor of curatedVendorCases) {
      const existing = portfolioMap.get(vendor.mainChefId)
      if (existing) {
        existing.branches.push(vendor)
        existing.branchCount += 1
        existing.ordersRecent += vendor.kpis.deliveredOrdersRecent
        existing.ordersPrev += vendor.kpis.deliveredOrdersPrev
        existing.gmvRecent += vendor.kpis.deliveredGmvRecent
        existing.gmvPrev += vendor.kpis.deliveredGmvPrev
        existing.avgFinalScore += vendor.finalScore
      } else {
        portfolioMap.set(vendor.mainChefId, {
          mainChefId: vendor.mainChefId,
          cuisine: vendor.cuisine,
          primaryCity: vendor.city,
          branches: [vendor],
          branchCount: 1,
          ordersRecent: vendor.kpis.deliveredOrdersRecent,
          ordersPrev: vendor.kpis.deliveredOrdersPrev,
          gmvRecent: vendor.kpis.deliveredGmvRecent,
          gmvPrev: vendor.kpis.deliveredGmvPrev,
          weightedAov: 0,
          avgFinalScore: vendor.finalScore,
        })
      }
    }

    return [...portfolioMap.values()]
      .map((portfolio) => ({
        ...portfolio,
        weightedAov: portfolio.ordersRecent > 0 ? portfolio.gmvRecent / portfolio.ordersRecent : 0,
        avgFinalScore: portfolio.avgFinalScore / portfolio.branchCount,
      }))
      .sort((a, b) => a.mainChefId - b.mainChefId)
  }, [])

  const classCounts = curatedVendorCases.reduce<Record<string, number>>((acc, vendor) => {
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

    const brandName = getBrandName(selectedChefId)
    const healthyCount = chefTotals.classCounts.Healthy ?? 0
    const highPotentialCount = chefTotals.classCounts['High Potential'] ?? 0
    const needsAttentionCount = chefTotals.classCounts['Needs Attention'] ?? 0
    const atRiskCount = chefTotals.classCounts['At Risk'] ?? 0

    const freeDeliveryStory = chefTotals.freeDeliveryRate >= 0.16
      ? 'Free-delivery adoption is already meaningful in this portfolio, so the AM opportunity is to sharpen where it is used rather than push it everywhere.'
      : 'Free-delivery adoption still has room to expand, which creates a clear AM lever for portfolios that need stronger conversion or acquisition.'

    const marketingStory = chefTotals.ordersTrendPct >= 12 && chefTotals.subsidyRatio < 0.02
      ? 'The portfolio has enough demand momentum to justify more in-app marketing conversations, especially for branches that can scale without heavy support.'
      : 'In-app marketing should be pitched selectively, focusing on branches where visibility can unlock demand rather than mask weak fundamentals.'

    const exclusivityStory = chefTotals.weightedAov >= 95 && chefTotals.deliveredRate >= 0.91
      ? 'This portfolio has enough basket quality and service consistency to make exclusive offers a credible commercial pitch.'
      : 'Exclusive offers should be used selectively, only where the branch proposition is strong enough to justify platform-first value.'

    const summaryLead = highPotentialCount > 0
      ? `${brandName} is a commercially expandable portfolio with ${highPotentialCount} high-potential branch${highPotentialCount > 1 ? 'es' : ''} that can be pushed through targeted AM levers.`
      : healthyCount > 0
        ? `${brandName} is a stable portfolio where AM upside will come from sharper monetization and visibility plays, not blanket outreach.`
        : `${brandName} needs a more selective commercial approach, with AM effort concentrated on the branches most likely to convert growth levers into value.`

    const likelyCauses = [freeDeliveryStory, marketingStory, exclusivityStory]

    const actions = [
      `Use branch ${chefTotals.topOpportunityBranch.vendorId} as the lead growth conversation for in-app marketing or exclusive placement, because it shows the strongest upside profile in the portfolio.`,
      chefTotals.freeDeliveryRate < 0.14
        ? 'Open a free-delivery activation conversation with the branches that still have room to use delivery support as a conversion lever.'
        : 'Refine free-delivery participation instead of broadening it, so the portfolio keeps conversion support where it works best.',
      'Segment the portfolio by commercial lever, so AMs know which branches to pitch on free delivery, which on exclusivity, and which on paid in-app marketing.',
    ]

    const talkingPoints = [
      `${brandName} has ${healthyCount} healthy, ${highPotentialCount} high-potential, ${needsAttentionCount} needs-attention, and ${atRiskCount} at-risk branches that still require different commercial pitches inside the same portfolio.`,
      `Branch ${chefTotals.topOpportunityBranch.vendorId} is the clearest candidate for a growth conversation, while branch ${chefTotals.topRiskBranch.vendorId} should not receive the same commercial push until its position is better understood.`,
      'The AM objective is to match each branch with the right commercial lever, not push the same package across the full brand portfolio.',
    ]

    return {
      summary: `${summaryLead} Across ${chefTotals.totalBranches} branches, ${brandName} is delivering ${chefTotals.ordersRecent} orders, ${formatMoney(chefTotals.gmvRecent)} in GMV, ${formatPercent(chefTotals.freeDeliveryRate)} free-delivery usage, and ${formatPercent(chefTotals.subsidyRatio, 2)} subsidy ratio.`,
      likelyCauses,
      actions,
      talkingPoints,
    }
  }, [chefTotals, selectedChefId])

  return (
    <>
      <header className="hero-panel panel hero-panel-copilot">
        <div>
          <div>
            <p className="eyebrow">Mario • Account Manager Copilot</p>
            <h1>Vendor action center</h1>
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

        {!chefSearch ? (
          <div className="portfolio-directory">
            {chefPortfolios.map((portfolio) => {
              const ordersTrend = portfolio.ordersPrev > 0 ? ((portfolio.ordersRecent - portfolio.ordersPrev) / portfolio.ordersPrev) * 100 : 0
              const gmvTrend = portfolio.gmvPrev > 0 ? ((portfolio.gmvRecent - portfolio.gmvPrev) / portfolio.gmvPrev) * 100 : 0
              return (
                <button
                  key={portfolio.mainChefId}
                  className="portfolio-directory-row"
                  onClick={() => onChefSearchChange(String(portfolio.mainChefId))}
                >
                  <div className="portfolio-directory-main">
                    <strong>{getBrandName(portfolio.mainChefId)}</strong>
                    <span>main_chef_id {portfolio.mainChefId} • {portfolio.branchCount} branches • {portfolio.cuisine} • {portfolio.primaryCity}</span>
                  </div>
                  <div className="portfolio-directory-metrics">
                    <span className="branch-score">Orders {portfolio.ordersRecent}</span>
                    <span className="branch-score">GMV {formatMoney(portfolio.gmvRecent)}</span>
                    <span className="branch-score">Trend {ordersTrend.toFixed(1)}% / {gmvTrend.toFixed(1)}%</span>
                    <span className="branch-score">Avg score {portfolio.avgFinalScore.toFixed(1)}</span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}
      </section>

      {showChefResults && chefTotals && chefCopilot ? (
        <>
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Portfolio summary</p>
                <h2>{selectedChefId !== null ? getBrandName(selectedChefId) : 'Selected portfolio'} across all branches</h2>
              </div>
            </div>
            <div className="portfolio-kpi-grid">
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Branches</span>
                <strong className="portfolio-kpi-value">{chefTotals.totalBranches}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.classCounts.Healthy ?? 0} healthy</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Orders</span>
                <strong className="portfolio-kpi-value">{chefTotals.ordersRecent}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.ordersTrendPct.toFixed(1)}% trend</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">GMV</span>
                <strong className="portfolio-kpi-value">{formatMoney(chefTotals.gmvRecent)}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.gmvTrendPct.toFixed(1)}% trend</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">AOV</span>
                <strong className="portfolio-kpi-value">{formatMoney(chefTotals.weightedAov)}</strong>
                <span className="portfolio-kpi-detail">Weighted across branches</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Delivered</span>
                <strong className="portfolio-kpi-value">{formatPercent(chefTotals.deliveredRate)}</strong>
                <span className="portfolio-kpi-detail">Portfolio quality</span>
              </article>
              <article className="portfolio-kpi-box portfolio-kpi-risk">
                <span className="portfolio-kpi-label">Cancel</span>
                <strong className="portfolio-kpi-value">{formatPercent(chefTotals.cancelRate)}</strong>
                <span className="portfolio-kpi-detail">Risk branch {chefTotals.topRiskBranch.vendorId}</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Subsidy</span>
                <strong className="portfolio-kpi-value">{formatPercent(chefTotals.subsidyRatio, 2)}</strong>
                <span className="portfolio-kpi-detail">Free delivery {formatPercent(chefTotals.freeDeliveryRate)}</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Net take</span>
                <strong className="portfolio-kpi-value">{formatPercent(chefTotals.netTakeRatio, 2)}</strong>
                <span className="portfolio-kpi-detail">Opportunity {chefTotals.topOpportunityBranch.vendorId}</span>
              </article>
            </div>
          </section>

          <article className="panel branch-copilot-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Portfolio AI Copilot</p>
                <h2>{selectedChefId !== null ? getBrandName(selectedChefId) : 'Selected portfolio'} AM recommendations</h2>
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

          <section className="panel branch-selector-panel">
            <div className="section-heading branch-selector-heading">
              <div>
                <p className="eyebrow">Branch selector</p>
                <h2>{selectedChefId !== null ? getBrandName(selectedChefId) : 'Selected portfolio'} branch portfolio</h2>
              </div>
              <span className="branch-selector-summary">
                {selectedVendor ? `${getBrandName(selectedVendor.mainChefId)} branch ${selectedVendor.vendorId} selected` : 'Select a branch to reveal branch details'}
              </span>
            </div>
            <div className="branch-selector-list compact-branch-selector-list">
              {chefBranches.map((vendor) => {
                const vendorTone = classificationTone(vendor.classification)
                const selected = selectedVendor?.vendorId === vendor.vendorId
                return (
                  <button
                    key={vendor.vendorId}
                    className={`branch-selector-row compact-branch-selector-row ${selected ? 'branch-selector-row-selected' : ''}`}
                    onClick={() => onSelectVendor(selected ? null : vendor)}
                  >
                    <div className="branch-selector-main compact-branch-selector-main">
                      <strong>{getBrandName(vendor.mainChefId)} branch {vendor.vendorId}</strong>
                      <span>{vendor.city} • {vendor.cuisine}</span>
                    </div>
                    <div className="branch-selector-metrics compact-branch-selector-metrics">
                      <span className={`status-chip tone-${vendorTone}`}>{vendor.classification}</span>
                      <span className="branch-score">Score {vendor.finalScore.toFixed(1)}</span>
                      <span className="branch-score">Orders {vendor.kpis.deliveredOrdersRecent}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {selectedVendor ? (
            <>
              <section className="panel branch-selected-banner">
                <div>
                  <p className="eyebrow">Selected branch</p>
                  <h2>
                    Vendor {selectedVendor.vendorId} • {selectedVendor.city}
                  </h2>
                </div>
                <span className={`status-chip tone-${classificationTone(selectedVendor.classification)}`}>
                  {selectedVendor.classification}
                </span>
              </section>

              <section className="branch-overview-grid">
                <div className="branch-detail-column">
                  <VendorDetailCard vendor={selectedVendor} />
                </div>
                <div className="branch-copilot-column">
                  <CopilotCard vendor={selectedVendor} />
                </div>
              </section>
            </>
          ) : (
            <section className="panel branch-selection-placeholder">
              <p>Select a branch above to open branch-level AI analysis and detailed KPIs.</p>
            </section>
          )}
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

  const disks = asArray(payload.disks)

  const cpuPercent = Number(payload.counters?.cpuPercent ?? 0)
  const memoryUsedPercent = Number(payload.derived?.memoryUsedPercent ?? 0)
  const memoryFree = Number(payload.os?.freePhysicalMemoryGB ?? 0)
  const memoryTotal = Number(payload.os?.totalVisibleMemoryGB ?? 0)
  const diskPrimary = disks[0]
  const latency = payload.internet?.latencyMs ?? null
  return (
    <>
      <header className="hero-panel panel">
        <div>
          <div>
            <p className="eyebrow">Mario • Live Monitoring</p>
            <h1>Server command center</h1>
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
    </>
  )
}
