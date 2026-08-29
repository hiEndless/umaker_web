# UMAKER Design Skill Adaptation Plan

## 目标

基于 `/Users/lichaoyuan/Downloads/quiet-signal-main` 的 skill 结构与方法论，派生一套 UMAKER 自己的设计 skill，用于：

- 官网设计与审核
- 产品展示页面设计
- 小红书/社媒宣传物料
- 策略研究报告与客户说明材料
- 后续 Client Dashboard 的视觉审查

派生后的 skill 不应继续被称为 Quiet Signal。推荐命名：

```text
umaker-signal-design
umaker-signal-xhs
umaker-signal-reports
```

如果未来要发布为独立 skill 仓库，推荐仓库名：

```text
umaker-signal
```

## 结论

Quiet Signal 适合作为 UMAKER 设计 skill 的方法论母体，但不能原样使用。

可继承：

- 信号优先于装饰
- 层级优先于容器
- 留白必须有作用
- 视觉重量来自内容语义
- 不使用卡片墙、假仪表盘、无意义循环动效
- 媒介 skill 分层：Core Visual Skill + XHS Kit + Report Kit
- 产物验收：渲染、截图、总览图、逐页 QA

必须替换：

- `near-white canvas` -> `dark quant environment`
- `purple signal` -> `emerald / teal brand signal`
- `editorial general interface` -> `quant terminal / financial research interface`
- `generic visual artifact` -> `market intelligence / factor / strategy / monitor / report`

必须新增：

- LIVE / PAPER / BACKTEST / SIMULATED / DEMO / RESEARCH 数据模式
- FRESH / STALE / DEGRADED / UNAVAILABLE / ERROR 数据新鲜度
- 公开收益与策略表现的 provenance 规则
- Particle Data Topology 语义边界
- Pixel Data Visualization 使用边界
- 金融宣传禁语
- 多页面密度矩阵
- Web Kit 对 Homepage、Engine、Strategy、Monitor 的实现约束

## 来源评估

### quiet-signal-design

来源路径：

```text
/Users/lichaoyuan/Downloads/quiet-signal-main/skills/quiet-signal-design
```

可继承内容：

- `SKILL.md` 的 Apply / Audit 双模式。
- `references/SPEC.md` 的规范边界：core skill 只定义视觉身份，不负责内容策略、平台规则或生产流水线。
- Token 治理：Reference Value 与 Core Style Token 分离。
- 审查输出：符合项、违反项、不确定项、最小修正建议。

必须修改内容：

- 颜色系统从浅色/紫色改为深色/emerald。
- 字体系统从偏 editorial display 改为 Inter / Noto Sans SC / JetBrains Mono。
- 图像规则新增真实数据图、策略表现图、行情图和截图 provenance。
- 动效规则新增实时数据、factor stream、particle topology 的语义。

### quiet-signal-xhs

来源路径：

```text
/Users/lichaoyuan/Downloads/quiet-signal-main/skills/quiet-signal-xhs
```

可继承内容：

- 1080 x 1440，3:4 默认规格。
- 先理解内容关系，再分页。
- 标题承担判断而不是章节名。
- 每页必须有明确任务。
- 图片必须有角色。
- 输出可编辑源、逐页 PNG 和总览图。
- 最终像素 QA，不能只看 HTML/CSS。

必须修改内容：

- 小红书内容不应营销“稳赚”“自动交易”“AI 预测”。
- 策略表现图文必须标注数据模式与来源。
- 因子解释类图文必须区分 factor strength、profit、risk、confidence。
- 视觉风格从浅色紫色改为 UMAKER 深色/emerald，也可为小红书保留浅色派生版，但必须记录为媒介 token，不反向污染核心品牌。

### quiet-signal-reports

来源路径：

```text
/Users/lichaoyuan/Downloads/quiet-signal-main/skills/quiet-signal-reports
```

可继承内容：

- HTML/CSS 是可编辑源，PDF 是正式交付，逐页 PNG 和总览图是验收证据。
- 先写完整内容，再排版。
- 区分事实、方法、限制、来源与结论。
- 禁止伪造图表、伪造确定性和内部制作话术。
- A4 PDF 可选文字、无裁切、无溢出。

必须修改内容：

- 报告必须支持量化研究语义：strategy、factor、regime、gate、return、drawdown、Sharpe、sample size。
- 涉及收益、回测、实盘和模拟时，必须强制标注 mode、period、source、updatedAt、freshness。
- 样本不足必须输出 `insufficient_sample` 或等价表述。
- 不得用总体 PnL 或单一 timeframe 得出策略有效/无效结论；需要区分方向判断质量与执行时机质量。

