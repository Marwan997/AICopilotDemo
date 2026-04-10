export type DemoTone = 'good' | 'warn' | 'critical' | 'info'

export type VendorCase = {
  vendorId: number
  mainChefId: number
  city: string
  cuisine: string
  storyTag: string
  classification: 'Healthy' | 'High Potential' | 'At Risk' | 'Needs Attention'
  finalScore: number
  summary: string
  reason: string
  actionHint: string
  kpis: {
    deliveredOrdersRecent: number
    deliveredOrdersPrev: number
    ordersTrendPct: number
    deliveredGmvRecent: number
    deliveredGmvPrev: number
    gmvTrendPct: number
    avgOrderValueRecent: number
    deliveredRateRecent: number
    declineRateRecent: number
    cancelRateRecent: number
    freeDeliveryRateRecent: number
    subsidyRatioRecent: number
    netTakeRatioRecent: number
  }
  scores: {
    growth: number
    quality: number
    efficiency: number
    seasonality: number
    benchmark: number
  }
  benchmarks: {
    ordersPercentile: number
    gmvPercentile: number
    aovPercentile: number
    qualityPercentile: number
    efficiencyPercentile: number
  }
  copilot: {
    performanceSummary: string
    likelyCauses: string[]
    actions: string[]
    talkingPoints: string[]
    watchout: string
  }
}

