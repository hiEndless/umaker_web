# UMAKER Website Design

## 目标

UMAKER 官网负责建立统一的产品世界观，而不是把所有模块包装成一个已经完全耦合的一体化 SaaS。

核心叙事：

```text
Market Data
  -> Market Structure
  -> Factor Discovery
  -> Real-time Signal
  -> Strategy
  -> Validation
  -> Live Performance
```

官网表达的是生态关系，不是技术耦合关系。

## 产品定位

UMAKER 对外定位为：

```text
The Intelligence Layer for Quantitative Trading
```

副标题：

```text
Structure the market. Discover factors. Drive systematic strategies.
```

中文解释：

```text
结构化市场，发现因子，驱动系统化策略。
```

UMAKER 不应被描述为 AI Trading Bot、AI Trading Assistant、一键交易工具或开放式自动炒币 SaaS。

## 信息架构

第一阶段公开网站只做 P0 页面：

```text
/
/engine
/strategies
/strategies/[slug]
/monitor
```

P1 页面：

```text
/research
/factors
/strategies/compare
```

P2 页面：

```text
/backtests
/factor-attribution
/strategy-dependency
/agent-network
```

Private Client Dashboard 不属于公开官网：

```text
app.umaker.*
  /portfolio
  /positions
  /orders
  /pnl
  /risk
  /strategies
```

## 导航

推荐公开导航：

```text
UMAKER

Engine
Strategies
Monitor
Research
Docs

Client Login
```

早期内容不足时可简化为：

```text
UMAKER

Engine
Strategies
Monitor
Docs

Client Login
```

公开 CTA 使用：

- Explore Strategies
- View Live Performance
- Request Access
- Contact UMAKER

不要使用：

- Start Free Trial
- Create Bot
- Deploy Bot
- Connect Binance API
- Connect OKX API

## 首页结构

首页不采用传统 SaaS 结构：

```text
Hero
Features
Pricing
Testimonials
FAQ
```

推荐结构：

```text
01 Hero
02 Scroll Narrative: Data -> Structure
03 Scroll Narrative: Structure -> Factor
04 Scroll Narrative: Factor -> Strategy
05 Minimal System Snapshot
06 Market Intelligence
07 Factor Engine
08 Strategy Ecosystem
09 Strategy Monitor Preview
10 Agent-driven Workflow
11 Request Access
```

首页的目标是在 5 秒内传达：

1. 这是量化系统。
2. 核心是市场智能、结构和因子。
3. 因子最终进入真实策略和表现监控。

## Hero

Hero 主标题：

```text
UMAKER
The Intelligence Layer for Quantitative Trading
```

副标题：

```text
Real-time market intelligence, AI-generated factors, and systematic strategy infrastructure.
```

或：

```text
Structure the market. Discover factors. Drive systematic strategies.
```

Hero 视觉使用 Particle Data Topology，表达：

```text
Data -> Structure -> Factor -> Signal -> Strategy
```

粒子不是装饰背景。粒子必须表达数据节点、结构关系、因子关系、策略依赖或工作流状态。

移动端可以降级为静态拓扑或轻量 Canvas。

### Hero v2 密度

首屏应更简洁：

```text
UMAKER

The Intelligence Layer
for Quantitative Trading

Structure the market.
Discover factors.
Drive systematic strategies.

[Explore Engine] [View Strategies]
```

首屏不展示完整 Monitor、完整 factor table、大量 strategy metrics 或多列 dashboard。只保留：

- 品牌定位
- 一句核心副标题
- 一个稀疏 Particle Data Topology
- 1 到 2 个 CTA
- 很小的 demo / data provenance 提示

Hero 可以使用接近纯黑的画布，例如 `#000000` 或 `#030403`，但正文区域不应整站纯黑。页面背景默认使用 `#050706`，保留比纯黑更柔和的阅读环境。

### Scroll Narrative

首页滚动应承担解释产品逻辑的任务：

```text
Frame 01: scattered data nodes
Frame 02: nodes cluster into market structure
Frame 03: selected structure nodes reveal factor signals
Frame 04: factors compose into strategy inputs
Frame 05: strategy outputs are verified in Monitor
```

每一屏只解释一个转换关系。动画是内容表达，不是装饰。`prefers-reduced-motion` 必须提供静态等价图。

## System Snapshot

Hero 下方可以展示极简状态带：

```text
MARKET DATA      LIVE
FACTORS          12,842
STRATEGIES       47
ACTIVE AGENTS    31
SIGNALS          8,421
SYSTEM UPTIME    99.99%
```

所有指标必须明确数据来源和状态：

- LIVE
- PAPER
- BACKTEST
- SIMULATED
- DEMO
- RESEARCH

如果没有真实公开数据，必须标记 `DEMO` 或 `PREVIEW`，不得伪装为 live。