## 推荐 skill 结构

建议在未来独立 skill 仓库中采用：

```text
umaker-signal/
├── README.md
├── LICENSE
├── docs/
│   └── assets/
├── skills/
│   ├── umaker-signal-design/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── references/
│   │       ├── SPEC.md
│   │       ├── WEBSITE_KIT.md
│   │       ├── BRAND_COPY.md
│   │       └── QA_CHECKLIST.md
│   ├── umaker-signal-xhs/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── references/
│   │       ├── SPEC.md
│   │       ├── DEMOS.md
│   │       └── IMPLEMENTATIONS.md
│   └── umaker-signal-reports/
│       ├── SKILL.md
│       ├── agents/
│       │   └── openai.yaml
│       ├── references/
│       │   ├── SPEC.md
│       │   ├── APPROVED.md
│       │   ├── REJECTED.md
│       │   └── IMPLEMENTATIONS.md
│       └── scripts/
│           ├── render_report.mjs
│           └── render_review.py
```

在 `umaker_web` 当前项目内，先不要急着发布 skill。推荐先维护为项目设计规范：

```text
docs/design/
├── brand_design.md
├── website_design.md
├── umaker_design_system.md
└── umaker_design_skill_adaptation_plan.md
```

当官网 P0 页面完成并通过视觉验收后，再把稳定规则抽取为可安装 skill。

## Core Skill 修改方案

### 名称

```yaml
name: umaker-signal-design
description: Apply or audit the UMAKER quantitative intelligence visual language for defined websites, interfaces, posters, social graphics, reports, presentations, and product design artifacts. This skill supplies UMAKER visual identity, data provenance rules, and design QA; it does not invent trading claims, strategy performance, product behavior, or live data.
```

### SKILL.md 推荐内容

保留 Quiet Signal 的 Apply / Audit 双模式，但替换边界：

```text
UMAKER Signal Design is a visual and trust contract for quantitative intelligence products.
It is not a trading strategy generator, performance claim generator, product planner,
backend schema, renderer, runtime, or end-to-end publishing workflow.
```

必须读取：

```text
references/SPEC.md
references/BRAND_COPY.md
references/QA_CHECKLIST.md
```

如果任务是官网或产品页面，还必须读取：

```text
references/WEBSITE_KIT.md
```

Apply 前只确认必要信息：

- 设计对象与目标
- 已锁定内容和不可改事实
- 页面或物料结构
- 输出尺寸、平台和技术限制
- 是否允许使用 demo/backtest/paper/live 数据
- 交付深度

Audit 输出：

- 符合项
- 违反项
- 数据真实性风险
- 金融宣传风险
- 不确定项
- 最小修正建议

### SPEC.md 核心规则

UMAKER Core Visual Specification 应定义：

```text
Quiet Signal x Quant Terminal x Emerald Signal
```

核心原则：

1. Data before decoration.
2. Signal is scarce.
3. Structure creates hierarchy.
4. Particle means relationship.
5. Pixel means data.
6. Animation must represent system state.
7. AI is infrastructure.
8. Live means real.
9. Brand green is not financial positive green.
10. Public performance must carry provenance.

### Core Token 替换

从 Quiet Signal：

```text
color.canvas         #FAFAFA
color.surface        #FFFFFF
color.ink.primary    #0A0A0A
color.signal.primary #7C3AED
```

替换为 UMAKER：

```text
color.canvas                 #080A09
color.surface                #0D1110
color.surface.elevated       #111715
color.ink.primary            #E8ECEA
color.ink.secondary          #9AA39F
color.ink.faint              #68716D
color.line.default           #1B2421
color.line.strong            #2A3732
color.signal.primary         #0D9488
color.signal.strong          #0F766E
color.signal.bright          #34D399
color.semantic.positive      #22C55E
color.semantic.negative      #EF4444
color.semantic.warning       #F59E0B
color.semantic.neutral       #6B7280
```

颜色治理规则：

- `color.signal.*` 表示 UMAKER 品牌、焦点、active、selected、live。
- `color.semantic.positive` 只表示金融正向、成功或 PASS。
- Factor strength、confidence、alignment 不自动使用 positive green。
- 页面不得被 emerald 覆盖；信号色必须稀缺。

### 字体替换

从 Quiet Signal：

