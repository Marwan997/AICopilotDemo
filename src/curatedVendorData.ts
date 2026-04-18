import type { VendorCase } from './demoData'

export const curatedVendorCases: VendorCase[] = [
  {
    "vendorId": 100459,
    "mainChefId": 1193,
    "city": "Khobar",
    "cuisine": "Flowers & Gifts",
    "storyTag": "stable_cash_cow",
    "classification": "At Risk",
    "finalScore": 76.35,
    "summary": "Orders and GMV are growing, but the branch is leaking value through cancellations. This is a grow-but-fix case, not a scale-at-any-cost case.",
    "reason": "high cancel rate",
    "actionHint": "Prioritize intervention: review decline/cancel drivers, reduce weak subsidy spend, and fix fulfillment quality.",
    "kpis": {
      "deliveredOrdersRecent": 165,
      "deliveredOrdersPrev": 134,
      "ordersTrendPct": 23.13,
      "deliveredGmvRecent": 28416.01,
      "deliveredGmvPrev": 23777.02,
      "gmvTrendPct": 19.51,
      "avgOrderValueRecent": 172.22,
      "deliveredRateRecent": 0.8549,
      "declineRateRecent": 0.0415,
      "cancelRateRecent": 0.1036,
      "freeDeliveryRateRecent": 0.0725,
      "subsidyRatioRecent": 0.0043,
      "netTakeRatioRecent": 0.1698
    },
    "scores": {
      "growth": 92.98,
      "quality": 43.61,
      "efficiency": 94.07,
      "seasonality": 91.49,
      "benchmark": 71.49
    },
    "benchmarks": {
      "ordersPercentile": 89.36,
      "gmvPercentile": 89.36,
      "aovPercentile": 61.7,
      "qualityPercentile": 25.53,
      "efficiencyPercentile": 63.83
    },
    "copilot": {
      "performanceSummary": "Lazurde Gifts branch 100459 is winning demand, with orders up 23.1% and GMV up 19.5%, but the branch is still at risk because cancellation is too high and delivered rate is too soft for a premium basket business. The AM story here is simple: protect the upside by fixing execution before asking the merchant to lean harder into growth.",
      "likelyCauses": [
        "Demand is healthy, so the problem is not customer interest, it is fulfillment reliability after the order is placed.",
        "A 10.4% cancel rate is too high for a branch with a 172 SAR basket, which means too much valuable demand is slipping out of the funnel.",
        "Support is not the issue here, subsidy is very low, so this looks more like an operational discipline problem than a commercial overspend problem."
      ],
      "actions": [
        "Go to the merchant with a recovery plan focused on cancel reduction before pitching any larger growth package.",
        "Ask for a quick diagnosis of the main cancel drivers, for example stock availability, prep-time misses, or order acceptance delays.",
        "Once reliability improves, use in-app visibility selectively to capture the growth that the branch is already proving it can win."
      ],
      "talkingPoints": [
        "You have real customer demand here, the issue is that too many orders are being lost after intent is already created.",
        "Because basket value is strong, every avoided cancellation is commercially meaningful for both the merchant and The Chefz.",
        "Let us stabilize execution first, then we can scale this branch with much more confidence."
      ],
      "watchout": "Do not treat this branch like a clean growth case. More exposure without fixing cancellation risk can amplify customer frustration instead of revenue."
    }
  },
  {
    "vendorId": 100168,
    "mainChefId": 1069,
    "city": "Dammam",
    "cuisine": "Fast Food",
    "storyTag": "high_cancel_risk",
    "classification": "At Risk",
    "finalScore": 62.05,
    "summary": "This branch is growing fast, but the growth quality is weak. Demand is arriving, yet high declines and cancellations are putting the branch in the danger zone.",
    "reason": "high cancel rate",
    "actionHint": "Prioritize intervention: review decline/cancel drivers, reduce weak subsidy spend, and fix fulfillment quality.",
    "kpis": {
      "deliveredOrdersRecent": 299,
      "deliveredOrdersPrev": 233,
      "ordersTrendPct": 28.33,
      "deliveredGmvRecent": 12757.98,
      "deliveredGmvPrev": 9715.98,
      "gmvTrendPct": 31.31,
      "avgOrderValueRecent": 42.67,
      "deliveredRateRecent": 0.826,
      "declineRateRecent": 0.0801,
      "cancelRateRecent": 0.0939,
      "freeDeliveryRateRecent": 0.1602,
      "subsidyRatioRecent": 0.0353,
      "netTakeRatioRecent": 0.1632
    },
    "scores": {
      "growth": 96.16,
      "quality": 28.51,
      "efficiency": 80.28,
      "seasonality": 72.97,
      "benchmark": 33.69
    },
    "benchmarks": {
      "ordersPercentile": 51.35,
      "gmvPercentile": 36.94,
      "aovPercentile": 22.52,
      "qualityPercentile": 4.5,
      "efficiencyPercentile": 35.14
    },
    "copilot": {
      "performanceSummary": "Noodle Box branch 100168 has breakout-looking growth, with orders up 28.3% and GMV up 31.3%, but it is still at risk because the branch is converting demand badly. Delivered rate is only 82.6%, cancel rate is 9.4%, decline rate is 8.0%, and support intensity is already meaningful. The AM copilot view is that this is risky growth, not healthy growth.",
      "likelyCauses": [
        "Customer demand is clearly there, so the branch does not need a demand-generation story first.",
        "The bigger issue is fulfillment friction, high decline and cancel behavior are blocking too much of the demand being created.",
        "Free delivery and subsidy are already doing work, which means more spend alone is unlikely to solve the underlying problem."
      ],
      "actions": [
        "Frame the merchant conversation around fixing conversion quality, not buying more top-of-funnel demand.",
        "Review acceptance flow, kitchen readiness, and menu availability to find where the lost orders are coming from.",
        "Hold back broad paid growth pushes until delivered rate improves and cancel behavior comes under control."
      ],
      "talkingPoints": [
        "The branch is proving it can attract orders, but it is not proving it can fulfill them cleanly.",
        "A 96 growth score does not mean the branch is healthy, it means demand is arriving fast. The risk flag is about how much of that demand is being lost.",
        "If we clean up execution first, this branch could become a much stronger growth story very quickly."
      ],
      "watchout": "Avoid celebrating the growth score in isolation. Right now the branch is creating demand faster than it is converting it cleanly."
    }
  },
  {
    "vendorId": 100169,
    "mainChefId": 1069,
    "city": "Dammam",
    "cuisine": "Fast Food",
    "storyTag": "high_cancel_risk",
    "classification": "At Risk",
    "finalScore": 48.98,
    "summary": "This branch still has demand momentum, but execution quality is too fragile for a safe growth push. It needs discipline before more acceleration.",
    "reason": "high cancel rate",
    "actionHint": "Prioritize intervention: review decline/cancel drivers, reduce weak subsidy spend, and fix fulfillment quality.",
    "kpis": {
      "deliveredOrdersRecent": 250,
      "deliveredOrdersPrev": 223,
      "ordersTrendPct": 12.11,
      "deliveredGmvRecent": 10145.1,
      "deliveredGmvPrev": 9092.96,
      "gmvTrendPct": 11.57,
      "avgOrderValueRecent": 40.58,
      "deliveredRateRecent": 0.8091,
      "declineRateRecent": 0.0712,
      "cancelRateRecent": 0.1197,
      "freeDeliveryRateRecent": 0.1586,
      "subsidyRatioRecent": 0.0381,
      "netTakeRatioRecent": 0.1618
    },
    "scores": {
      "growth": 76.39,
      "quality": 19.7,
      "efficiency": 79.26,
      "seasonality": 47.75,
      "benchmark": 22.39
    },
    "benchmarks": {
      "ordersPercentile": 35.14,
      "gmvPercentile": 19.82,
      "aovPercentile": 20.72,
      "qualityPercentile": 3.6,
      "efficiencyPercentile": 29.73
    },
    "copilot": {
      "performanceSummary": "Noodle Box branch 100169 is also growing, with orders up 12.1% and GMV up 11.6%, but the branch remains at risk because quality is deteriorating where it matters. Cancel rate is 12.0%, delivered rate is only 80.9%, and decline is elevated. The AM angle is to help the merchant stop wasting demand before expanding demand further.",
      "likelyCauses": [
        "The branch is generating enough demand to grow, but too much of that demand is failing before completion.",
        "A near-12% cancel rate suggests a repeatable operational issue rather than random noise.",
        "Commercial support is already present, so the performance ceiling is now more operational than promotional."
      ],
      "actions": [
        "Open the conversation with the merchant around order loss and why it is happening, not around extra marketing support.",
        "Ask for branch-level root causes behind cancellations, especially stock-outs, prep delays, or staffing gaps at busy hours.",
        "Treat new commercial investment as conditional on better delivered-rate and cancellation performance."
      ],
      "talkingPoints": [
        "This branch does not have a demand problem first, it has a conversion problem first.",
        "Right now the merchant is paying the hidden cost of failed orders, weaker customer trust, and wasted support.",
        "If we improve reliability, then future growth spending will work much harder."
      ],
      "watchout": "Do not add more pressure to the funnel until the branch shows it can absorb and deliver orders more consistently."
    }
  },
  {
    "vendorId": 100462,
    "mainChefId": 1193,
    "city": "Khobar",
    "cuisine": "Flowers & Gifts",
    "storyTag": "stable_cash_cow",
    "classification": "Healthy",
    "finalScore": 85.35,
    "summary": "This is a strong premium branch with healthy growth and very limited support dependence. It is a good example of efficient scaling.",
    "reason": "positive recent growth; strong delivery quality; healthy subsidy efficiency",
    "actionHint": "Maintain momentum: protect service quality, keep efficient support, and test small growth levers.",
    "kpis": {
      "deliveredOrdersRecent": 200,
      "deliveredOrdersPrev": 156,
      "ordersTrendPct": 28.21,
      "deliveredGmvRecent": 37882.68,
      "deliveredGmvPrev": 30033.32,
      "gmvTrendPct": 26.14,
      "avgOrderValueRecent": 189.41,
      "deliveredRateRecent": 0.9091,
      "declineRateRecent": 0.0273,
      "cancelRateRecent": 0.0636,
      "freeDeliveryRateRecent": 0.0682,
      "subsidyRatioRecent": 0.0032,
      "netTakeRatioRecent": 0.1721
    },
    "scores": {
      "growth": 94.19,
      "quality": 71.85,
      "efficiency": 94.95,
      "seasonality": 70.21,
      "benchmark": 89.36
    },
    "benchmarks": {
      "ordersPercentile": 97.87,
      "gmvPercentile": 97.87,
      "aovPercentile": 65.96,
      "qualityPercentile": 61.7,
      "efficiencyPercentile": 91.49
    },
    "copilot": {
      "performanceSummary": "Lazurde Gifts branch 100462 is one of the cleanest branches in the set. Orders are up 28.2%, GMV is up 26.1%, delivered quality is healthy, basket value is high, and subsidy use is extremely low. The AM opportunity is not rescue, it is to expand a winning formula carefully.",
      "likelyCauses": [
        "The branch is combining premium basket size with reliable execution, which gives it a strong commercial base.",
        "Growth appears mostly organic rather than support-fueled, which makes the performance more durable.",
        "Because the economics are already healthy, the branch is a credible candidate for a more strategic partnership conversation."
      ],
      "actions": [
        "Use this branch as a flagship example when discussing deeper partnership or premium placement with the merchant.",
        "Test selective visibility on high-intent periods or high-margin assortments rather than broad discounts.",
        "Capture what is working operationally here and use it as a benchmark for weaker sister branches."
      ],
      "talkingPoints": [
        "This is the kind of branch we want to scale, because the growth is arriving with quality and healthy economics.",
        "The strongest pitch here is not more discounting, it is smarter exposure and stronger strategic positioning.",
        "This branch gives the portfolio a proof point that premium demand can scale efficiently on The Chefz."
      ],
      "watchout": "Do not dilute a strong branch with unnecessary blanket offers. The current strength comes from quality and basket health, not heavy support."
    }
  },
  {
    "vendorId": 100499,
    "mainChefId": 1209,
    "city": "Mecca",
    "cuisine": "International",
    "storyTag": "stable_cash_cow",
    "classification": "Healthy",
    "finalScore": 84.94,
    "summary": "A clean, healthy branch with strong service quality and minimal reliance on support. This is the kind of branch where exclusivity actually has substance behind it.",
    "reason": "positive recent growth; strong delivery quality; healthy subsidy efficiency",
    "actionHint": "Maintain momentum: protect service quality, keep efficient support, and test small growth levers.",
    "kpis": {
      "deliveredOrdersRecent": 203,
      "deliveredOrdersPrev": 185,
      "ordersTrendPct": 9.73,
      "deliveredGmvRecent": 19621.95,
      "deliveredGmvPrev": 17461.68,
      "gmvTrendPct": 12.37,
      "avgOrderValueRecent": 96.66,
      "deliveredRateRecent": 0.9442,
      "declineRateRecent": 0.0186,
      "cancelRateRecent": 0.0372,
      "freeDeliveryRateRecent": 0.0326,
      "subsidyRatioRecent": 0.0027,
      "netTakeRatioRecent": 0.173
    },
    "scores": {
      "growth": 76.07,
      "quality": 90.15,
      "efficiency": 97.36,
      "seasonality": 86.49,
      "benchmark": 81.62
    },
    "benchmarks": {
      "ordersPercentile": 78.38,
      "gmvPercentile": 67.57,
      "aovPercentile": 37.84,
      "qualityPercentile": 97.3,
      "efficiencyPercentile": 94.59
    },
    "copilot": {
      "performanceSummary": "Game Station branch 100499 is healthy for the right reasons. Orders are up 9.7%, GMV is up 12.4%, delivered rate is excellent at 94.4%, and support usage is extremely low. The AM read is that this branch has earned the right to be pitched on a stronger strategic relationship, not just tactical offers.",
      "likelyCauses": [
        "Demand is growing at a sustainable pace rather than a volatile spike.",
        "Operational quality is strong enough to support a premium commercial conversation.",
        "Because free delivery and subsidy are low, the branch is proving that customers are choosing it without heavy platform funding."
      ],
      "actions": [
        "Position exclusivity or premium placement as a value play, not as a rescue tool.",
        "Show the merchant that this branch already has the quality profile to justify a stronger partnership conversation.",
        "Protect the current service standards while testing small, high-confidence visibility boosts."
      ],
      "talkingPoints": [
        "This branch is not asking us to fix something broken, it is giving us a chance to build on something strong.",
        "Exclusivity works best when the branch already wins on quality, and this one does.",
        "The story here is confidence: reliable execution, healthy growth, and low support dependence."
      ],
      "watchout": "Do not overcomplicate this branch with heavy promotions. Its strength is that it already performs well without them."
    }
  },
  {
    "vendorId": 100461,
    "mainChefId": 1193,
    "city": "Khobar",
    "cuisine": "Flowers & Gifts",
    "storyTag": "stable_cash_cow",
    "classification": "Healthy",
    "finalScore": 78.26,
    "summary": "A steady, premium branch that is not exploding in growth, but is performing cleanly enough to justify a strategic upsell.",
    "reason": "positive recent growth; strong delivery quality; healthy subsidy efficiency",
    "actionHint": "Maintain momentum: protect service quality, keep efficient support, and test small growth levers.",
    "kpis": {
      "deliveredOrdersRecent": 167,
      "deliveredOrdersPrev": 161,
      "ordersTrendPct": 3.73,
      "deliveredGmvRecent": 31879.82,
      "deliveredGmvPrev": 29751.46,
      "gmvTrendPct": 7.15,
      "avgOrderValueRecent": 190.9,
      "deliveredRateRecent": 0.9278,
      "declineRateRecent": 0.0389,
      "cancelRateRecent": 0.0333,
      "freeDeliveryRateRecent": 0.0611,
      "subsidyRatioRecent": 0.0031,
      "netTakeRatioRecent": 0.1726
    },
    "scores": {
      "growth": 63.89,
      "quality": 81.6,
      "efficiency": 95.52,
      "seasonality": 61.7,
      "benchmark": 90.96
    },
    "benchmarks": {
      "ordersPercentile": 91.49,
      "gmvPercentile": 93.62,
      "aovPercentile": 68.09,
      "qualityPercentile": 82.98,
      "efficiencyPercentile": 93.62
    },
    "copilot": {
      "performanceSummary": "Lazurde Gifts branch 100461 is a quieter healthy branch. Growth is modest, but quality is strong, basket size is excellent, and support intensity is very low. The AM opportunity is to turn consistency into strategic value, not to manufacture urgency where there is none.",
      "likelyCauses": [
        "This branch looks commercially disciplined, with stable growth and clean delivery quality.",
        "High basket value makes even moderate growth commercially meaningful.",
        "Because the branch is not leaning on platform spend, its performance is more trustworthy than flashy but subsidized growth stories."
      ],
      "actions": [
        "Pitch exclusivity or elevated placement as a way to deepen value from an already-healthy branch.",
        "Use this branch as a contrast case against riskier branches that are growing but leaking value.",
        "Keep the merchant focused on protecting quality while selectively expanding high-value demand."
      ],
      "talkingPoints": [
        "Not every strong branch needs a rescue plan, some need a smarter monetization conversation.",
        "This branch is valuable because it is consistent, premium, and efficient.",
        "The AM move here is to build on discipline, not to chase volume for its own sake."
      ],
      "watchout": "Avoid forcing an aggressive growth play where the better story is steady premium performance."
    }
  },
  {
    "vendorId": 100478,
    "mainChefId": 1202,
    "city": "Jeddah",
    "cuisine": "Groceries",
    "storyTag": "stable_cash_cow",
    "classification": "Healthy",
    "finalScore": 75,
    "summary": "A healthy branch with solid premium economics and reliable operations. It is not the fastest grower, but it is a credible strategic branch.",
    "reason": "positive recent growth; strong delivery quality; healthy subsidy efficiency",
    "actionHint": "Maintain momentum: protect service quality, keep efficient support, and test small growth levers.",
    "kpis": {
      "deliveredOrdersRecent": 308,
      "deliveredOrdersPrev": 284,
      "ordersTrendPct": 8.45,
      "deliveredGmvRecent": 58504.35,
      "deliveredGmvPrev": 53803.36,
      "gmvTrendPct": 8.74,
      "avgOrderValueRecent": 189.95,
      "deliveredRateRecent": 0.9277,
      "declineRateRecent": 0.0331,
      "cancelRateRecent": 0.0392,
      "freeDeliveryRateRecent": 0.1024,
      "subsidyRatioRecent": 0.0056,
      "netTakeRatioRecent": 0.1722
    },
    "scores": {
      "growth": 69.47,
      "quality": 81.56,
      "efficiency": 92.91,
      "seasonality": 10.53,
      "benchmark": 93.89
    },
    "benchmarks": {
      "ordersPercentile": 100,
      "gmvPercentile": 100,
      "aovPercentile": 98.95,
      "qualityPercentile": 90.53,
      "efficiencyPercentile": 78.95
    },
    "copilot": {
      "performanceSummary": "Cotton Care branch 100478 is healthy in a measured way. Orders and GMV are both growing around 8 to 9%, delivered quality is strong, and the branch is not over-reliant on support. For AMs, this is the kind of branch where an exclusivity conversation can be grounded in evidence rather than optimism.",
      "likelyCauses": [
        "The branch is operating with healthy service quality and a very strong basket profile.",
        "Growth is moderate but stable, which is often more commercially trustworthy than extreme spikes.",
        "Low subsidy intensity means the branch still has room to pull strategic levers without looking promo-led."
      ],
      "actions": [
        "Use this branch as a candidate for higher-value partnership discussions such as exclusivity or premium placement.",
        "Highlight the branch’s consistency and basket strength when framing the merchant pitch.",
        "Preserve the current quality profile while looking for focused growth pockets rather than broad discounting."
      ],
      "talkingPoints": [
        "This is a branch we can talk about with confidence because the fundamentals are already in place.",
        "The upside here is not fixing a problem, it is capturing more value from a well-run branch.",
        "Strong economics make this branch more interesting than a louder but less efficient growth story."
      ],
      "watchout": "Do not flatten the story into generic growth language. The real strength here is premium, stable, efficient performance."
    }
  },
  {
    "vendorId": 100367,
    "mainChefId": 1154,
    "city": "Riyadh",
    "cuisine": "Groceries",
    "storyTag": "promo_dependent",
    "classification": "Healthy",
    "finalScore": 74.59,
    "summary": "The branch is growing well, but support usage is already meaningful. This is a scale-carefully story, not a spend-more story.",
    "reason": "positive recent growth; healthy subsidy efficiency",
    "actionHint": "Maintain momentum: protect service quality, keep efficient support, and test small growth levers.",
    "kpis": {
      "deliveredOrdersRecent": 179,
      "deliveredOrdersPrev": 143,
      "ordersTrendPct": 25.17,
      "deliveredGmvRecent": 12549.57,
      "deliveredGmvPrev": 9808.05,
      "gmvTrendPct": 27.95,
      "avgOrderValueRecent": 70.11,
      "deliveredRateRecent": 0.8995,
      "declineRateRecent": 0.0503,
      "cancelRateRecent": 0.0503,
      "freeDeliveryRateRecent": 0.201,
      "subsidyRatioRecent": 0.0274,
      "netTakeRatioRecent": 0.1676
    },
    "scores": {
      "growth": 96.11,
      "quality": 66.85,
      "efficiency": 81.08,
      "seasonality": 87.37,
      "benchmark": 40.71
    },
    "benchmarks": {
      "ordersPercentile": 73.16,
      "gmvPercentile": 31.58,
      "aovPercentile": 11.58,
      "qualityPercentile": 53.68,
      "efficiencyPercentile": 3.16
    },
    "copilot": {
      "performanceSummary": "Poke Bowl Co. branch 100367 is healthy, with orders up 25.2% and GMV up 28.0%, but the branch is already leaning on free delivery and subsidy more than the cleanest branches in the portfolio. The AM opportunity is to keep the momentum while tightening how support is used so growth stays profitable.",
      "likelyCauses": [
        "Demand is responding, so the branch clearly has customer traction.",
        "Free delivery and subsidy are already contributing meaningfully, which suggests some of the growth may be support-assisted.",
        "Quality is still acceptable, so this is a refinement case rather than a crisis case."
      ],
      "actions": [
        "Talk to the merchant about sharpening support, not simply expanding it.",
        "Identify which windows, items, or cohorts are genuinely incremental before extending more commercial funding.",
        "Keep growth active, but move toward more selective support that protects margin quality."
      ],
      "talkingPoints": [
        "The branch is doing well, but we should be careful not to buy growth too expensively.",
        "What matters now is not whether support works, it is whether support is working efficiently.",
        "This is a good AM opportunity to show discipline, not just enthusiasm."
      ],
      "watchout": "If support broadens faster than the branch’s organic strength, the growth story can become less attractive very quickly."
    }
  },
  {
    "vendorId": 100078,
    "mainChefId": 1031,
    "city": "Jeddah",
    "cuisine": "Groceries",
    "storyTag": "late_night_hero",
    "classification": "High Potential",
    "finalScore": 79.34,
    "summary": "A promising branch with strong quality and clear demand fit, especially in late-night behavior. It looks ready for a smarter visibility push.",
    "reason": "good quality but below-median scale in cuisine; strong Ramadan late-night fit; efficient commercial profile",
    "actionHint": "Scale selectively: increase visibility, extend strong dayparts, and support winning SKUs without over-subsidizing.",
    "kpis": {
      "deliveredOrdersRecent": 115,
      "deliveredOrdersPrev": 96,
      "ordersTrendPct": 19.79,
      "deliveredGmvRecent": 10293.94,
      "deliveredGmvPrev": 8775.97,
      "gmvTrendPct": 17.3,
      "avgOrderValueRecent": 89.51,
      "deliveredRateRecent": 0.9274,
      "declineRateRecent": 0.0242,
      "cancelRateRecent": 0.0484,
      "freeDeliveryRateRecent": 0.0887,
      "subsidyRatioRecent": 0.011,
      "netTakeRatioRecent": 0.1703
    },
    "scores": {
      "growth": 90.68,
      "quality": 81.41,
      "efficiency": 92.96,
      "seasonality": 98.95,
      "benchmark": 39.74
    },
    "benchmarks": {
      "ordersPercentile": 26.32,
      "gmvPercentile": 23.16,
      "aovPercentile": 27.37,
      "qualityPercentile": 89.47,
      "efficiencyPercentile": 35.79
    },
    "copilot": {
      "performanceSummary": "Patty Republic branch 100078 is a good high-potential case. Orders are up 19.8%, GMV is up 17.3%, quality is healthy, and support remains controlled. The branch is not yet a dominant scale player, but it looks operationally ready for more visibility, especially around the demand windows where it already wins.",
      "likelyCauses": [
        "The branch seems to fit a specific demand moment well, which is why the late-night angle matters.",
        "Quality metrics are good enough to absorb more traffic without obvious operational stress.",
        "Support is present but not excessive, so there is still room to scale intelligently."
      ],
      "actions": [
        "Lead with an in-app visibility conversation centered on the hours and SKUs where the branch already converts well.",
        "Help the merchant focus spend on proven demand windows instead of broad all-day coverage.",
        "Track whether the branch holds quality as volume scales, so the growth remains healthy."
      ],
      "talkingPoints": [
        "This branch feels like it is under-exposed rather than under-performing.",
        "The opportunity is to put more demand in front of a branch that already looks ready to convert it.",
        "This is exactly where AM support should feel smart and targeted, not generic."
      ],
      "watchout": "Do not turn a focused late-night winner into an all-day promo machine. The point is to scale the strongest use case first."
    }
  },
  {
    "vendorId": 100366,
    "mainChefId": 1154,
    "city": "Riyadh",
    "cuisine": "Groceries",
    "storyTag": "promo_dependent",
    "classification": "High Potential",
    "finalScore": 78.81,
    "summary": "High-potential growth is here, but support is already doing noticeable work. The branch can grow further, though the scaling needs to stay selective.",
    "reason": "good quality but below-median scale in cuisine; strong Ramadan late-night fit; efficient commercial profile",
    "actionHint": "Scale selectively: increase visibility, extend strong dayparts, and support winning SKUs without over-subsidizing.",
    "kpis": {
      "deliveredOrdersRecent": 150,
      "deliveredOrdersPrev": 125,
      "ordersTrendPct": 20,
      "deliveredGmvRecent": 10138.32,
      "deliveredGmvPrev": 8367.09,
      "gmvTrendPct": 21.17,
      "avgOrderValueRecent": 67.59,
      "deliveredRateRecent": 0.9317,
      "declineRateRecent": 0.0435,
      "cancelRateRecent": 0.0248,
      "freeDeliveryRateRecent": 0.2174,
      "subsidyRatioRecent": 0.031,
      "netTakeRatioRecent": 0.1686
    },
    "scores": {
      "growth": 95.49,
      "quality": 83.63,
      "efficiency": 79.4,
      "seasonality": 91.58,
      "benchmark": 40.95
    },
    "benchmarks": {
      "ordersPercentile": 57.89,
      "gmvPercentile": 22.11,
      "aovPercentile": 8.42,
      "qualityPercentile": 92.63,
      "efficiencyPercentile": 1.05
    },
    "copilot": {
      "performanceSummary": "Poke Bowl Co. branch 100366 is high potential, with orders up 20.0% and GMV up 21.2%, while quality remains healthy. The nuance is that free delivery and subsidy are already fairly active, so the next AM move should be to sharpen the support mix rather than simply adding more of it.",
      "likelyCauses": [
        "The branch has enough quality to justify more traffic.",
        "Some of the current momentum is likely support-assisted, not purely organic.",
        "Because operational quality is healthy, the main AM question is efficiency of growth, not whether growth exists."
      ],
      "actions": [
        "Propose a targeted growth plan focused on the support tactics that are actually producing incremental demand.",
        "Audit which offers or windows are worth keeping, then reduce the rest.",
        "Keep the merchant focused on profitable scaling, not just headline volume."
      ],
      "talkingPoints": [
        "This branch deserves more growth, but it deserves better-shaped growth more than bigger blanket support.",
        "Our job here is to keep the upside while improving the quality of the growth engine.",
        "The best AM move is selective acceleration, not automatic expansion."
      ],
      "watchout": "If support intensity climbs without discipline, a high-potential branch can quietly become a dependency story."
    }
  },
  {
    "vendorId": 100077,
    "mainChefId": 1031,
    "city": "Jeddah",
    "cuisine": "Groceries",
    "storyTag": "late_night_hero",
    "classification": "High Potential",
    "finalScore": 78.52,
    "summary": "Another strong high-potential branch with healthy quality and room to scale. The signal says visibility can unlock more demand here.",
    "reason": "good quality but below-median scale in cuisine; strong Ramadan late-night fit; efficient commercial profile",
    "actionHint": "Scale selectively: increase visibility, extend strong dayparts, and support winning SKUs without over-subsidizing.",
    "kpis": {
      "deliveredOrdersRecent": 144,
      "deliveredOrdersPrev": 120,
      "ordersTrendPct": 20,
      "deliveredGmvRecent": 14087.53,
      "deliveredGmvPrev": 12082.89,
      "gmvTrendPct": 16.59,
      "avgOrderValueRecent": 97.83,
      "deliveredRateRecent": 0.9114,
      "declineRateRecent": 0.038,
      "cancelRateRecent": 0.0506,
      "freeDeliveryRateRecent": 0.1139,
      "subsidyRatioRecent": 0.0114,
      "netTakeRatioRecent": 0.1699
    },
    "scores": {
      "growth": 89.74,
      "quality": 73.05,
      "efficiency": 91.23,
      "seasonality": 95.79,
      "benchmark": 50.37
    },
    "benchmarks": {
      "ordersPercentile": 54.74,
      "gmvPercentile": 43.16,
      "aovPercentile": 31.58,
      "qualityPercentile": 74.21,
      "efficiencyPercentile": 33.68
    },
    "copilot": {
      "performanceSummary": "Patty Republic branch 100077 is performing like a branch that should be shown more, not rescued. Orders are up 20.0%, GMV is up 16.6%, delivered quality is solid, and support is still relatively controlled. The AM view is that this branch has earned a sharper in-app growth push.",
      "likelyCauses": [
        "The branch already converts demand well enough to justify more exposure.",
        "Its current scale still looks below what the quality profile could support.",
        "Because support is not heavy, incremental visibility has a better chance of translating into real organic lift."
      ],
      "actions": [
        "Recommend in-app marketing around the branch’s best-performing hours and basket-building items.",
        "Use this branch as one of the portfolio’s lead growth stories when speaking with the merchant.",
        "Measure post-visibility quality closely so scaling remains controlled."
      ],
      "talkingPoints": [
        "This branch looks more hidden than broken.",
        "The merchant does not need a rescue story here, they need a confidence story backed by evidence.",
        "If we place demand more intelligently, this branch should be able to absorb it."
      ],
      "watchout": "Avoid broad spend without a sharp placement strategy. The opportunity is in precision, not volume alone."
    }
  },
  {
    "vendorId": 100466,
    "mainChefId": 1195,
    "city": "Riyadh",
    "cuisine": "Fast Food",
    "storyTag": "free_delivery_dependent",
    "classification": "High Potential",
    "finalScore": 69.66,
    "summary": "The branch has upside, but too much of the current demand story depends on free delivery. It needs a better balance between support and organic pull.",
    "reason": "good quality but below-median scale in cuisine; strong basket size vs cuisine peers; strong Ramadan late-night fit",
    "actionHint": "Scale selectively: increase visibility, extend strong dayparts, and support winning SKUs without over-subsidizing.",
    "kpis": {
      "deliveredOrdersRecent": 281,
      "deliveredOrdersPrev": 265,
      "ordersTrendPct": 6.04,
      "deliveredGmvRecent": 17180.02,
      "deliveredGmvPrev": 16106.52,
      "gmvTrendPct": 6.67,
      "avgOrderValueRecent": 61.14,
      "deliveredRateRecent": 0.9123,
      "declineRateRecent": 0.0455,
      "cancelRateRecent": 0.0422,
      "freeDeliveryRateRecent": 0.3084,
      "subsidyRatioRecent": 0.0422,
      "netTakeRatioRecent": 0.166
    },
    "scores": {
      "growth": 64.59,
      "quality": 73.55,
      "efficiency": 70.22,
      "seasonality": 98.2,
      "benchmark": 57.73
    },
    "benchmarks": {
      "ordersPercentile": 46.4,
      "gmvPercentile": 64.86,
      "aovPercentile": 77.48,
      "qualityPercentile": 95.5,
      "efficiencyPercentile": 21.62
    },
    "copilot": {
      "performanceSummary": "The Date Room branch 100466 is high potential, but it is leaning heavily on platform-funded support. Orders and GMV are both growing modestly, quality is decent, yet free delivery participation is above 30% and subsidy is high for this kind of branch. The AM question is not whether the branch can grow, it is whether it can grow more efficiently.",
      "likelyCauses": [
        "Customers are responding, but the branch is relying heavily on free delivery to sustain conversion.",
        "The economics suggest the branch may not be capturing enough organic demand without support.",
        "Because quality is acceptable, this is a commercial-shaping issue more than an operational rescue case."
      ],
      "actions": [
        "Talk to the merchant about reducing dependency by tightening where free delivery is offered, not removing it blindly.",
        "Test which customer segments or time windows still convert without the most expensive support.",
        "Build a growth plan that protects demand while improving support efficiency over time."
      ],
      "talkingPoints": [
        "There is upside here, but we should not confuse supported demand with fully healthy demand.",
        "The branch does not need zero support, it needs smarter support.",
        "A good AM plan here is one that keeps momentum while lowering dependency."
      ],
      "watchout": "Do not cut support too hard, too fast. The goal is to improve the mix, not shock the branch into an avoidable drop."
    }
  },
  {
    "vendorId": 100480,
    "mainChefId": 1202,
    "city": "Jeddah",
    "cuisine": "Groceries",
    "storyTag": "stable_cash_cow",
    "classification": "Needs Attention",
    "finalScore": 65.41,
    "summary": "This branch still has premium value, but momentum is slipping. The job now is to reawaken demand without damaging economics.",
    "reason": "softening recent order trend; softening recent GMV trend",
    "actionHint": "Monitor closely: investigate trend weakness and optimize support before performance deteriorates.",
    "kpis": {
      "deliveredOrdersRecent": 219,
      "deliveredOrdersPrev": 235,
      "ordersTrendPct": -6.81,
      "deliveredGmvRecent": 36521.18,
      "deliveredGmvPrev": 39114.04,
      "gmvTrendPct": -6.63,
      "avgOrderValueRecent": 166.76,
      "deliveredRateRecent": 0.9202,
      "declineRateRecent": 0.0168,
      "cancelRateRecent": 0.063,
      "freeDeliveryRateRecent": 0.1176,
      "subsidyRatioRecent": 0.0072,
      "netTakeRatioRecent": 0.1716
    },
    "scores": {
      "growth": 34.98,
      "quality": 77.63,
      "efficiency": 91.83,
      "seasonality": 45.26,
      "benchmark": 86.05
    },
    "benchmarks": {
      "ordersPercentile": 93.68,
      "gmvPercentile": 94.74,
      "aovPercentile": 88.42,
      "qualityPercentile": 85.26,
      "efficiencyPercentile": 62.11
    },
    "copilot": {
      "performanceSummary": "Cotton Care branch 100480 needs attention because both orders and GMV have softened, even though basket quality and service remain respectable. This is not a broken branch, it is a cooling branch. The AM opportunity is to reintroduce demand intelligently before the slowdown becomes structural.",
      "likelyCauses": [
        "The branch still has a strong proposition, but recent momentum has faded.",
        "Because quality is not collapsing, the softer trend may be a visibility or relevance issue rather than a severe operational issue.",
        "Support usage is still controlled, so the branch has room for selective commercial activation."
      ],
      "actions": [
        "Open a revival conversation with the merchant around targeted reactivation rather than aggressive discounting.",
        "Test light visibility or focused free delivery windows to see where demand still responds.",
        "Use the branch’s strong basket profile as a reason to protect value while rebuilding traffic."
      ],
      "talkingPoints": [
        "This branch feels cooler, not weaker. That matters because the recovery plan should be selective, not desperate.",
        "We still have enough quality and basket strength to work with here.",
        "The goal is to restart momentum without teaching the branch to depend on heavy support."
      ],
      "watchout": "Do not overcorrect with blanket promotions. A premium branch can lose more value than it gains if the fix is too blunt."
    }
  },
  {
    "vendorId": 100465,
    "mainChefId": 1195,
    "city": "Riyadh",
    "cuisine": "Fast Food",
    "storyTag": "free_delivery_dependent",
    "classification": "Needs Attention",
    "finalScore": 65.28,
    "summary": "Demand is still growing, but service quality has slipped enough to put the branch in needs-attention territory. This is a support-efficiency and execution balance problem.",
    "reason": "operational quality below target",
    "actionHint": "Monitor closely: investigate trend weakness and optimize support before performance deteriorates.",
    "kpis": {
      "deliveredOrdersRecent": 300,
      "deliveredOrdersPrev": 265,
      "ordersTrendPct": 13.21,
      "deliveredGmvRecent": 19205.5,
      "deliveredGmvPrev": 16830.91,
      "gmvTrendPct": 14.11,
      "avgOrderValueRecent": 64.02,
      "deliveredRateRecent": 0.8824,
      "declineRateRecent": 0.0382,
      "cancelRateRecent": 0.0794,
      "freeDeliveryRateRecent": 0.2206,
      "subsidyRatioRecent": 0.0287,
      "netTakeRatioRecent": 0.1677
    },
    "scores": {
      "growth": 81.13,
      "quality": 57.91,
      "efficiency": 79.59,
      "seasonality": 23.42,
      "benchmark": 60.92
    },
    "benchmarks": {
      "ordersPercentile": 52.7,
      "gmvPercentile": 72.07,
      "aovPercentile": 85.59,
      "qualityPercentile": 60.36,
      "efficiencyPercentile": 52.25
    },
    "copilot": {
      "performanceSummary": "The Date Room branch 100465 is still growing, with orders up 13.2% and GMV up 14.1%, but the branch is not clean enough to treat as a straightforward growth case. Delivered rate is weaker, cancel rate is elevated, and support usage is already meaningful. The AM move is to keep the upside while reducing fragility.",
      "likelyCauses": [
        "The branch is still attracting demand, but service quality is not holding up as cleanly as it should.",
        "Commercial support is already active, which means some of the growth may be more expensive than it looks.",
        "This is a branch where operational cleanup and support efficiency need to improve together."
      ],
      "actions": [
        "Discuss both reliability and support mix with the merchant instead of treating them as separate conversations.",
        "Look for the branch moments where support is worth preserving and the moments where it is just masking friction.",
        "Only increase growth pressure after delivered quality starts improving."
      ],
      "talkingPoints": [
        "The upside is still there, but it is less durable than the topline numbers suggest.",
        "We need this branch to become cleaner, not just bigger.",
        "Good AM work here means protecting the branch from drifting into a more expensive version of the same problem."
      ],
      "watchout": "Avoid rewarding messy execution with more blanket commercial support. That can hide the problem instead of solving it."
    }
  },
  {
    "vendorId": 100460,
    "mainChefId": 1193,
    "city": "Khobar",
    "cuisine": "Flowers & Gifts",
    "storyTag": "stable_cash_cow",
    "classification": "Needs Attention",
    "finalScore": 63.38,
    "summary": "A high-value branch that has cooled off slightly. The right move is to reactivate demand carefully, because the branch is still worth saving.",
    "reason": "softening recent order trend",
    "actionHint": "Monitor closely: investigate trend weakness and optimize support before performance deteriorates.",
    "kpis": {
      "deliveredOrdersRecent": 137,
      "deliveredOrdersPrev": 140,
      "ordersTrendPct": -2.14,
      "deliveredGmvRecent": 28039.42,
      "deliveredGmvPrev": 27888.15,
      "gmvTrendPct": 0.54,
      "avgOrderValueRecent": 204.67,
      "deliveredRateRecent": 0.8896,
      "declineRateRecent": 0.0455,
      "cancelRateRecent": 0.0649,
      "freeDeliveryRateRecent": 0.0779,
      "subsidyRatioRecent": 0.0033,
      "netTakeRatioRecent": 0.1713
    },
    "scores": {
      "growth": 49.57,
      "quality": 61.7,
      "efficiency": 94.15,
      "seasonality": 38.3,
      "benchmark": 75.64
    },
    "benchmarks": {
      "ordersPercentile": 76.6,
      "gmvPercentile": 87.23,
      "aovPercentile": 74.47,
      "qualityPercentile": 44.68,
      "efficiencyPercentile": 85.11
    },
    "copilot": {
      "performanceSummary": "Lazurde Gifts branch 100460 needs attention because orders have softened and GMV is nearly flat, even though basket value remains excellent. This is the kind of branch AMs should not abandon, because a small recovery in demand can unlock meaningful value. The question is how to reignite it without eroding a premium position.",
      "likelyCauses": [
        "The branch still has a strong value profile thanks to its very high basket size.",
        "The recent softness suggests weaker visibility or customer pull, not necessarily a broken operating model.",
        "Because support usage is low, there is room to test commercial reactivation without looking overly dependent."
      ],
      "actions": [
        "Use a focused free-delivery or visibility test to see which demand pockets can be revived efficiently.",
        "Frame the merchant conversation around reactivation, not rescue, because the branch still has premium value.",
        "Measure whether small support changes revive order volume without damaging economics."
      ],
      "talkingPoints": [
        "This branch is too valuable to ignore just because it has cooled off.",
        "A small improvement here can matter more than a big improvement on a low-basket branch.",
        "The AM job is to wake the branch up, not discount it into a different identity."
      ],
      "watchout": "Do not assume softness means weakness. This branch may need a nudge, not a full commercial overhaul."
    }
  },
  {
    "vendorId": 100479,
    "mainChefId": 1202,
    "city": "Jeddah",
    "cuisine": "Groceries",
    "storyTag": "stable_cash_cow",
    "classification": "Needs Attention",
    "finalScore": 63.05,
    "summary": "This branch has slipped far enough that it needs attention, but the fundamentals are not broken. It is a measured reactivation case.",
    "reason": "softening recent order trend; softening recent GMV trend",
    "actionHint": "Monitor closely: investigate trend weakness and optimize support before performance deteriorates.",
    "kpis": {
      "deliveredOrdersRecent": 223,
      "deliveredOrdersPrev": 254,
      "ordersTrendPct": -12.2,
      "deliveredGmvRecent": 38488.21,
      "deliveredGmvPrev": 42707.65,
      "gmvTrendPct": -9.88,
      "avgOrderValueRecent": 172.59,
      "deliveredRateRecent": 0.9065,
      "declineRateRecent": 0.0285,
      "cancelRateRecent": 0.065,
      "freeDeliveryRateRecent": 0.0894,
      "subsidyRatioRecent": 0.0049,
      "netTakeRatioRecent": 0.1716
    },
    "scores": {
      "growth": 26.48,
      "quality": 70.5,
      "efficiency": 93.53,
      "seasonality": 56.84,
      "benchmark": 88.84
    },
    "benchmarks": {
      "ordersPercentile": 94.74,
      "gmvPercentile": 98.95,
      "aovPercentile": 94.74,
      "qualityPercentile": 66.32,
      "efficiencyPercentile": 86.32
    },
    "copilot": {
      "performanceSummary": "Cotton Care branch 100479 has clearly softened, with orders down 12.2% and GMV down 9.9%, yet delivery quality and basket value are still respectable. That makes this a good example of a branch where AMs should intervene early, before the decline becomes a deeper pattern.",
      "likelyCauses": [
        "The branch has likely lost some customer pull or visibility rather than collapsing operationally.",
        "Because basket value remains strong, recovering volume here is commercially worthwhile.",
        "Low subsidy means the branch still has room for carefully chosen support levers."
      ],
      "actions": [
        "Start with a light reactivation package, for example selective free delivery or focused placement, rather than an aggressive discount plan.",
        "Use the merchant conversation to understand what changed recently in traffic, assortment, or relevance.",
        "Monitor whether demand responds to modest support before escalating the commercial ask."
      ],
      "talkingPoints": [
        "This branch is softening, but it is still fixable without overpaying for recovery.",
        "The premium basket gives us a reason to intervene with care instead of panic.",
        "A good AM should spot this kind of slowdown early and turn it before it becomes a real decline."
      ],
      "watchout": "Do not wait too long just because the branch still looks respectable on the surface. Slowdowns are easier to reverse early than late."
    }
  }
]
