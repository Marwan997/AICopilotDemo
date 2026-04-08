import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

plt.style.use('ggplot')

orders_path = Path(r'C:\Users\The Ultimate\Desktop\fake_thechefz_orders_500_branches.csv')
health_path = Path(r'C:\Users\The Ultimate\Desktop\fake_thechefz_branch_health_classification.csv')
out_dir = Path(r'C:\Users\The Ultimate\Desktop\thechefz_charts')
out_dir.mkdir(exist_ok=True)

orders = pd.read_csv(orders_path)
health = pd.read_csv(health_path)

branch_orders = orders.groupby('chefid').agg(
    orders=('order_id', 'count'),
    gmv=('total', 'sum'),
    avg_order_value=('total', 'mean'),
    free_delivery_rate=('free_delivery_flag', 'mean')
).reset_index()
merged = health.merge(branch_orders, on='chefid', how='left')

colors = {'At Risk':'#d9534f','Needs Attention':'#f0ad4e','High Potential':'#5bc0de','Healthy':'#5cb85c'}

plt.figure(figsize=(9, 6))
health['classification'].value_counts().plot(kind='bar', color=['#f0ad4e', '#d9534f', '#5bc0de', '#5cb85c'])
plt.title('Branch Classification Distribution')
plt.xlabel('Classification')
plt.ylabel('Number of Branches')
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig(out_dir / '01_classification_distribution.png', dpi=200)
plt.close()

plt.figure(figsize=(9, 6))
orders['city'].value_counts().plot(kind='bar', color='#4e79a7')
plt.title('Orders by City')
plt.xlabel('City')
plt.ylabel('Order Count')
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig(out_dir / '02_orders_by_city.png', dpi=200)
plt.close()

plt.figure(figsize=(10, 6))
orders['cuisine'].value_counts().plot(kind='bar', color='#59a14f')
plt.title('Orders by Cuisine')
plt.xlabel('Cuisine')
plt.ylabel('Order Count')
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig(out_dir / '03_orders_by_cuisine.png', dpi=200)
plt.close()

plt.figure(figsize=(9, 6))
health['final_score'].plot(kind='hist', bins=25, color='#f28e2b', edgecolor='black')
plt.title('Final Score Distribution')
plt.xlabel('Final Score')
plt.ylabel('Branch Count')
plt.tight_layout()
plt.savefig(out_dir / '04_final_score_distribution.png', dpi=200)
plt.close()

plt.figure(figsize=(10, 7))
for cls, grp in health.groupby('classification'):
    plt.scatter(grp['growth_score'], grp['quality_score'], label=cls, alpha=0.75, s=55, c=colors.get(cls, '#333333'))
plt.title('Growth Score vs Quality Score')
plt.xlabel('Growth Score')
plt.ylabel('Quality Score')
plt.legend()
plt.tight_layout()
plt.savefig(out_dir / '05_growth_vs_quality.png', dpi=200)
plt.close()

plt.figure(figsize=(9, 6))
health.groupby('classification')['cancel_rate_recent'].mean().sort_values().plot(kind='bar', color='#e15759')
plt.title('Average Cancel Rate by Classification')
plt.xlabel('Classification')
plt.ylabel('Average Cancel Rate')
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig(out_dir / '06_cancel_rate_by_classification.png', dpi=200)
plt.close()

plt.figure(figsize=(9, 6))
health.groupby('classification')['subsidy_ratio_recent'].mean().sort_values().plot(kind='bar', color='#b07aa1')
plt.title('Average Subsidy Ratio by Classification')
plt.xlabel('Classification')
plt.ylabel('Average Subsidy Ratio')
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig(out_dir / '07_subsidy_ratio_by_classification.png', dpi=200)
plt.close()

plt.figure(figsize=(11, 7))
top_gmv = branch_orders.sort_values('gmv', ascending=False).head(15)
plt.bar(top_gmv['chefid'].astype(str), top_gmv['gmv'], color='#76b7b2')
plt.title('Top 15 Branches by GMV')
plt.xlabel('Branch ID')
plt.ylabel('GMV')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig(out_dir / '08_top_15_branches_by_gmv.png', dpi=200)
plt.close()

plt.figure(figsize=(11, 7))
top_orders = branch_orders.sort_values('orders', ascending=False).head(15)
plt.bar(top_orders['chefid'].astype(str), top_orders['orders'], color='#edc948')
plt.title('Top 15 Branches by Order Volume')
plt.xlabel('Branch ID')
plt.ylabel('Orders')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig(out_dir / '09_top_15_branches_by_orders.png', dpi=200)
plt.close()

plt.figure(figsize=(9, 6))
plt.scatter(health['non_ramadan_night_share'], health['ramadan_night_share'], alpha=0.7, color='#4e79a7')
minv = min(health['non_ramadan_night_share'].min(), health['ramadan_night_share'].min())
maxv = max(health['non_ramadan_night_share'].max(), health['ramadan_night_share'].max())
plt.plot([minv, maxv], [minv, maxv], linestyle='--', color='black')
plt.title('Ramadan Night Share vs Non-Ramadan Night Share')
plt.xlabel('Non-Ramadan Night Share')
plt.ylabel('Ramadan Night Share')
plt.tight_layout()
plt.savefig(out_dir / '10_ramadan_vs_non_ramadan_night_share.png', dpi=200)
plt.close()

story_class = pd.crosstab(health['story_tag'], health['classification'])
story_class = story_class.loc[story_class.sum(axis=1).sort_values(ascending=False).index]
story_class.plot(kind='bar', stacked=True, figsize=(12, 7), colormap='tab20c')
plt.title('Story Tag Mix by Classification')
plt.xlabel('Story Tag')
plt.ylabel('Branch Count')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig(out_dir / '11_story_tag_by_classification.png', dpi=200)
plt.close()

plt.figure(figsize=(10, 7))
for cls, grp in merged.groupby('classification'):
    plt.scatter(grp['gmv'], grp['final_score'], label=cls, alpha=0.75, s=55, c=colors.get(cls, '#333333'))
plt.title('Final Score vs GMV')
plt.xlabel('GMV')
plt.ylabel('Final Score')
plt.legend()
plt.tight_layout()
plt.savefig(out_dir / '12_final_score_vs_gmv.png', dpi=200)
plt.close()

print(f'Charts saved to: {out_dir}')
for p in sorted(out_dir.glob('*.png')):
    print(p.name)