```text
Noto Serif SC / Songti SC
Space Grotesk
Noto Sans SC
JetBrains Mono
```

替换为 UMAKER：

```text
type.display.latin     Inter
type.display.cjk       Noto Sans SC
type.body              Inter / Noto Sans SC
type.metadata          JetBrains Mono
type.data              JetBrains Mono
```

UMAKER 不走文学化 editorial serif。品牌应偏技术、系统、研究界面。

### 表面与圆角

继承：

- 层级优先于容器。
- 默认无阴影。
- 大结构保持硬朗。
- 小表面、按钮、输入可以 2px 到 6px 圆角。

修改：

- 背景使用深色量化环境。
- Surface 只用于真实边界、表格、终端、弹层和状态区域。
- 不使用大圆角卡片墙。

### 图像与图表

新增 UMAKER 专用规则：

- 行情图、收益曲线、回撤图、Factor Universe、Strategy Monitor 必须区分真实数据和示意数据。
- 真实图表必须带 mode、period、source、updatedAt 或等价来源。
- 概念图必须标注为 conceptual、demo 或 illustrative。
- 不使用 3D coin、AI brain、robot、cyberpunk city、hologram。

### Motion

继承 Quiet Signal 的动效克制原则。

新增状态语义：

- Data streaming
- New factor
- New signal
- Market state changed
- Strategy activated
- Agent running
- Stale / degraded / unavailable transition

禁止：

- 随机粒子风暴
- hover 到处发光
- 卡片漂浮
- 无意义渐变循环
- 不可解释的背景运动

## Website Kit 修改方案

Quiet Signal core 明确不负责网页断点、页面结构和平台 kit。UMAKER 必须新增 Web Kit。

文件：

```text
skills/umaker-signal-design/references/WEBSITE_KIT.md
```

内容应覆盖：

### 页面体系

```text
/
/engine
/strategies
/strategies/[slug]
/monitor
/research
/docs
```

P0 只实现：

```text
Homepage
Engine
Strategy Detail Template
Strategy Monitor
```

### 首页

结构：

```text
Hero
System Snapshot
What is UMAKER
Market Intelligence
Factor Engine
Strategy Ecosystem
Monitor Preview
Agent Workflow
Request Access
```

限制：

- 不做 pricing。
- 不做 free trial。
- 不展示 Connect Exchange。
- 不展示 Create Bot。
- 不伪造 live metrics。

### Engine

表达：

```text
Raw Data -> Structure -> State -> Factor -> Signal
```

必须突出：

- Multi-timeframe market structure
- Derivatives data
- OI
- Liquidation
- Funding
- Long / Short
- Market positioning
- Real-time factor stream

多周期规则：

- 大周期负责 regime、方向、风险背景、仓位上限。
- 小周期负责入场、加仓、减仓、退出和挂单位置。
- 不得把小周期短线强弱直接升级为主方向结论。

### Strategy Page

统一模板：

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

公开但不泄露：

- 可以展示 philosophy、factor families、regimes、risk controls、performance。
- 不公开完整源码、完整阈值、私有公式和执行参数。

### Monitor

定位：

```text
Public Quant Performance Terminal
```

字段：

```text
STRATEGY
MODE
STATUS
RETURN
MAX DD
SHARPE
PERIOD
UPDATED
FRESHNESS
```

必须用表格、指标和图表，不用大型卡片墙。

### Responsive

Desktop：

- 完整 particle
- 图表
- dense table

Tablet：

- 降低 particle density
- 减少 secondary metrics

Mobile：

- static / lightweight Canvas
- 表格压缩为关键字段
- 保持 terminal 感，不做营销卡片堆叠

## XHS Skill 修改方案

### 名称

```yaml
name: umaker-signal-xhs
description: Turn UMAKER Chinese articles, strategy explanations, factor notes, market intelligence summaries, or user-defined page plans into 1080x1440 Xiaohongshu image-card series using the UMAKER Signal visual language. Preserve data boundaries, source labels, and financial-risk wording.
```

### 继承规则

继承 Quiet Signal XHS：

- 默认 1080 x 1440，3:4。
- 先识别内容关系，再分页。
- 每页一个明确判断。
- 图片必须有角色。
- 输出 editable source、PNG、contact sheet。
- 渲染后逐页 QA。

### 新增 UMAKER 规则

每组图文必须先归类：

```text
brand_explainer
engine_explainer
factor_explainer
strategy_explainer
market_research
performance_report
risk_education
client_access
```

