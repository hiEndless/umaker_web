# UMAKER Homepage Interaction Design

## 目标

当前阶段只实现 UMAKER 官网首页，不提前展开 Strategy Detail、Strategy Monitor、Research 或 Client Dashboard。

首页的任务不是把所有模块做成传统 SaaS 功能介绍，而是让用户在一次滚动中理解：

```text
市场数据
  -> 市场结构
  -> 可验证证据
  -> 策略可消费信号
  -> 独立策略决策
  -> 回放与证明
```

中文用户优先。英文版本保留品牌感，但中文版本必须先讲清楚“UMAKER 到底做什么”。

## 核心价值表达

UMAKER 的核心价值是：

> 把复杂市场数据，转化为量化策略可用的结构化信号。

更完整的表达：

> UMAKER 实时整理价格、成交量、持仓、清算、资金费率和多周期市场结构，为独立量化策略提供可验证、可回放的市场判断依据。

官网必须避免把 UMAKER 说成：

- AI 自动交易机器人
- AI 炒币助手
- 一键生成赚钱策略
- 开放式自动化交易 SaaS
- 直接预测涨跌并下单的系统

UMAKER 对外应该被理解为：

- 市场事实结构化系统
- 多周期市场状态分析层
- 因子与事件证据生产层
- 独立策略的智能输入层
- 可验证、可回放、可审计的量化基础设施

## Hero 固定文案

### 中文

```text
UMAKER

让量化策略看懂市场结构。

从价格、成交量、持仓、清算和资金费率中提取市场状态，
生成可被策略消费的结构化信号。
```

辅助说明：

```text
UMAKER 不直接替用户下单，也不承诺预测市场。
它负责把市场事实整理成可验证、可回放的判断依据。
```

CTA：

```text
了解系统
申请接入
```

### English

```text
UMAKER

Market structure intelligence for systematic strategies.

UMAKER turns price, volume, open interest, liquidation, funding,
and multi-timeframe structure into strategy-consumable signals.
```

辅助说明：

```text
UMAKER does not place trades or promise market prediction.
It structures market facts into verifiable and replayable evidence.
```

CTA：

```text
Explore System
Request Access
```

## 首页结构

首页采用连续叙事，而不是传统：

```text
Hero
Features
Cards
Pricing
FAQ
```

推荐结构：

```text
01 Hero
02 Data Field
03 Market Structure
04 Evidence Layer
05 Strategy Consumption
06 Validation Discipline
07 Private Access
```

每个模块只表达一个核心问题，并通过滚动动效自然衔接。

## 01 Hero

目标：

让用户 5 秒内明白 UMAKER 是为量化策略服务的市场结构系统。

布局：

```text
左侧：
UMAKER
让量化策略看懂市场结构。
简短说明
CTA

右侧：
稀疏粒子拓扑
```

视觉：

- 背景使用 Graphite Black，不使用大面积纯黑压迫感。
- 粒子数量保持稀疏，表达市场数据节点。
- 不展示完整数据表、Monitor、复杂指标。
- 不在首屏强调 DEMO 指标。

动效：

- 首屏加载时，右侧粒子从低透明度出现。
- 少量节点缓慢聚合。
- 连接线逐步出现，但不形成强烈科技炫光。

移动端：

- 文案优先，粒子图下移。
- 粒子图高度控制在 260px 到 320px。
- CTA 纵向排列或保持两列小按钮。

## 02 Data Field

目标：

解释 UMAKER 的输入不是单一价格，而是多维市场事实。

内容：

```text
价格
成交量
K 线结构
持仓量
资金费率
清算
多空倾向
市场定位
```

页面表达：

```text
分散的数据点，不等于策略可用的判断。
```

动效：

- 从 Hero 延续下来的粒子散布成多个数据簇。
- 滚动进入模块时，每个数据类别依次点亮。
- 点亮后不要一直闪烁，保持安静状态。

布局：

```text
左侧：一句解释
右侧：数据源列表，使用细线和 mono label
底部：轻量说明 Data is fact, not decision
```

移动端：

- 数据类别变成两列紧凑列表。
- 粒子动画降级为静态小型拓扑。

## 03 Market Structure

目标：

说明 UMAKER 先把市场事实整理为结构，而不是直接让 AI 判断。

核心文案：

```text
先形成结构，再谈信号。
```

内容重点：

