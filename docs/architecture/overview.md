# 架构说明

- `apps/*`：业务服务（DDD 分层）或前端占位（`public/`）
- `apps/*/src/main.ts`：Node / Docker HTTP 入口
- `apps/*/src/worker.ts`：Cloudflare Workers 入口
- `contracts/*`：跨服务契约真源
- `packages/contracts-ts`：契约 TS 消费侧（生成后提交）
- `packages/cloudflare-adapters`：D1 / KV / R2 / Queue 适配
- `verification/*`：守卫、校验、回放
- `tools/*`：本地与 CI 入口
- `docker/`：Compose 与镜像
- `docs/cookbook/新增服务.md`：从样例复制出新应用
- `.agents/notes/`：非琐碎决策记录

- `apps/web/components/dashboard`：共用工作台展示组件；市场数据/契约仍归原src分层。组件与依赖迁移说明见 `docs/design/dashboard_shell.md`。
