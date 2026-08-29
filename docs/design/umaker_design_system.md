# UMAKER Design System

## Positioning

Build UMAKER as an AI-native quantitative intelligence product, not a generic SaaS landing page and not a crypto trading bot website.

UMAKER public pages should communicate a coherent ecosystem while preserving module independence:

- UMAKER Market Intelligence Engine
- Factor Generation
- Strategy Factory
- Independent Strategies
- Strategy Monitoring
- Private Client Dashboard
- Agent-driven workflows

The public website explains the relationship between market data, structure, factors, signals, strategies, and performance. It must not claim that all modules are already a fully integrated monolithic product.

## Visual Direction

Use:

- Quiet Signal
- Quant Terminal
- Financial Research Interface
- Scientific Instrument
- Emerald Signal
- Particle Data Topology
- Pixel Data Visualization

Avoid:

- Generic SaaS aesthetics
- Purple AI gradients
- Excessive neon
- Cyberpunk visuals
- Glassmorphism everywhere
- Excessive rounded cards
- AI brain graphics
- Robots
- Crypto coin graphics
- Gaming aesthetics
- Decorative particles without semantic meaning

## Principles

1. Data before decoration.
2. Signal is scarce.
3. Structure creates hierarchy.
4. Animation must represent system meaning.
5. AI is infrastructure, not the visual subject.
6. Live means real.
7. Brand visualization and data visualization must be distinguishable.

## Tokens

```css
:root {
  --color-bg: #080a09;
  --color-surface: #0d1110;
  --color-surface-elevated: #111715;
  --color-border: #1b2421;
  --color-border-strong: #2a3732;
  --color-text-primary: #e8ecea;
  --color-text-secondary: #9aa39f;
  --color-text-tertiary: #68716d;
  --color-text-disabled: #414946;
  --color-brand: #0d9488;
  --color-brand-bright: #34d399;
  --color-positive: #22c55e;
  --color-negative: #ef4444;
  --color-warning: #f59e0b;
  --color-neutral: #6b7280;
}
```

Use Inter for UI, Noto Sans SC for Chinese, and JetBrains Mono for data values, ids, timestamps, factors, strategy ids, and metrics.

Use a 4px spacing unit. Default radius is 4px, with 2px to 6px allowed. Avoid large shadows; prefer hairline borders, typography, alignment, and spacing.

## Data State

All real-time or performance data must carry provenance:

- `LIVE`
- `PAPER`
- `BACKTEST`
- `SIMULATED`
- `DEMO`
- `RESEARCH`

Freshness states are first-class UI states:

- `FRESH`
- `STALE`
- `DEGRADED`
- `UNAVAILABLE`
- `ERROR`

Do not keep showing `LIVE` when the source is stale or unavailable.

## Components

Build reusable primitives before pages:

- Button
- Status
- Metric
- MetricGroup
- DataTable
- Timestamp
- Section
- Container
- Chart primitives

Then add domain components:

- ParticleTopology
- MarketState
- FactorItem
- FactorUniverse
- FactorStream
- StrategyHeader
- StrategyMetrics
- StrategyPerformance
- StrategyMonitor

Separate domain data, view models, UI components, and visualization engines.

## Particle Rules

Particles must represent relationships between market data, market structure, factors, signals, strategies, or agents.

`ParticleTopology` should accept generic nodes and edges:

```ts
type ParticleNode = {
  id: string;
  type: "market" | "structure" | "factor" | "signal" | "strategy" | "agent";
  status: "idle" | "active" | "selected" | "warning" | "blocked" | "completed";
  strength?: number;
};

type ParticleEdge = {
  source: string;
  target: string;
  type: "dependency" | "correlation" | "data_flow" | "causality" | "workflow";
  strength?: number;
};
```

Brand particles may use abstract or illustrative data. Data particles must declare source, update time, and unavailable or stale state.

## Page Density

| Page | Density | Particle | Charts | Pixel | Marketing |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | Low | High | Low | Low | High |
| Engine | Medium | Medium | Medium | Medium | Medium |
| Strategy | Medium | Low | High | Low | Low |
| Monitor | High | Minimal | High | Low | Minimal |
| Research | Medium | Low | Medium | Medium | Low |
| Client | Very High | None | High | Minimal | None |

## Implementation Order

1. Design tokens, typography, color, spacing, Button, Status, Metric, Table, Chart, Layout.
2. ParticleTopology, MarketState, Factor, Strategy, Monitor components.
3. Homepage.
4. Engine.
5. Strategy Detail Template.
6. Strategy Monitor.
7. Research and Client Dashboard only after the public website foundation is stable.

## Prohibited Claims

Do not imply guaranteed profit. Do not use language such as stable income, risk-free, auto-profit, AI predicts price, or one-click trading bot. All performance must be labeled as live, paper, backtest, simulated, demo, or research.
