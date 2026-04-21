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
          <p className="detail-explainer">Branch trends compare the latest month vs last month. They are not cumulative since the beginning of the data.</p>
        </div>
        <span className={`status-chip tone-${tone}`}>{vendor.classification}</span>
      </div>

      <div className="metric-grid metric-grid-three">
        <article className="metric-card tone-info">
          <span className="metric-label">Orders trend</span>
          <strong className="metric-value">{vendor.kpis.ordersTrendPct.toFixed(1)}%</strong>
          <span className="metric-detail">
            {vendor.kpis.deliveredOrdersRecent} vs {vendor.kpis.deliveredOrdersPrev} delivered orders last month
          </span>
        </article>
        <article className="metric-card tone-info">
          <span className="metric-label">GMV trend</span>
          <strong className="metric-value">{vendor.kpis.gmvTrendPct.toFixed(1)}%</strong>
          <span className="metric-detail">
            {formatMoney(vendor.kpis.deliveredGmvRecent)} vs {formatMoney(vendor.kpis.deliveredGmvPrev)} last month
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
              <h3>Percentile vs comparable peers</h3>
              <p className="detail-explainer">Shows how this branch ranks versus similar branches in orders, GMV, AOV, quality, and efficiency.</p>
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
  selectedChefId,
  onSelectChefId,
  chefBranches,
  selectedVendor,
  onSelectVendor,
}: {
  selectedChefId: number | null
  onSelectChefId: (chefId: number) => void
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
    const topOpportunity = chefTotals.topOpportunityBranch
    const topRisk = chefTotals.topRiskBranch
    const sameBranch = topOpportunity.vendorId === topRisk.vendorId

    if (selectedChefId === 1193) {
      return {
        summary: `Lazurde Gifts is a mixed-quality premium portfolio. Across ${chefTotals.totalBranches} branches it is delivering ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, but the AM story is split: one branch is scaling cleanly, one branch is cooling, and one branch is leaking value through cancellation.`,
        likelyCauses: [
          'The portfolio has strong basket quality and low subsidy dependence, which makes the upside commercially attractive.',
          'The problem is not one single portfolio-wide issue, it is uneven branch health inside the same brand.',
          'Because the brand includes both strong and fragile branches, AM strategy needs to be selective instead of uniform.',
        ],
        actions: [
          'Lead with branch 100462 as the proof point for growth and premium positioning, because it shows the cleanest expansion story in the portfolio.',
          'Treat branch 100459 as an execution-recovery case first, with cancellation reduction ahead of extra visibility.',
          'Use small reactivation tests on branch 100460 so the portfolio grows without dragging weaker branches behind it.',
        ],
        talkingPoints: [
          'This brand is valuable because even small performance gains matter at its basket size.',
          'We should not pitch the same AM package across all four branches because they are solving different problems.',
          'The smartest move is to scale the healthiest branch, recover the weakest branch, and selectively wake up the quieter branch.',
        ],
      }
    }

    if (selectedChefId === 1069) {
      return {
        summary: `Noodle Box is a risky-growth portfolio. Across ${chefTotals.totalBranches} branches it is generating ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, but both branches are at risk because demand is arriving faster than it is being converted cleanly.`,
        likelyCauses: [
          'The topline growth is real, but delivered rate, decline rate, and cancel rate say too much demand is failing inside the funnel.',
          'Support is already meaningful, so the portfolio does not need more demand first, it needs better conversion quality first.',
          'Because both branches are under pressure, the AM story here is operational credibility before commercial acceleration.',
        ],
        actions: [
          'Take branch 100168 into the merchant discussion as the clearest example of high growth with unhealthy execution underneath it.',
          'Ask for a cross-branch diagnosis of cancellations, acceptance issues, and menu availability before proposing more marketing spend.',
          'Hold back broader growth pushes until both branches improve delivered quality and stop wasting demand.',
        ],
        talkingPoints: [
          'This brand is not short on demand, it is short on clean fulfillment.',
          'A growth score can be high while the portfolio is still risky, because growth alone does not mean healthy unit economics or customer experience.',
          'The AM win here is to turn messy demand into reliable demand, then scale from there.',
        ],
      }
    }

    if (selectedChefId === 1209) {
      return {
        summary: `Game Station is a clean single-branch portfolio with ${chefTotals.ordersRecent} orders, ${formatMoney(chefTotals.gmvRecent)} in GMV, excellent delivery quality, and very low support dependence. This is a strategic upsell case, not a rescue case.`,
        likelyCauses: [
          'The branch is winning on quality and consistency, not on heavy platform funding.',
          'Basket strength and delivered rate make this one of the more credible premium relationship candidates in the demo.',
          'Because the portfolio is only one strong branch, clarity matters more than complexity in the AM pitch.',
        ],
        actions: [
          'Use branch 100499 as a premium partnership story, with exclusivity or elevated placement framed as an earned next step.',
          'Protect the current service quality while testing a small amount of high-confidence visibility.',
          'Keep the merchant conversation focused on strategic value, not on generic promotional support.',
        ],
        talkingPoints: [
          'This is the kind of branch we want to deepen, because it already performs well without asking the platform to carry it.',
          'The best AM move here is to build on strength, not invent a problem that is not really there.',
          'If we pitch this correctly, the merchant should hear partnership, not discounting.',
        ],
      }
    }

    if (selectedChefId === 1202) {
      return {
        summary: `Cotton Care is a premium portfolio with mixed momentum. Across ${chefTotals.totalBranches} branches it is generating ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, but one branch is healthy while two branches are clearly cooling off.`,
        likelyCauses: [
          'The portfolio still has strong basket quality and acceptable service, so the slowdown does not look like a structural collapse.',
          'The real issue is weakening momentum at the branch level, especially where orders and GMV have both softened.',
          'Because subsidy is still low, the brand has room for selective reactivation without becoming promo-led.',
        ],
        actions: [
          'Use branch 100478 as the anchor branch in the merchant conversation because it shows the portfolio can still perform cleanly.',
          'Reawaken branches 100479 and 100480 with light, focused support rather than broad discounting.',
          'Frame the portfolio plan around protecting premium value while rebuilding traffic where it has cooled.',
        ],
        talkingPoints: [
          'This brand does not need reinvention, it needs momentum restored in the right places.',
          'The branch mix tells us the proposition still works, but not every branch is pulling equally anymore.',
          'A measured AM plan here should feel like reactivation with discipline, not panic spending.',
        ],
      }
    }

    if (selectedChefId === 1154) {
      return {
        summary: `Poke Bowl Co. is a support-assisted growth portfolio. Across ${chefTotals.totalBranches} branches it is delivering ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, with real upside, but support usage is already high enough that the next AM move needs to be sharper, not bigger.`,
        likelyCauses: [
          'The portfolio has good demand momentum and decent service quality, so the growth case is real.',
          'Free delivery and subsidy are already doing meaningful work, which makes efficiency the key question now.',
          'Because both branches are healthy enough to scale, AM value comes from shaping growth quality, not from forcing more spend.',
        ],
        actions: [
          'Lead with branch 100367 as the proof that the brand can convert demand, then use branch 100366 to discuss how support should be tightened.',
          'Audit where free delivery is truly incremental and reduce the parts of the spend that are just carrying existing demand.',
          'Keep the merchant focused on profitable acceleration instead of chasing topline growth at any cost.',
        ],
        talkingPoints: [
          'This brand has momentum, but it is the kind of momentum that can become expensive if we get lazy.',
          'Our role as AM copilot is to help the merchant keep the upside while improving the shape of the growth engine.',
          'The story here is not spend more, it is spend smarter.',
        ],
      }
    }

    if (selectedChefId === 1031) {
      return {
        summary: `Patty Republic is one of the cleanest scalable portfolios in the demo. Across ${chefTotals.totalBranches} branches it is delivering ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, with two high-potential branches that look ready for more visibility.`,
        likelyCauses: [
          'Both branches show strong demand momentum without looking heavily subsidy-dependent.',
          'Operational quality is healthy enough to support more traffic, especially in the windows where the brand already wins.',
          'This portfolio looks more under-exposed than under-performing, which is a very different AM problem from a rescue case.',
        ],
        actions: [
          'Use branch 100078 as the lead growth pitch and branch 100077 as supporting evidence that the story is repeatable across the portfolio.',
          'Push in-app visibility around the strongest converting periods instead of turning the brand into a broad discount play.',
          'Monitor quality closely as volume scales so the portfolio keeps its clean-growth profile.',
        ],
        talkingPoints: [
          'This is the kind of brand where AM support should feel sharp and confident, because the fundamentals are already working.',
          'The upside is not fixing weakness, it is unlocking more of what is already proving itself.',
          'If we scale this portfolio well, it becomes one of the most convincing growth stories in the demo.',
        ],
      }
    }

    if (selectedChefId === 1195) {
      return {
        summary: `Bait Al Tamr is a dependency-risk portfolio. Across ${chefTotals.totalBranches} branches it is generating ${chefTotals.ordersRecent} orders and ${formatMoney(chefTotals.gmvRecent)} in GMV, but the current growth picture leans too heavily on free delivery and subsidy to feel fully healthy.`,
        likelyCauses: [
          'The brand is clearly able to win demand, but support intensity is doing a lot of the lifting.',
          'One branch still has upside, while the other is already showing enough service fragility to warn against a broad growth push.',
          'This makes the AM challenge less about adding more support and more about reducing dependence without killing momentum.',
        ],
        actions: [
          'Use branch 100466 as the cleaner version of the growth story, then contrast it with branch 100465 to show why support quality matters.',
          'Tighten free-delivery usage gradually so the merchant can see where demand is real versus heavily carried by incentives.',
          'Keep the portfolio growth plan tied to better reliability and better support efficiency at the same time.',
        ],
        talkingPoints: [
          'This brand does not need zero support, it needs healthier support.',
          'If we treat supported demand as fully organic demand, we will overestimate how strong this portfolio really is.',
          'The AM play here is to protect growth while making the economics more believable.',
        ],
      }
    }

    return {
      summary: `${brandName} has ${chefTotals.totalBranches} branches, ${chefTotals.ordersRecent} recent orders, and ${formatMoney(chefTotals.gmvRecent)} in GMV. The AM view should stay selective and branch-aware rather than assuming one portfolio message fits everything.`,
      likelyCauses: [
        'Portfolio performance is shaped by branch mix, not just one top-line trend.',
        'The healthiest AM stories usually come from the branches with the best balance of demand, quality, and economics.',
        'Where branch health differs, the portfolio recommendation should stay segmented.',
      ],
      actions: [
        `Start with branch ${topOpportunity.vendorId} as the strongest commercial story in the portfolio.`,
        sameBranch
          ? `Because this is effectively a one-shape portfolio, pressure-test branch ${topRisk.vendorId} carefully before broadening support.`
          : `Keep branch ${topRisk.vendorId} on a separate path from branch ${topOpportunity.vendorId} so the AM plan stays honest.`,
        'Make sure each branch is being pitched on the lever that matches its actual KPI picture.',
      ],
      talkingPoints: [
        `${brandName} needs a portfolio conversation that respects the branch-level differences inside it.`,
        sameBranch
          ? `The same branch is carrying both the upside and the risk story, so the pitch needs extra care.`
          : `The growth branch and the risk branch are not the same story, and we should talk about them differently.`,
        'A good AM copilot should help the team avoid one-size-fits-all portfolio messaging.',
      ],
    }
  }, [chefTotals, selectedChefId])

  return (
    <>
      <header className="hero-panel panel hero-panel-copilot">
        <div>
          <div>
            <h1>The Chefz AI Center</h1>
          </div>
          <p className="hero-copy">
            Move through the seven curated brands, review each portfolio across branches, then drill into a specific branch when needed.
          </p>
          <div className="hero-meta">
            <span>Seven curated demo brands</span>
            <span>Portfolio and branch analytics</span>
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
            <p className="eyebrow">Brand portfolio</p>
            <h2>Demo brand selection</h2>
            <p className="detail-explainer">Choose a brand to move the demo between the seven curated portfolio stories.</p>
          </div>
        </div>

        <div className="portfolio-directory">
          {chefPortfolios.map((portfolio) => {
            const ordersTrend = portfolio.ordersPrev > 0 ? ((portfolio.ordersRecent - portfolio.ordersPrev) / portfolio.ordersPrev) * 100 : 0
            const gmvTrend = portfolio.gmvPrev > 0 ? ((portfolio.gmvRecent - portfolio.gmvPrev) / portfolio.gmvPrev) * 100 : 0
            const isSelected = portfolio.mainChefId === selectedChefId
            return (
              <button
                key={portfolio.mainChefId}
                className={`portfolio-directory-row ${isSelected ? 'portfolio-directory-row-selected' : ''}`}
                onClick={() => {
                  onSelectChefId(portfolio.mainChefId)
                  onSelectVendor(null)
                }}
              >
                <div className="portfolio-directory-main">
                  <strong>{getBrandName(portfolio.mainChefId)}</strong>
                  <span>{portfolio.branchCount} branches • {portfolio.cuisine} • {portfolio.primaryCity}</span>
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
                <span className="portfolio-kpi-label">Peer position</span>
                <strong className="portfolio-kpi-value">{chefTotals.ordersTrendPct >= 12 && chefTotals.deliveredRate >= 0.91 && chefTotals.cancelRate < 0.06 && chefTotals.subsidyRatio < 0.02
                  ? 'Ahead'
                  : chefTotals.ordersTrendPct >= 8 && (chefTotals.deliveredRate < 0.9 || chefTotals.cancelRate >= 0.07)
                    ? 'Growth ahead, quality behind'
                    : chefTotals.ordersTrendPct < 0 && chefTotals.deliveredRate >= 0.9
                      ? 'Quality ahead, growth behind'
                      : 'Mixed'}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.ordersTrendPct >= 12 && chefTotals.deliveredRate >= 0.91 && chefTotals.cancelRate < 0.06 && chefTotals.subsidyRatio < 0.02
                  ? 'Strong growth with healthy quality and efficient support.'
                  : chefTotals.ordersTrendPct >= 8 && (chefTotals.deliveredRate < 0.9 || chefTotals.cancelRate >= 0.07)
                    ? 'Demand is strong, but service quality is lagging.'
                    : chefTotals.ordersTrendPct < 0 && chefTotals.deliveredRate >= 0.9
                      ? 'Quality is holding up, but momentum has softened.'
                      : 'Performance is mixed across growth, quality, and efficiency.'}</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">Orders</span>
                <strong className="portfolio-kpi-value">{chefTotals.ordersRecent}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.ordersTrendPct.toFixed(1)}% vs last month</span>
              </article>
              <article className="portfolio-kpi-box">
                <span className="portfolio-kpi-label">GMV</span>
                <strong className="portfolio-kpi-value">{formatMoney(chefTotals.gmvRecent)}</strong>
                <span className="portfolio-kpi-detail">{chefTotals.gmvTrendPct.toFixed(1)}% vs last month</span>
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
                <span className="portfolio-kpi-label">Free delivery</span>
                <strong className="portfolio-kpi-value">{formatPercent(chefTotals.freeDeliveryRate)}</strong>
                <span className="portfolio-kpi-detail">Portfolio-wide free delivery weight</span>
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
                    {getBrandName(selectedVendor.mainChefId)} branch {selectedVendor.vendorId} • {selectedVendor.city}
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
