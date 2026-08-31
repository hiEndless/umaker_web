# UMAKER Logo Design

## 目标

UMAKER logo 应表达：

```text
Market Intelligence Core
```

它应该像一套量化研究基础设施的标识，而不是 AI 工具、Web3 游戏、交易机器人或币圈项目的图标。

Logo 的任务：

1. 在官网导航、报告封面、社媒头像和 favicon 中保持清晰。
2. 暗示 signal、node、structure 或 intelligence layer。
3. 与 deep black canvas、emerald signal、quant terminal 的品牌系统一致。
4. 在单色、反白、小尺寸和低对比环境下仍可识别。

## 品牌关键词

Logo 应符合：

- Simple
- Geometric
- Technical
- Precise
- Readable
- Scalable
- Systematic
- Instrumental

Logo 不追求可爱、炫酷、奢华、神秘或强投机感。

## 可用隐喻

推荐从以下隐喻中选 1 到 2 个组合，不要全部堆叠：

### Signal

表达系统正在捕捉和输出信号。

可视元素：

- 点
- 短线
- 脉冲
- 同心环
- 方向性细线

### Structure

表达市场数据被组织成结构。

可视元素：

- 节点
- 边
- 拓扑
- 网格
- 折线结构

### Intelligence Layer

表达 UMAKER 位于数据与策略之间的中间智能层。

可视元素：

- 两层之间的连接
- 中央节点
- 过滤层
- 聚合层

### Factor

表达从复杂数据中提取少数关键因子。

可视元素：

- 多点聚合到一个焦点
- 一个高亮核心节点
- sparse signal cluster

## 不使用的隐喻

禁止把以下元素作为 logo 主体：

- Crypto coin
- Candlestick
- Bull / bear
- Rocket
- Robot
- AI brain
- Magic sparkle
- Hologram
- Cyberpunk city
- Lightning as hype
- Dollar sign
- Exchange logo
- Trading bot face
- Over-complex chart

K 线、行情图和币种符号会把 UMAKER 拉向普通交易工具或投机产品，不适合作为核心品牌标识。

## Logo 体系

当前建议进入主线的方向是：

```text
Framed Signal Structure
```

它以开放式研究边界承载信号拓扑：外框表达实验边界、系统约束和研究容器，内部节点与连接表达市场结构、因子关系和信号路径。这个方向和 UMAKER 的核心叙事最贴近：

```text
market data -> structure -> factor -> signal
```

对应项目资产与使用规则见：

```text
docs/design/logo_usage_system.md
apps/web/public/assets/brand/
```

正式 logo 至少需要以下形态：

```text
symbol
wordmark
lockup-horizontal
lockup-stacked
favicon
social-avatar
monochrome
reversed
```

### Symbol

独立图形标识，用于 favicon、社媒头像、紧凑导航和图表水印。

要求：

- 16px 可识别基本轮廓。
- 32px 可识别主要结构。
- 64px 可识别完整隐喻。
- 不依赖细碎文本或复杂小节点。

### Wordmark

`UMAKER` 字标。

要求：

- 大写。
- 字间距可轻微放松，但不得过度科幻。
- 不使用过度切割、拉伸或难读的字形。
- 与 Inter / JetBrains Mono 体系协调。

### Lockup

symbol + wordmark 组合。

要求：

- 水平版优先用于官网导航。
- 堆叠版用于报告封面、社媒图和品牌页。
- symbol 与 wordmark 之间距离应基于 symbol 宽度定义，不写死单一像素。

## 色彩版本

必须提供：

```text
primary-on-dark
mono-on-dark
mono-on-light
reversed
single-color
```

### Primary on Dark

用于官网和深色产品界面。

推荐：

```text
Symbol primary stroke/fill: #3B82F6 / #22D3EE
Symbol accent: use the same blue/cyan family; do not add green dots inside the logo.
Wordmark: #F5F7FA
Background: #030712 / #05070B / #0B1018
```

### Ice White / Signal on Dark

用于高级宣传物料、报告封面和极简品牌展示。

推荐：

```text
Symbol base: #CBD5E1 / #F5F7FA
Technology accent: #3B82F6 / #22D3EE
Signal accent: not used inside the logo mark. Keep the logo blue/cyan only.
Wordmark: #F5F7FA
Background: #030712
```

Logo 图形内部不使用绿色点。蓝色/青色承载主要科技氛围，Emerald 只保留给网页交互状态或产品 UI 信号。

### Monochrome

用于打印、压印、低色彩环境和法律/合同文档。

要求：

- 纯黑或纯白仍能识别。
- 不依赖渐变、发光或多色层级。

## 几何规则

推荐：

- 基于几何网格绘制。
- 使用少量节点和线段。
- 线宽稳定，避免过细。
- 转角可以硬朗或轻微圆角，但不做大圆角亲和风。
- 图形整体应可放入正方形安全区。

避免：

- 复杂粒子堆叠。
- 过多小点。
- 依赖 glow 才成立。
- 过度细线导致 favicon 不可用。
- 视觉重心偏移。

