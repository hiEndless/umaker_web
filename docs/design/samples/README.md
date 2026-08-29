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
| `homepage-hero-v2-direction.png` | 官网首页 v2 主方向 | 更低密度、纯黑局部画布、稀疏语义粒子、品牌叙事优先 |
| `scroll-narrative-v2-direction.png` | 首页滚动叙事 v2 | Data -> Structure -> Factor -> Strategy 的分屏滚动解释 |
| `engine-page-v2-direction.png` | Engine 页面 v2 | 中低密度、一个主视觉、少量支持模块、更多呼吸感 |
| `strategy-monitor-v2-direction.png` | Monitor 页面 v2 | 保留 table-first，但减少压迫感，突出 mode/freshness |

## 推荐使用

后续官网实现优先参考 v2 样图：

- `homepage-hero-v2-direction.png`
- `scroll-narrative-v2-direction.png`
- `engine-page-v2-direction.png`
- `strategy-monitor-v2-direction.png`

v1 样图保留为高密度 terminal 和早期探索参考，不作为 Homepage 的主方向。

## 使用边界

- 可以作为视觉方向、布局密度、色彩关系和组件语气参考。
- 不得逐像素复制图中文字、图表和数字。
- 不得把图内收益、Sharpe、Drawdown、策略状态或时间戳当真实数据。
- 后续实现时，真实数据组件必须从契约或明确数据源读取，并显示 mode、period、source、updatedAt 和 freshness。
- v2 样图中的纯黑只代表局部 hero / particle canvas 方向，不要求整站全部使用 `#000000`。

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
