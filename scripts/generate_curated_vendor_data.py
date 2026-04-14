import json
from pathlib import Path

brand_names = {
    1000: 'KFC',
    1001: 'McDonald\'s',
    1002: 'Burger King',
    1003: 'Hardee\'s',
    1004: 'Domino\'s Pizza',
    1005: 'Pizza Hut',
    1006: 'Papa Johns',
    1007: 'Subway',
    1008: 'Texas Chicken',
    1009: 'Al Baik',
    1010: 'Herfy',
    1011: 'Shawarmer',
    1012: 'Maestro Pizza',
    1013: 'Hamburgini',
    1014: 'Section-B',
    1015: 'Buffalo Wild Wings',
    1016: 'TGI Fridays',
    1017: 'Applebee\'s',
    1018: 'Chili\'s',
    1019: 'Piatto',
    1020: 'Steak House',
    1021: 'Popeyes',
    1022: 'Raising Cane\'s',
    1023: 'Kudu',
    1024: 'Jan Burger',
    1025: 'Burgerizzr',
    1026: 'FireGrill House',
    1027: 'Urban Smash Burger',
    1028: 'Oak Smokehouse',
    1029: 'Golden Bun Co.',
    1030: 'Sizzle Station',
    1031: 'Patty Republic',
    1032: 'Route 66 Burgers',
    1033: 'Crispy Ranch Chicken',
    1034: 'Nashville Heat House',
    1035: 'Cluck & Crunch',
    1036: 'Wingstop',
    1037: 'Wing Zone',
    1038: 'Saucy Bird',
    1039: 'Fire Wings Kitchen',
    1040: 'Pizza Roma',
    1041: 'Crust Society',
    1042: 'Slice District',
    1043: 'Forno Napoli',
    1044: 'Trattoria Uno',
    1045: 'Pasta House',
    1046: 'Il Forno',
    1047: 'Saj & Stone',
    1048: 'Mama Noura',
    1049: 'Operation Falafel',
    1050: 'Shawarma House',
    1051: 'Levant Grill',
    1052: 'Kabsa Nation',
    1053: 'Najd Village Kitchen',
    1054: 'Hijazi Taste',
    1055: 'Mandi Express',
    1056: 'Mandi House',
    1057: 'Bukhari Palace',
    1058: 'Rice Bowl Kitchen',
    1059: 'Grill Corner',
    1060: 'Sultan\'s BBQ',
    1061: 'Butcher\'s Smoke',
    1062: 'Meat Moot',
    1063: 'Brisket Barn',
    1064: 'Texas Roadhouse',
    1065: 'Outback Steakhouse',
    1066: 'The Cheesecake Factory',
    1067: 'PF Chang\'s',
    1068: 'Wagamama',
    1069: 'Noodle Box',
    1070: 'Bao Station',
    1071: 'Sushi Yoshi',
    1072: 'Tokyo House',
    1073: 'Bamboo Roll',
    1074: 'Thai Wok',
    1075: 'Curry Garden',
    1076: 'Biryani Pot',
    1077: 'Tandoor Flame',
    1078: 'Bombay Chowpatty',
    1079: 'Zaatar w Zeit',
    1080: 'Paul',
    1081: 'Bateel Cafe',
    1082: 'Urth Caffe',
    1083: 'Dose Cafe',
    1084: 'Barn\'s',
    1085: 'Half Million',
    1086: 'Dunkin\'',
    1087: 'Starbucks',
    1088: 'Tim Hortons',
    1089: 'Cinnabon',
    1090: 'Krispy Kreme',
    1091: 'Baskin-Robbins',
    1092: 'Cold Stone Creamery',
    1093: 'Dip n Dip',
    1094: 'Patchi',
    1095: 'Saadeddin Pastry',
    1096: 'B.Laban',
    1097: 'Kunafa House',
    1098: 'Anis Sweets',
    1099: 'L\'ETO Caffe',
    1100: 'Magnolia Bakery',
    1101: 'Aani & Dani',
    1102: 'Panda Retail',
    1103: 'Danube',
    1104: 'Tamimi Markets',
    1105: 'Carrefour Market',
    1106: 'Lulu Hypermarket',
    1107: 'Othaim Markets',
    1108: 'Manuel Supermarket',
    1109: 'Nesto Hypermarket',
    1110: 'BinDawood',
    1111: 'Farm Superstores',
    1112: 'Nahdi Pharmacy',
    1113: 'Al-Dawaa Pharmacy',
    1114: 'Whites Pharmacy',
    1115: 'Boots Pharmacy',
    1116: 'Flowera',
    1117: 'Blossom Box',
    1118: 'Floward',
    1119: 'Rose Avenue',
    1120: 'Petal & Stem',
    1121: 'Bloom Basket',
    1122: 'Gifted Moments',
    1123: 'Party Kingdom',
    1124: 'Sweet Surprise',
    1125: 'Babyshop',
    1126: 'Mothercare',
    1127: 'Mamas & Papas',
    1128: 'Toy Town',
    1129: 'Early Learning Centre',
    1130: 'Jarir Bookstore',
    1131: 'Extra',
    1132: 'eXtra Xpress',
    1133: 'Virgin Megastore',
    1134: 'Noon Minutes',
    1135: 'Amazon Now',
    1136: 'Bath & Body Works',
    1137: 'The Body Shop',
    1138: 'Sephora',
    1139: 'Faces',
    1140: 'Nice One',
    1141: 'Golden Scent',
    1142: 'H&M Home Cafe',
    1143: 'IKEA Bistro',
    1144: 'Home Centre Kitchen',
    1145: 'Pottery Barn Cafe',
    1146: 'Fitness Fuel',
    1147: 'Diet Center',
    1148: 'Kcal Extra',
    1149: 'Right Bite',
    1150: 'Calo',
    1151: 'DailyMealz',
    1152: 'FreshHouse Salads',
    1153: 'Protein Kitchen',
    1154: 'Poke Bowl Co.',
    1155: 'Just Salad',
    1156: 'Joe & The Juice',
    1157: 'Jamba',
    1158: 'Boost Juice',
    1159: 'Dr. Cafe',
    1160: 'Brew92',
    1161: 'Camel Step',
    1162: 'Overdose',
    1163: 'Elixir Bunn',
    1164: 'Espresso Lab',
    1165: 'Caffeine Lab',
    1166: 'Baker & Spice',
    1167: 'Bread Ahead',
    1168: 'Paul Le Cafe',
    1169: 'Maison Samira Maatouk',
    1170: 'L\'Osteria',
    1171: 'Catch22',
    1172: 'The Bowl Room',
    1173: 'Wok & Walk',
    1174: 'Burger Boutique',
    1175: 'Smoke Shack',
    1176: 'Firehouse Subs',
    1177: 'Quiznos',
    1178: 'Pret A Manger',
    1179: 'Wrap It',
    1180: 'Tortilla',
    1181: 'Taco Bell',
    1182: 'Baja Fresh',
    1183: 'Moe\'s Southwest Grill',
    1184: 'Chipotle Express',
    1185: 'Shake Shack',
    1186: 'Five Guys',
    1187: 'Black Tap',
    1188: 'Salt',
    1189: 'Karak House',
    1190: 'Chapati & Karak',
    1191: 'Tea Club',
    1192: 'Boba Nation',
    1193: 'Lazurde Gifts',
    1194: 'Misk Boutique',
    1195: 'The Date Room',
    1196: 'Arabian Oud',
    1197: 'Abdul Samad Al Qurashi',
    1198: 'Aseel Accessories',
    1199: 'Scent Corner',
    1200: 'Glow Beauty',
    1201: 'Urban Threads',
    1202: 'Cotton Care',
    1203: 'Shoe District',
    1204: 'Sport Corner',
    1205: 'Green Leaf Nursery',
    1206: 'Pet Zone',
    1207: 'Aqua World',
    1208: 'Book Nook',
    1209: 'Game Station',
}