- 多周期趋势
- 动量
- 波动率
- 流动性
- 持仓倾向
- 市场结构事件
- 大周期方向与小周期执行时机分离

页面表达：

```text
UMAKER 将多维市场事实压缩成可解释的市场状态。
```

动效：

- 上一节的分散数据簇开始对齐。
- 节点聚合成一个稳定结构。
- 页面中出现简化的多周期结构矩阵。
- 当前滚动焦点只高亮一行，例如 `趋势` 或 `流动性`。

布局：

```text
上方：章节标题
中间：多周期结构矩阵
右侧或下方：结构解释短句
```

移动端：

- 矩阵不能横向过宽。
- 使用分组行：

```text
趋势
5m 上行 / 15m 上行 / 1h 震荡

流动性
5m 高 / 15m 高 / 1h 正常
```

不要强迫用户横向滚动读取核心信息。

## 04 Evidence Layer

目标：

解释 UMAKER 输出的是证据层，不是黑盒结论。

核心文案：

```text
方向不是交易许可。
```

这句话应该成为 UMAKER 官网的关键差异化表达。

内容：

- `decision_reference`
- `strategy_uses`
- `market_structure_event`
- `external_factor_refs`
- evidence freshness
- replayable raw evidence

页面表达：

```text
UMAKER 可以判断市场背景，但不会直接替策略决定是否交易。
策略只能消费标准化证据，而不是自然语言结论。
```

动效：

- 市场结构节点中抽取出少量高亮证据点。
- 证据点进入一个清晰边界框，代表 evidence boundary。
- 边界框内部显示 3 到 4 个证据标签：

```text
STRUCTURE
DERIVATIVES
EVENT
REFERENCE
```

布局：

```text
左侧：方向不是交易许可
右侧：Evidence Boundary 可视化
底部：短句解释 AI is controlled synthesis, not execution authority
```

移动端：

- Evidence Boundary 简化为垂直步骤：

```text
Market structure
Evidence reference
Strategy permission
```

## 05 Strategy Consumption

目标：

解释独立策略如何消费 UMAKER 输出，而不是把策略包装成一个单体产品。

核心文案：

```text
策略消费智能，但策略保持独立。
```

内容：

```text
Market Scene
Position Scene
Action Candidates
Risk Gates
Entry Timing
Final Decision
Execution Plan
Audit Snapshot
```

页面表达：

```text
UMAKER 给策略提供结构化判断依据。
真正的交易动作由独立策略在自己的风险门控和执行约束下决定。
```

动效：

- Evidence Boundary 中的证据点向右流入 Strategy Chain。
- Strategy Chain 每一步随滚动依次激活。
- `Risk Gates` 必须作为明显节点出现。
- 最终落到 `Audit Snapshot`，强调可回放。

布局：

```text
横向大屏：
Evidence -> Strategy Chain -> Audit

移动端：
垂直流程
```

避免：

- 六个大卡片平铺
- 夸张策略收益
- 暗示策略自动盈利

## 06 Validation Discipline

目标：

建立信任，说明 UMAKER 的公开数据不会混淆 Demo、回测、模拟和实盘。

核心文案：

```text
可展示的数据，必须说明来源。
```

内容：

```text
LIVE
PAPER
BACKTEST
SIMULATED
DEMO
RESEARCH
```

页面表达：

```text
任何收益、回撤、Sharpe、胜率或仓位信息，都必须标明数据模式、时间周期、更新时间和新鲜度。
```

动效：

- 这一节减少粒子，转为更安静的文字和标签系统。
- 标签依次出现，形成可信边界。
- 使用很少的 teal，只高亮当前选中的状态。

布局：

```text
左侧：Proof discipline 文案
右侧：数据状态标签组
底部：No fabricated live performance
```

移动端：

- 标签使用两列布局。
- 文字短，不做长段落。

## 07 Private Access

目标：

说明当前接入方式是私有托管，而不是开放注册。

核心文案：

```text
私有托管接入，而不是开放交易机器人。
```

内容：

```text
Request Access
Managed Infrastructure
Private Dashboard
Strategy Operation
```

页面表达：

```text
UMAKER 当前通过托管基础设施和私有客户看板提供服务。
官网负责解释系统，客户 Dashboard 负责交易操作。
```

动效：

- 从上一节的 Proof 标签收束成一个简单的 Access boundary。
- CTA 出现时保持克制，不使用强烈发光按钮。

