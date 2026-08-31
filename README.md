# umaker_web

UMAKER 官网与后续产品展示体系的 TypeScript monorepo。当前以前端官网为主，`apps/web` 使用 Next.js App Router 并通过 OpenNext 部署到 Cloudflare Workers，方便后续逐步扩展 GitHub 动态博客、API、公开策略监控、研究页和私有客户系统。

核心目标：

- 业务实现只进入 `apps/*`
- 跨服务契约只进入 `contracts/*`
- TS 类型与 zod 由 `packages/contracts-ts` 生成并提交
- Cloudflare 绑定访问放在 `packages/cloudflare-adapters`
- 契约、文档、验证、回放同步演进
- 新增代码按 DDD 分层落地
- 关键行为可验证、可回放、可守卫、可灰度回滚

## 产品边界

- `apps/web`: UMAKER public website，当前承载 Homepage；后续支持 GitHub 内容源的 SSR 博客，并逐步扩展 Engine、Strategy Detail、Strategy Monitor。
- `apps/api`: 预留的 TS API / Worker 示例，后续有真实数据接口时再扩展。
- `contracts/*`: 公开指标、策略状态、监控数据等跨服务契约的单一真源。
- `docs/design/brand_design.md`: UMAKER 品牌定位、视觉语言、文案边界和禁用表达。
- `docs/design/logo_design.md`: UMAKER logo 隐喻、交付规格、尺寸测试和使用规范。
- `docs/design/website_design.md`: UMAKER 官网信息架构、页面体系、数据真实性和实施顺序。
- `docs/design/umaker_design_system.md`: UMAKER 官网设计系统与前端实施约束。
- `docs/design/umaker_design_skill_adaptation_plan.md`: 基于 Quiet Signal 派生 UMAKER 专属设计 skill 的借鉴修改方案。

不要把 UMAKER 包装成开放 SaaS 或交易机器人。公开网站表达生态关系：Market Data -> Structure -> Factor -> Signal -> Strategy -> Performance。任何 LIVE、收益、Sharpe、回撤等指标必须来自真实数据源；演示、回测、模拟和研究数据必须明确标注。

## 快速开始

```bash
cp .env.example .env
cp apps/api/.dev.vars.example apps/api/.dev.vars
cp apps/web/.dev.vars.example apps/web/.dev.vars
pnpm install
pnpm generate:contracts
pnpm verify:quick
```

Cloudflare 产品 token 字段见 `.env.example`。Worker 运行时密钥见 `apps/api/.dev.vars.example`。

## 运行样例

```bash
# Node / Docker
pnpm --filter @umaker/api start
docker compose -f docker/docker-compose.yml up --build

# Cloudflare Workers（本地 KV 模拟）
pnpm --filter @umaker/api dev:workers

# 前端官网（Next.js，本地开发）
pnpm --filter @umaker/web dev

# 前端官网（Cloudflare Workers SSR 构建）
pnpm --filter @umaker/web build:worker
```

## 新增服务

步骤见 `docs/cookbook/新增服务.md`。Agent 约束见 `AGENTS.md`（`CLAUDE.md` 指向它）。

## 契约变更

修改 `contracts/*` 时必须同步：

1. `docs/contracts/契约索引.md`
2. 对应服务的 `docs/契约说明.md`
3. 对应服务的 `docs/迁移说明.md`
4. `fixtures/*` 或 `verification/*`
5. `docs/operations/compatibility_windows.yaml`
6. `pnpm generate:contracts` 并提交生成物

## 验证入口

```bash
tools/local/verify_quick.sh
tools/ci/verify_all.sh
```

## 完成定义

实现、契约、文档、验证与 `packages/contracts-ts` 同步完成，且 `tools/ci/verify_all.sh` 通过后，才视为完成。