export const vendorCases: VendorCase[] = [
  {
    vendorId: 100000,
    mainChefId: 1000,
    city: 'Riyadh',
    cuisine: 'Groceries',
    storyTag: 'ramadan_star',
    classification: 'Healthy',
    finalScore: 87.57,
    summary: 'Strong growth, strong quality, and efficient support profile.',
    reason: 'positive recent growth; strong delivery quality; healthy subsidy efficiency',
    actionHint: 'Maintain momentum: protect service quality, keep efficient support, and test small growth levers.',
    kpis: {
      deliveredOrdersRecent: 298,
      deliveredOrdersPrev: 231,
      ordersTrendPct: 29.21,
      deliveredGmvRecent: 34567.42,
      deliveredGmvPrev: 26181.12,
      gmvTrendPct: 32.03,
      avgOrderValueRecent: 116.0,
      deliveredRateRecent: 0.935,
      declineRateRecent: 0.028,
      cancelRateRecent: 0.0366,
      freeDeliveryRateRecent: 0.0976,
      subsidyRatioRecent: 0.0059,
      netTakeRatioRecent: 0.1695,
    },
    scores: {
      growth: 92,
      quality: 82,
      efficiency: 94,
      seasonality: 86,
      benchmark: 84,
    },
    benchmarks: {
      ordersPercentile: 88,
      gmvPercentile: 91,
      aovPercentile: 77,
      qualityPercentile: 81,
      efficiencyPercentile: 93,
    },
    copilot: {
      performanceSummary: 'This vendor is performing strongly across growth, quality, and commercial efficiency. Orders and GMV are growing well, delivery quality is healthy, and the branch appears to be converting seasonal demand effectively.',
      likelyCauses: [
        'Strong fit between the vendor operating model and customer demand patterns.',
        'Good execution during high-demand periods, especially Ramadan-relevant demand windows.',
        'Commercial support appears controlled rather than overly dependent on subsidy.',
      ],
      actions: [
        'Protect service quality while scaling demand during strong dayparts.',
        'Identify the best-performing SKUs and make them more visible during peak windows.',
        'Run a light growth test without materially increasing subsidy exposure.',
      ],
      talkingPoints: [
        'Your branch is showing healthy growth and strong operational consistency.',
        'We want to preserve quality while scaling the strongest demand windows.',
        'We recommend focused visibility and assortment optimization rather than aggressive discounting.',
      ],
      watchout: 'Avoid over-scaling promotions in a way that weakens the current healthy efficiency profile.',
    },
  },
  {
    vendorId: 100078,
    mainChefId: 1019,
    city: 'Jeddah',
    cuisine: 'Groceries',
    storyTag: 'late_night_hero',
    classification: 'High Potential',
    finalScore: 79.34,
    summary: 'Strong operational quality and strong Ramadan late-night fit, with more room to scale.',
    reason: 'good quality but below-median scale in cuisine; strong Ramadan late-night fit; efficient commercial profile',
    actionHint: 'Scale selectively: increase visibility, extend strong dayparts, and support winning SKUs without over-subsidizing.',
    kpis: {
      deliveredOrdersRecent: 230,
      deliveredOrdersPrev: 192,
      ordersTrendPct: 19.79,
      deliveredGmvRecent: 24500.12,
      deliveredGmvPrev: 20887.31,
      gmvTrendPct: 17.3,
      avgOrderValueRecent: 106.52,
      deliveredRateRecent: 0.9274,
      declineRateRecent: 0.0242,
      cancelRateRecent: 0.0484,
      freeDeliveryRateRecent: 0.0887,
      subsidyRatioRecent: 0.011,
      netTakeRatioRecent: 0.169,
    },
    scores: {
      growth: 81,
      quality: 78,
      efficiency: 84,
      seasonality: 98.95,
      benchmark: 73,
    },
    benchmarks: {
      ordersPercentile: 45,
      gmvPercentile: 48,
      aovPercentile: 58,
      qualityPercentile: 77,
      efficiencyPercentile: 74,
    },
    copilot: {
      performanceSummary: 'This branch is a strong growth opportunity. Quality is solid, commercial efficiency is healthy, and the vendor shows strong Ramadan late-night fit, but it is still not fully scaled relative to peer potential.',
      likelyCauses: [
        'Operational fundamentals are strong enough to support more demand.',
        'Seasonal and late-night demand patterns suggest underused upside.',
        'The branch likely has room to grow through visibility and timing rather than heavy subsidy.',
      ],
      actions: [
        'Increase visibility during high-conversion evening and Ramadan-relevant time windows.',
        'Promote the strongest baskets or hero items rather than broad discounts.',
        'Test controlled traffic growth while monitoring cancel and decline rates.',
      ],
      talkingPoints: [
        'Your branch is performing well operationally and has room to grow further.',
        'We see strong demand potential in late-night and Ramadan-relevant windows.',
        'We want to scale efficiently by focusing on timing, visibility, and winning products.',
      ],
      watchout: 'Do not scale demand too aggressively without watching service quality during peak periods.',
    },
  },
  {
    vendorId: 100223,
    mainChefId: 1094,
    city: 'Jeddah',
    cuisine: 'Flowers & Gifts',
    storyTag: 'steady_builder',
    classification: 'Healthy',
    finalScore: 84.26,
    summary: 'Excellent quality and strong growth in a non-core vertical, proving cross-category value.',
    reason: 'positive recent growth; strong delivery quality; healthy subsidy efficiency',
    actionHint: 'Maintain momentum: protect service quality, keep efficient support, and test small growth levers.',
    kpis: {
      deliveredOrdersRecent: 91,
      deliveredOrdersPrev: 55,
      ordersTrendPct: 65.45,
      deliveredGmvRecent: 14632.2,
      deliveredGmvPrev: 9444.8,
      gmvTrendPct: 54.93,
      avgOrderValueRecent: 160.79,
      deliveredRateRecent: 0.9579,
      declineRateRecent: 0.0316,
      cancelRateRecent: 0.0105,
      freeDeliveryRateRecent: 0.0737,
      subsidyRatioRecent: 0.0042,
      netTakeRatioRecent: 0.1701,
    },
    scores: {
      growth: 97,
      quality: 92,
      efficiency: 95,
      seasonality: 71,
      benchmark: 76,
    },
    benchmarks: {
      ordersPercentile: 63,
      gmvPercentile: 74,
      aovPercentile: 89,
      qualityPercentile: 95,
      efficiencyPercentile: 92,
    },
    copilot: {
      performanceSummary: 'This vendor is a strong operator in a different vertical, which shows the copilot works beyond core restaurant cases. Growth is strong, quality is excellent, and the branch appears commercially disciplined.',
      likelyCauses: [
        'Strong merchant execution and reliability.',
        'Good fit between product offering and customer need in its category.',
        'Demand growth is happening without excessive subsidy dependence.',
      ],
      actions: [
        'Preserve the current service model that is driving reliable performance.',
        'Test one targeted growth lever, such as placement or category visibility.',
        'Review top-performing periods and replicate that demand pattern more consistently.',
      ],
      talkingPoints: [
        'Your branch is operating from a strong position and growing efficiently.',
        'We recommend measured expansion, not a major reset.',
        'The focus should be on replicating what already works best.',
      ],
      watchout: 'Small quality slips could become more visible if growth accelerates quickly.',
    },
  },
  {
    vendorId: 100286,
    mainChefId: 1118,
    city: 'Medina',
    cuisine: 'Groceries',
    storyTag: 'weekend_warrior',
    classification: 'Healthy',
    finalScore: 70.86,
    summary: 'Healthy demand and perfect seasonality fit, but subsidy and free-delivery usage should be tightened.',
    reason: 'positive recent growth; healthy subsidy efficiency',
    actionHint: 'Maintain momentum: protect service quality, keep efficient support, and test small growth levers.',
    kpis: {
      deliveredOrdersRecent: 98,
      deliveredOrdersPrev: 82,
      ordersTrendPct: 19.51,
      deliveredGmvRecent: 11140.12,
      deliveredGmvPrev: 9297.55,
      gmvTrendPct: 19.85,
      avgOrderValueRecent: 113.67,
      deliveredRateRecent: 0.8991,
      declineRateRecent: 0.0275,
      cancelRateRecent: 0.0734,
      freeDeliveryRateRecent: 0.1651,
      subsidyRatioRecent: 0.0243,
      netTakeRatioRecent: 0.1668,
    },
    scores: {
      growth: 80,
      quality: 71,
      efficiency: 63,
      seasonality: 100,
      benchmark: 58,
    },
    benchmarks: {
      ordersPercentile: 41,
      gmvPercentile: 46,
      aovPercentile: 67,
      qualityPercentile: 68,
      efficiencyPercentile: 52,
    },
    copilot: {
      performanceSummary: 'This vendor is performing well enough to be considered healthy, but the support model needs monitoring. Demand is present and seasonality fit is strong, yet the branch may be leaning too much on free-delivery support to maintain momentum.',
      likelyCauses: [
        'Demand is real, but some conversion may be artificially supported by delivery incentives.',
        'Seasonality is helping the branch, which may mask underlying efficiency leakage.',
        'The branch may benefit from tighter promo strategy rather than blanket support.',
      ],
      actions: [
        'Audit the free-delivery setup and reduce low-return support.',
        'Shift from broad subsidy to selective promo windows or targeted items.',
        'Measure whether order retention holds after tightening support.',
      ],
      talkingPoints: [
        'Performance is healthy, but we see room to improve efficiency.',
        'We want to preserve growth while making support more targeted.',
        'The goal is better profitability, not less demand.',
      ],
      watchout: 'Removing support too abruptly could distort short-term performance, so changes should be staged.',
    },
  },
  {
    vendorId: 100004,
    mainChefId: 1001,
    city: 'Jeddah',
    cuisine: 'Sweets',
    storyTag: 'weekend_warrior',
    classification: 'At Risk',
    finalScore: 79.14,
    summary: 'Strong demand and growth, but elevated cancellations create a real operational risk.',
    reason: 'high cancel rate',
    actionHint: 'Prioritize intervention: review decline/cancel drivers, reduce weak subsidy spend, and fix fulfillment quality.',
    kpis: {
      deliveredOrdersRecent: 260,
      deliveredOrdersPrev: 209,
      ordersTrendPct: 24.4,
      deliveredGmvRecent: 19078.57,
      deliveredGmvPrev: 14938.96,
      gmvTrendPct: 27.71,
      avgOrderValueRecent: 73.38,
      deliveredRateRecent: 0.8844,
      declineRateRecent: 0.0204,
      cancelRateRecent: 0.0952,
      freeDeliveryRateRecent: 0.1361,
      subsidyRatioRecent: 0.0168,
      netTakeRatioRecent: 0.1691,
    },
    scores: {
      growth: 96.33,
      quality: 58.95,
      efficiency: 88.23,
      seasonality: 98.61,
      benchmark: 62.05,
    },
    benchmarks: {
      ordersPercentile: 61.81,
      gmvPercentile: 70.83,
      aovPercentile: 52.78,
      qualityPercentile: 47.92,
      efficiencyPercentile: 61.11,
    },
    copilot: {
      performanceSummary: 'This branch is showing strong demand and good seasonality fit, but it is classified as At Risk because operational quality is beginning to break under that demand. Elevated cancellations are the key warning signal.',
      likelyCauses: [
        'Demand growth may be outpacing fulfillment reliability.',
        'Operational strain during peak or weekend-heavy periods may be driving cancellations.',
        'The business may be scaling faster than the branch can currently execute.',
      ],
      actions: [
        'Investigate the operational reason for the elevated cancellations immediately.',
        'Avoid adding more traffic or subsidy until fulfillment quality stabilizes.',
        'Review peak-hour readiness, menu complexity, and merchant acceptance behavior.',
      ],
      talkingPoints: [
        'Demand is strong, which is positive, but cancellations are now a serious operational risk.',
        'Fixing fulfillment quality will protect growth better than adding more visibility right now.',
        'Once operational stability improves, we can scale confidently.',
      ],
      watchout: 'If the branch keeps growing without fixing cancellations, customer experience and repeat demand may deteriorate.',
    },
  },
]

export function classificationTone(classification: VendorCase['classification']): DemoTone {
  if (classification === 'Healthy') return 'good'
  if (classification === 'High Potential') return 'info'
  if (classification === 'At Risk') return 'critical'
  return 'warn'
}