## 留白与安全区

Logo 必须定义 clear space。

建议：

```text
clear-space = symbol width * 0.25
```

任何文字、边框、粒子、图表线条和容器边缘不得进入 clear space。

## 最小尺寸

建议验收尺寸：

```text
favicon        16px
small icon     24px
nav symbol     32px
social avatar  128px
report cover   96px+
```

如果 16px 下图形隐喻不可完整表达，至少应保留一个清楚、稳定、可识别的轮廓。

## 文件交付

正式 logo 交付应包含：

```text
docs/design/samples/logo-master-flat.png
docs/design/samples/logo-master-flat-transparent.png
docs/design/brand/core/*
docs/design/brand/icons/*
docs/design/brand/lockups/*
docs/design/brand/social/*
docs/design/brand/marketing/*
docs/design/brand/transparent/*
apps/web/public/favicon-16.png
apps/web/public/favicon-32.png
apps/web/public/favicon-64.png
apps/web/public/apple-touch-icon.png
apps/web/public/logo.png
apps/web/public/logo-horizontal.png
apps/web/public/logo-stacked.png
apps/web/public/og-image.png
```

PNG 要求：

- 网站 favicon 使用 flat PNG，不使用 SVG。
- 必须提供透明背景版本和深色背景版本。
- 小尺寸 favicon 必须从 flat master 裁切后的有效区域导出，不使用带大面积空边的原图直接缩放。
- 带 wordmark 的 lockup 必须提供横版和竖版。

矢量源文件要求：

- 当前项目不维护手写 SVG。
- 如果未来需要矢量源，应由正式设计工具输出，并确保与 flat PNG master 一致。

## 使用场景

### 官网导航

使用 flat horizontal lockup。

要求：

- 高度 28px 到 36px。
- 不使用强 glow。
- 不和 CTA 抢夺注意力。

### Hero

可以使用 flat master 或 flat full lockup。

要求：

- 只作为品牌锚点，不要让 logo 变成巨型装饰。
- 粒子拓扑和 logo 应保持独立，不把 logo 做成复杂粒子图。

### Favicon

只使用 symbol。

要求：

- 16px 仍有清楚轮廓。
- 不使用细碎节点。

### 社媒头像

使用 symbol 或 stacked lockup。

要求：

- 深色背景。
- symbol 居中。
- clear space 充足。
- 不能被裁切成币种头像或交易所图标风格。

### 报告封面

可以使用 stacked lockup。

要求：

- 与标题、日期、报告类型保持明确层级。
- 不使用大面积 emerald 作为封面背景。

## 审核清单

每个 logo 方案必须通过以下检查：

1. 5 秒内是否能读出 UMAKER？
2. 是否像量化市场智能系统，而不是普通 AI / crypto / bot？
3. 是否避免 coin、candlestick、robot、AI brain？
4. 16px、32px、64px 是否仍可识别？
5. 单色版是否成立？
6. 深色和浅色背景是否都可用？
7. 是否不依赖 glow、渐变或粒子特效？
8. symbol 和 wordmark 是否能独立使用？
9. 是否和 `#030712` / `#05070B` / `#0B1018` / `#F5F7FA` / 冷蓝科技氛围 / 稀缺 emerald signal 体系一致？
10. 是否与官网低密度、高级、克制的视觉方向一致？

任一方案如果只能在大尺寸、发光、多色或复杂背景下成立，不进入正式候选。

## 推荐探索方向

### Direction A: Structured Signal

一个中心节点连接 3 到 5 个外部节点，形成简洁拓扑。

适合表达：

```text
data -> structure -> signal
```

风险：

- 容易变成普通 network 图标。
- 节点过多会影响 favicon。

### Direction B: Intelligence Layer

上下两层数据之间有一个中间过滤/聚合层。

适合表达：

```text
market data -> UMAKER -> strategy signal
```

风险：

- 过度抽象时识别度不足。

### Direction C: Factor Focus

分散点汇聚到一个高亮焦点。

适合表达：

```text
complexity -> factor
```

风险：

- 容易依赖粒子效果，需要简化成几何符号。

### Direction D: Monogram U

以 `U` 为基础，把 signal / structure / layer 融入字母。

适合表达：

```text
UMAKER brand ownership
```

风险：

- 处理不好会变成普通科技 U 标。

## 不建议方向

不建议：

- 用币形外轮廓包住 U。
- 用 K 线组成 UMAKER。
- 用机器人头像作为 symbol。
- 用 AI brain 节点作为 symbol。
- 用大面积渐变色做 logo。
- 用过细粒子组成 logo。
- 用过度赛博朋克的切割字体。

## 与设计 skill 的关系

当前 UMAKER design skill 可以用于 logo 方向约束和审核，但正式 logo 设计还需要本文件补足：

- 交付规格
- 尺寸测试
- clear space
- 色彩版本
- 使用场景
- logo 专用禁用项

后续如果创建 `umaker-signal-design` skill，应把本文件压缩为：

```text
references/LOGO_KIT.md
```

并在 logo 设计或审核任务中强制读取。