System Snapshot 不应在首页首屏占用过多面积。推荐放在滚动叙事之后，作为系统可信度的过渡，而不是第一视觉主角。

## Engine Page

Engine 页面解释 UMAKER 本体：

```text
Hero
Market Data
Multi-Timeframe Structure
Market State
Factor Engine
Factor Universe
Real-time Factor Stream
Architecture
```

核心视觉链路：

```text
Raw Data
  -> Structured Market Data
  -> Market Structure
  -> Market State
  -> Factor
  -> Signal
```

Engine 页面可展示的数据类型：

- Price
- Volume
- Kline
- Order Flow
- Open Interest
- Funding
- Liquidation
- Long / Short
- Market Positioning
- Technical Indicators

Multi-timeframe 展示必须区分大周期方向判断与小周期执行时机，不得把小周期强弱直接包装成主方向结论。

## Strategy Pages

每个策略使用统一模板：

```text
/strategies/[slug]
```

策略页面像独立量化产品的研究报告，而不是普通 SaaS feature page。

基础结构：

```text
Strategy Hero
Performance Summary
Strategy Philosophy
Strategy Logic
Risk Gates
Current State
Performance
Factor Attribution
Data Provenance
```

可以公开：

- Strategy Philosophy
- Factor Families
- Market Regimes
- Risk Controls
- Performance
- Current State

不应公开：

- 完整源码
- 全部阈值
- 完整因子公式
- 全部交易规则
- 私有执行参数

任何 Return、Sharpe、Drawdown、Win Rate、PnL、Positions 都必须来自真实数据源，且显示模式和更新时间。

## Strategy Monitor

Monitor 定位为：

```text
Public Quant Performance Terminal
```

推荐表格字段：

```text
STRATEGY
MODE
STATUS
RETURN
MAX DD
SHARPE
PERIOD
UPDATED
```

示例：

```text
Alpha 023    LIVE      +32.84%    8.21%    2.31    90D    03:21 UTC
Alpha 047    PAPER     +12.40%    5.10%    1.44    30D    03:18 UTC
Alpha 061    BACKTEST  +41.20%    9.80%    2.02    2026   2026-08-12
```

Monitor 使用 Table + Metrics + Charts。不要使用大型策略卡片墙。

筛选：

- All
- Live
- Paper
- Backtesting
- Research
- Paused

排序：

- Return
- Sharpe
- Drawdown
- Volatility
- Stability
- Updated

## Agent 表达

Agent 是贯穿系统的研究和执行机制，不是独立营销主体。

推荐表达：

```text
Research Agent
  -> Factor Agent
  -> Strategy Agent
  -> Validation Agent
  -> Execution Agent
  -> Monitoring Agent
```

不要把页面做成 Agent 卡片墙，也不要使用机器人头像、AI 大脑或魔法效果。

## 数据真实性

公开页面必须遵守：

1. `LIVE` 必须来自真实实时或准实时数据。
2. stale 数据不得继续显示为 `LIVE`。
3. backtest、paper、demo、research 必须明确标注。
4. 性能指标必须显示 period、source、updatedAt 或等价来源信息。
5. 不得混用实盘收益、回测收益和模拟收益。
6. 不得承诺稳定盈利、无风险收益或 AI 预测市场。

推荐数据模型：

```ts
type PublicMetricMode =
  | "live"
  | "paper"
  | "backtest"
  | "simulated"
  | "demo"
  | "research";

type PublicMetricFreshness =
  | "fresh"
  | "stale"
  | "degraded"
  | "unavailable"
  | "error";

type PublicMetric = {
  label: string;
  value: string | number;
  mode: PublicMetricMode;
  freshness: PublicMetricFreshness;
  period?: string;
  source?: string;
  updatedAt?: string;
};
```

## 页面密度

| 页面 | 密度 | Particle | Charts | Pixel | Marketing |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | Very Low to Low | High | Minimal | Low | High |
| Engine | Low to Medium | Medium | Medium | Medium | Medium |
| Strategy | Medium | Low | High | Low | Low |
| Monitor | High | Minimal | High | Low | Minimal |
| Research | Medium | Low | Medium | Medium | Low |
| Client | Very High | None | High | Minimal | None |

首页和 Engine 不应复制 Monitor 的高密度终端布局。Homepage 是品牌叙事，Engine 是技术解释，Monitor 才是数据终端。

## 第一阶段实现顺序

1. 建立 design tokens 与 primitives。
2. 建立 Status、Metric、DataTable、Timestamp、Section、Layout。
3. 建立 ParticleTopology、MarketState、Factor、Strategy、Monitor 组件。
4. 实现 Homepage。
5. 实现 Engine。
6. 实现 Strategy Detail Template。
7. 实现 Strategy Monitor。

不要第一轮重写整个项目、替换框架、替换 API 或引入大量依赖。