策略或收益相关内容必须显示：

```text
mode
period
source
updatedAt
freshness
sample_size
```

禁止：

- 稳赚
- 保本
- 无风险
- AI 预测市场
- 自动赚钱
- 一键部署赚钱策略
- 混用实盘、模拟和回测收益

推荐页面关系：

- `Market -> Structure -> Factor`
- `Factor -> Signal -> Strategy`
- `Before Gate -> After Gate`
- `Direction Quality vs Execution Timing`
- `Live / Paper / Backtest` 对照
- `Sample Size / Boundary / Risk` 说明

## Report Skill 修改方案

### 名称

```yaml
name: umaker-signal-reports
description: Create, revise, render, or audit UMAKER quantitative research reports, strategy reports, factor reports, and client-facing PDF materials using editable HTML/CSS, source-backed content, explicit evidence boundaries, and full-page rendering QA.
```

### 继承规则

继承 Quiet Signal Reports：

- HTML/CSS 是源。
- PDF 是交付。
- PNG 和总览图是 QA 证据。
- 先写完整内容，再排版。
- 来源账本必须存在。
- 禁止伪造图表和确定性。
- 渲染后检查溢出、裁切、小字、重复线和阅读流。

### 新增 UMAKER 报告类型

```text
strategy_monthly_report
factor_research_report
market_structure_report
gate_analysis_report
return_model_report
backtest_report
client_performance_report
incident_or_replay_report
```

### 报告数据规则

任何策略结论必须包含：

- symbol / universe
- timeframe
- period
- mode
- source
- sample size
- fee / slippage / funding 假设，若适用
- drawdown
- adverse samples
- insufficient_sample 判断

涉及多周期分析必须区分：

- 大周期方向正确但小周期入场差
- 大周期方向错误但小周期信号强
- 大周期震荡但小周期假突破
- 大周期趋势延续且小周期回调入场成功
- 大周期与小周期均无有效优势

涉及 UMaker forecast、market_structure_snapshot、market_structure_event、Coinglass 或衍生品因子，必须说明这些因子服务于：

- 大周期 regime
- 方向确认
- 风险过滤
- 小周期执行时机

## Brand Copy 修改方案

新增文件：

```text
skills/umaker-signal-design/references/BRAND_COPY.md
```

必须包含：

### 推荐定位

```text
UMAKER
The Intelligence Layer for Quantitative Trading
```

```text
Structure the market. Discover factors. Drive systematic strategies.
```

### 推荐表达

```text
Real-time market intelligence for systematic trading.
```

```text
Market data becomes structure. Structure becomes factors. Factors drive strategies.
```

```text
Agent-driven workflows inside a constrained, auditable strategy system.
```

```text
Track strategy performance with explicit data provenance.
```

### 禁止表达

```text
AI Trading Bot
AI 帮你赚钱
稳定盈利
稳赚
保本
无风险收益
AI 预测市场
一键生成赚钱策略
自动炒币
Start Free Trial
Create Bot
Deploy Bot
Connect Exchange
```

### CTA

推荐：

```text
Explore Strategies
View Live Performance
Request Access
Contact UMAKER
```

不推荐：

```text
Start Trading
Create Bot
Start Free Trial
```

## QA Checklist 修改方案

新增文件：

```text
skills/umaker-signal-design/references/QA_CHECKLIST.md
```

### 通用 QA

1. 页面是否看起来像量化研究基础设施，而不是通用 AI/Web3 网站？
2. 是否使用 dark quant surface、emerald signal、mono data、hairline border？
3. emerald 是否稀缺且有语义？
4. 是否存在大圆角卡片墙、玻璃拟态、过度 neon、AI brain、robot 或 3D coin？
5. 层级是否主要由 typography、spacing、alignment、hairline 建立？
6. 动画是否表达数据、状态或关系？
7. reduced-motion 或移动端降级是否可用？

### 数据 QA

1. 所有 performance metric 是否带 mode？
2. `LIVE` 是否有真实来源？
3. stale 数据是否被降级为 `STALE` 或 `DEGRADED`？
4. backtest、paper、demo、research 是否明确标注？
5. 是否混用了实盘、模拟和回测收益？
6. 是否出现收益承诺或暗示无风险？
7. Factor strength 是否被错误表达为 financial positive？

### 官网 QA

