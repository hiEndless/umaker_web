# Optimus Template Adaptation For UMAKER

## 目标

UMAKER 可以借鉴 Optimus 模板的页面节奏、动效密度和视觉结构，但不能继承它的 SaaS 商业叙事。

本文件用于记录模板模块的处理方式，防止后续开发时误把不适合 UMAKER 当前阶段的内容直接复制进官网。

## 已采用的模板能力

| Optimus 模块 | UMAKER 处理方式 | 当前状态 |
| --- | --- | --- |
| HeroSection | 改造成 UMAKER Hero，保留大首屏、右侧动态主体、语义横幅 | 已接入 |
| AnimatedSphere | 改造成 `MarketSignalSphere`，使用字符化市场结构点阵 | 已接入 |
| Marquee stats | 改造成 `SignalMarquee`，展示市场事实、结构、证据、策略语义，不展示虚构指标 | 已接入 |
| FeaturesSection | 改造成 System Capabilities，展示数据、结构、证据三类能力 | 已接入 |
| HowItWorksSection | 改造成 Process，展示市场事实到策略判断的转换流程 | 已接入 |
| Code window animation | 改造成 `CodeEvidencePanel`，展示 UMAKER 证据/结构流程伪代码 | 已接入 |
| InfrastructureSection | 改造成 Strategy Consumption / Evidence Routing 视觉 | 已接入 |
| MetricsSection | 改造成 Validation Discipline，不展示收益或平台规模数字 | 已接入 |
| CtaSection | 改造成 Private Access | 已接入 |

## 暂不采用的模板模块

以下模块不应直接出现在 UMAKER 当前首页：

| Optimus 模块 | 暂不采用原因 | 后续可替代方向 |
| --- | --- | --- |
| PricingSection | UMAKER 当前不是开放注册 SaaS，不应展示价格套餐 | Private Access / Contact / Qualification |
| TestimonialsSection | 当前没有可公开验证客户证言，直接保留会显得模板化 | Research notes / verified case study |
| IntegrationsSection | 交易所/API 连接容易让用户误解为开放交易机器人 | Evidence sources / supported market data |
| Generic SecuritySection | 安全内容可以做，但不应复制通用企业安全话术 | Data provenance / credential boundary / private dashboard |
| Customer logo strip | 没有公开授权客户 logo 时不展示 | Strategy proof / public research references |
| SaaS growth metrics | 容易形成虚构平台规模或性能暗示 | Provenance labels / freshness / replay evidence |

## 当前首页模块映射

```text
Hero
  -> UMAKER 是什么
  -> 让量化策略看懂市场结构

SignalMarquee
  -> 市场事实 / 结构 / 证据 / 策略

System Capabilities
  -> 分散数据
  -> 市场结构
  -> 证据边界

Process
  -> 市场事实到策略判断
  -> CodeEvidencePanel

Strategy Consumption
  -> 独立策略消费智能
  -> 风险门控与审计快照

Validation Discipline
  -> LIVE / PAPER / BACKTEST / SIMULATED / DEMO / RESEARCH

Private Access
  -> 托管基础设施
  -> 私有看板
  -> 可验证证据
```

## 后续补充规则

后续如果需要补充从 Optimus 延伸出的模块，必须先转换为 UMAKER 语义：

1. `Pricing` 只能转换为 `Private Access` 或服务接入说明。
2. `Testimonials` 只能转换为已授权、可验证的案例研究。
3. `Integrations` 只能转换为数据源或证据来源，不展示 `Connect Exchange / Start Trading`。
4. `Metrics` 必须带有 `LIVE / PAPER / BACKTEST / SIMULATED / DEMO / RESEARCH` 来源标签。
5. 所有动画必须表达市场事实、结构、证据、策略消费或验证状态。
6. 不得引入客户 logo、虚构收益、虚构用户规模或免费试用 CTA。

## 验收口径

首页不应出现以下内容：

```text
Pricing
Testimonials
Start free trial
Create Bot
Deploy Bot
Connect Exchange
Trusted by
Customer logos
Guaranteed profit
AI predicts market
```

可以出现：

```text
Request Access
Private Access
Market facts
Market structure
Evidence reference
Strategy consumption
Validation discipline
Replayable evidence
```
