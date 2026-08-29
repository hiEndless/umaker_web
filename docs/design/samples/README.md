# UMAKER Design Samples

这些图片是 UMAKER 官网和品牌方向的概念样图，用于视觉校准和后续实现参考。

所有图内指标、收益、时间和状态均视为 `DEMO` / `CONCEPT`，不得作为真实 LIVE 数据、真实策略收益或线上运行证据使用。

## 样图清单

| 文件 | 用途 | 重点 |
| --- | --- | --- |
| `homepage-hero-direction.png` | 官网首页首屏方向 | 深色量化环境、左侧品牌叙事、右侧 Particle Data Topology、DEMO snapshot |
| `engine-page-direction.png` | Engine 页面方向 | Market State、Multi-timeframe Structure、Factor Universe、Factor Stream |
| `strategy-monitor-direction.png` | Strategy Monitor 方向 | table-first public quant terminal、mode/freshness/provenance |
| `social-card-direction.png` | 宣传物料方向 | 1080x1440 社媒图文、Market -> Structure -> Factor -> Strategy、金融风险边界 |

## 使用边界

- 可以作为视觉方向、布局密度、色彩关系和组件语气参考。
- 不得逐像素复制图中文字、图表和数字。
- 不得把图内收益、Sharpe、Drawdown、策略状态或时间戳当真实数据。
- 后续实现时，真实数据组件必须从契约或明确数据源读取，并显示 mode、period、source、updatedAt 和 freshness。

## 后续实现要求

落地到前端前，先实现：

1. design tokens
2. typography
3. Status
4. Metric
5. DataTable
6. Timestamp
7. Layout
8. ParticleTopology

再实现 Homepage、Engine、Strategy Detail 和 Strategy Monitor。