1. 首页 5 秒内是否能识别：量化系统、市场智能/因子、策略/表现？
2. Hero 是否不是普通 SaaS dashboard 截图？
3. Particle 是否表达关系，而不是背景装饰？
4. Monitor 是否像 public quant terminal，而不是卡片墙？
5. Client Dashboard 是否没有被包装成公开 SaaS 注册流程？

### 宣传物料 QA

1. 每页是否有明确判断？
2. 是否保留事实、限定条件和来源？
3. 是否有未承担任务的大面积空白？
4. 图表是否真实或明确为概念图？
5. 金融风险和数据模式是否可见？

## 从 Quiet Signal 到 UMAKER Signal 的规则映射

| Quiet Signal 规则 | UMAKER 处理 | 原因 |
| --- | --- | --- |
| 近白表面 | 替换为深色量化背景 | UMAKER 需要 terminal / research infrastructure 气质 |
| 有限紫色 | 替换为有限 emerald / teal | 品牌语义从 AI/editorial 转为 market signal |
| 层级优先于容器 | 继承 | 避免 SaaS 卡片墙 |
| 紫色必须有语义 | 改为 signal color 必须有语义 | 保留稀缺信号原则 |
| 图片必须有角色 | 继承并扩展 | 图表、截图、行情图必须有来源 |
| 禁止假仪表盘 | 强化 | UMAKER 不得伪造 live 或收益 |
| 动效只解释状态 | 继承并扩展 | 粒子、factor stream、agent running 必须有状态含义 |
| Core 不发明 Web Kit | 继承 | UMAKER 单独增加 Website Kit |
| XHS 3:4 生产流程 | 继承并改视觉 | 适合宣传物料 |
| Reports HTML/CSS/PDF QA | 继承并加量化证据 | 适合策略报告和研究报告 |

## 实施路线

### Phase 0：项目内规范固化

当前 `umaker_web` 先维护文档，不立即发布 skill：

- `docs/design/brand_design.md`
- `docs/design/website_design.md`
- `docs/design/umaker_design_system.md`
- `docs/design/umaker_design_skill_adaptation_plan.md`

完成条件：

- P0 官网页面实现前，以上文档作为 Codex 设计约束。
- 每次页面实现都引用这些文档做 QA。

### Phase 1：创建本地 skill 草案

当 Homepage 和 Engine 的设计方向稳定后，创建：

```text
skills/umaker-signal-design/
```

内容包括：

- `SKILL.md`
- `references/SPEC.md`
- `references/WEBSITE_KIT.md`
- `references/BRAND_COPY.md`
- `references/QA_CHECKLIST.md`

完成条件：

- 能用于审核 Homepage 和 Engine。
- 输出能稳定指出 UMAKER 设计违规项。

### Phase 2：创建宣传物料 skill

创建：

```text
skills/umaker-signal-xhs/
```

完成条件：

- 能生成 1080 x 1440 UMAKER 小红书图文。
- 能渲染逐页 PNG 和 contact sheet。
- 能检查文字溢出、来源、风险边界和数据模式。

### Phase 3：创建报告 skill

创建：

```text
skills/umaker-signal-reports/
```

完成条件：

- 能生成 strategy / factor / market structure / gate analysis 报告。
- PDF 可选文字。
- PNG 总览图可验收。
- 来源账本完整。
- 策略结论包含样本数、边界、数据模式和多周期归因。

### Phase 4：抽取为独立仓库

当三个 skill 都能稳定生产结果后，再抽取为：

```text
umaker-signal
```

再考虑是否通过 skill CLI 安装。

## 不建议立即做的事

- 不直接把 `/Users/lichaoyuan/Downloads/quiet-signal-main` 复制进 `umaker_web`。
- 不直接修改原 Quiet Signal 源仓库。
- 不把浅色紫色 token 混入 UMAKER core。
- 不在 skill 中硬编码具体页面截图或固定模板。
- 不先做小红书和报告生产流水线，再反推官网品牌。
- 不把任何 demo performance 当真实 live performance。

## 推荐下一步

下一步应先进入官网前端 Phase 1：

```text
Design Tokens
Typography
Color
Spacing
Button
Status
Metric
Table
Timestamp
Layout
```

在实现 Phase 1 后，用本方案中的 QA Checklist 审核：

- 是否符合 UMAKER Signal 视觉方向
- 是否避免 Quiet Signal 原始浅色/紫色残留
- 是否具备 live/paper/backtest/demo/research 数据状态表达
- 是否为后续 Homepage、Engine、Strategy、Monitor 复用做好基础