def brand_name(main_chef_id: int) -> str:
    return brand_names.get(main_chef_id, f'Brand {main_chef_id}')


def branch_label(item: dict) -> str:
    return f"{brand_name(item['main_chef_id'])}, {item['city']} branch {item['vendor_id']}"

src = Path(r'C:\Users\The Ultimate\Desktop\contest\fake_thechefz_vendor_summary_for_ai.json')
out = Path(r'C:\Users\The Ultimate\.openclaw\workspace\src\curatedVendorData.ts')

data = json.loads(src.read_text(encoding='utf-8'))
mapped = []

for item in data:
    classification = item['classification']
    if classification == 'Needs Intervention':
        classification = 'Needs Attention'

    narratives = item.get('narratives', {})
    explanations = item.get('explanations', {})
    kpis = item['kpis']
    scores = item['scores']
    benchmarks = item['benchmarks']

    orders_trend = kpis['orders_trend_pct']
    gmv_trend = kpis['gmv_trend_pct']
    delivered_rate = kpis['delivered_rate_recent']
    cancel_rate = kpis['cancel_rate_recent']
    subsidy_ratio = kpis['subsidy_ratio_recent']
    free_delivery_rate = kpis['free_delivery_rate_recent']

    growth_line = (
        'growth is strong' if orders_trend >= 18 else
        'growth is building steadily' if orders_trend >= 8 else
        'growth is relatively soft'
    )
    support_line = (
        'free delivery participation already looks high' if free_delivery_rate >= 0.16 else
        'free delivery participation still has room to expand'
    )
    exclusivity_line = (
        'the branch looks like a good exclusivity candidate because demand quality is healthy and basket value is attractive'
        if delivered_rate >= 0.92 and kpis['avg_order_value_recent'] >= 95 else
        'exclusivity should be positioned carefully because the branch still needs a sharper commercial case'
    )
    marketing_line = (
        'in-app marketing has a strong case here because the branch has growth headroom'
        if orders_trend >= 10 and subsidy_ratio < 0.02 else
        'paid visibility should be selective until the branch proves stronger incremental demand capture'
    )

    primary_lever = (
        'in-app marketing' if orders_trend >= 15 and subsidy_ratio < 0.02 else
        'exclusive offer' if delivered_rate >= 0.92 and kpis['avg_order_value_recent'] >= 95 else
        'free delivery activation' if free_delivery_rate < 0.14 else
        'targeted growth plan'
    )

    summary = (
        narratives.get('summary')
        or item.get('summary')
        or f"This branch is classified as {classification.lower()}, and the clearest AM opportunity is {primary_lever}."
    )
    performance_summary = narratives.get('performance_summary') or (
        f"{branch_label(item)} is classified as {classification.lower()}. Orders are {orders_trend:.1f}% versus the previous period and GMV is {gmv_trend:.1f}% higher. From an AM perspective, the clearest commercial lever is {primary_lever}."
    )
    likely_causes = narratives.get('likely_causes') or [
        f"Commercially, {growth_line}.",
        f"On support strategy, {support_line}.",
        f"For broader partnership expansion, {exclusivity_line}.",
    ]
    actions = narratives.get('actions') or [
        f"Lead the merchant conversation with {primary_lever} as the main commercial lever for this branch.",
        'Position The Chefz as a growth partner through visibility, customer access, and tailored commercial support.',
        'Benchmark this branch against sister branches before deciding whether to push free delivery, exclusivity, or paid in-app marketing harder.',
    ]
    talking_points = narratives.get('talking_points') or [
        f"{branch_label(item)} should be pitched on {primary_lever} first, not a generic AM package.",
        marketing_line[0].upper() + marketing_line[1:] + '.',
        'The AM objective is to persuade the merchant to adopt the right commercial lever for this branch and portfolio position.',
    ]
    watchout = narratives.get('watchout') or (
        'Do not push every commercial lever at once. The strongest pitch should match the branch’s growth profile, basket strength, and current support intensity.'
    )

    mapped.append({
        'vendorId': item['vendor_id'],
        'mainChefId': item['main_chef_id'],
        'city': item['city'],
        'cuisine': item['cuisine'],
        'storyTag': item['story_tag'],
        'classification': classification,
        'finalScore': item['final_score'],
        'summary': summary,
        'reason': explanations.get('reason', ''),
        'actionHint': explanations.get('action_hint', ''),
        'kpis': {
            'deliveredOrdersRecent': kpis['delivered_orders_recent'],
            'deliveredOrdersPrev': kpis['delivered_orders_prev'],
            'ordersTrendPct': kpis['orders_trend_pct'],
            'deliveredGmvRecent': kpis['delivered_gmv_recent'],
            'deliveredGmvPrev': kpis['delivered_gmv_prev'],
            'gmvTrendPct': kpis['gmv_trend_pct'],
            'avgOrderValueRecent': kpis['avg_order_value_recent'],
            'deliveredRateRecent': kpis['delivered_rate_recent'],
            'declineRateRecent': kpis['decline_rate_recent'],
            'cancelRateRecent': kpis['cancel_rate_recent'],
            'freeDeliveryRateRecent': kpis['free_delivery_rate_recent'],
            'subsidyRatioRecent': kpis['subsidy_ratio_recent'],
            'netTakeRatioRecent': kpis['net_take_ratio_recent'],
        },
        'scores': {
            'growth': scores['growth_score'],
            'quality': scores['quality_score'],
            'efficiency': scores['efficiency_score'],
            'seasonality': scores['seasonality_score'],
            'benchmark': scores['benchmark_score'],
        },
        'benchmarks': {
            'ordersPercentile': benchmarks['cuisine_orders_percentile'],
            'gmvPercentile': benchmarks['cuisine_gmv_percentile'],
            'aovPercentile': benchmarks['cuisine_aov_percentile'],
            'qualityPercentile': benchmarks['cuisine_quality_percentile'],
            'efficiencyPercentile': benchmarks['cuisine_efficiency_percentile'],
        },
        'copilot': {
            'performanceSummary': performance_summary,
            'likelyCauses': likely_causes,
            'actions': actions,
            'talkingPoints': talking_points,
            'watchout': watchout,
        },
    })

content = "import type { VendorCase } from './demoData'\n\nexport const curatedVendorCases: VendorCase[] = " + json.dumps(mapped, ensure_ascii=False, indent=2) + "\n"
out.write_text(content, encoding='utf-8')
print(f'Wrote {len(mapped)} vendors across {len({item["mainChefId"] for item in mapped})} main_chef_id portfolios to {out}')