移动端：

- CTA 全宽或上下排列。
- 不展示复杂流程图。

## 滚动交互模型

首页采用“共享拓扑 + 分段解释”的滚动方式。

推荐实现模型：

```text
Sticky Visual Layer
  + Scroll Content Steps
```

大屏：

```text
左侧 sticky 粒子 / 结构 / 证据图
右侧滚动文案模块
```

或：

```text
左侧滚动文案
右侧 sticky visual
```

移动端：

```text
模块内静态视觉
模块下方短文案
```

不要在移动端强制使用复杂 sticky，因为浏览器地址栏、视口高度和触摸滚动容易导致体验不稳定。

## 动效状态设计

每个滚动阶段对应一个明确状态：

| 阶段 | Visual State | 说明 |
| --- | --- | --- |
| Hero | sparse_nodes | 市场事实刚出现 |
| Data Field | data_clusters | 多源数据被识别 |
| Market Structure | structured_graph | 数据聚合成结构 |
| Evidence Layer | evidence_boundary | 结构被提炼为证据 |
| Strategy Consumption | strategy_chain | 证据进入策略链路 |
| Validation | provenance_tags | 数据证明与来源 |
| Access | access_boundary | 私有接入边界 |

动效必须服务于这些状态，不做随机循环。

## 页面节奏

首页整体应该更克制，减少压迫感。

推荐节奏：

```text
Hero：低密度，明确
Data Field：低密度，建立输入范围
Market Structure：中低密度，第一次展示结构
Evidence Layer：低密度，强调关键概念
Strategy Consumption：中密度，展示策略链路
Validation：低密度，建立信任
Access：低密度，收束
```

不要在一个屏幕同时出现：

- 大标题
- 多列指标
- 粒子图
- 因子表格
- 策略模块
- 说明长文

每屏只保留一个主信息。

## 移动端原则

移动端不是桌面版缩小。

移动端优先级：

1. 先读懂标题和一句解释。
2. 再看到简化视觉。
3. 最后看到关键标签或流程。

移动端规则：

- 不使用完整复杂粒子拓扑。
- 不依赖 hover。
- 不使用大面积表格横向滚动作为核心信息。
- 每个 section 的标题控制在两行以内。
- CTA 不与粒子图争抢注意力。
- 内容块之间保留足够垂直呼吸感。

移动端结构：

```text
Hero
  文案
  CTA
  简化拓扑

Data Field
  一句话
  数据源标签

Market Structure
  分组结构状态

Evidence Layer
  方向不是交易许可
  三步证据链

Strategy Consumption
  垂直策略链

Validation
  数据来源标签

Access
  私有接入说明
```

## 实现建议

首页内容应先由数据结构驱动：

```ts
type HomepageStep = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  visualState:
    | "sparse_nodes"
    | "data_clusters"
    | "structured_graph"
    | "evidence_boundary"
    | "strategy_chain"
    | "provenance_tags"
    | "access_boundary";
};
```

组件建议：

```text
Homepage
Hero
ScrollNarrative
NarrativeStep
NarrativeVisual
DataSourceList
MarketStructureMatrix
EvidenceBoundary
StrategyChain
ProvenanceTags
AccessPanel
```

`NarrativeVisual` 根据 `visualState` 切换视觉状态。业务文案、视觉状态和组件解耦，方便中英文复用。

## 技术动效建议

当前 Next.js 首页可以采用：

- CSS transition：处理 Reveal、opacity、轻微 translate。
- IntersectionObserver：控制 section 进入视口后的状态。
- Framer Motion：后续如需要更平滑的滚动状态切换再引入。
- Canvas ParticleTopology：继续作为品牌视觉，不承载真实业务逻辑。

第一版不建议直接上复杂 WebGL 或重型 3D。

## 验收标准

首页改版完成后，应满足：

1. 中文用户 5 秒内能理解 UMAKER 是什么。
2. 首屏不再显得晦涩或像泛 AI 官网。
3. 每个滚动模块只表达一个核心转换关系。
4. 粒子、线条和动画都能解释业务含义。
5. 移动端不依赖复杂表格或 hover。
6. 不出现虚构实盘收益或误导性 LIVE。
7. 不把 UMAKER 包装成交易机器人。
8. 不把独立模块包装成已经完全耦合的单体 SaaS。
