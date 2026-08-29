# AGENTS 约束

根文件只放站岗规则。细节链到唯一归属。Codex / Claude 均读本文件（`CLAUDE.md` 指向此处）。

## 目标
- 长期可维护；契约单一真源；变更可验证、可回放、可守卫
- 新增与重构按 DDD；存量只在触达范围收敛

## 目录边界
- 业务只写 `apps/*`；契约只写 `contracts/*`；生成物提交 `packages/contracts-ts`
- 共享库写 `packages/*`；Cloudflare 绑定只经 `packages/cloudflare-adapters`
- Workers 入口 `apps/*/src/worker.ts`；Node/Docker 入口 `apps/*/src/main.ts`
- 前端占位 `apps/*/public`，不套后端 DDD；历史目录默认只读
- 布局见 `docs/architecture/overview.md`；新服务步骤见 `docs/cookbook/新增服务.md`

## 默认开发流程
1. 确认影响范围（服务与契约路径）
2. 改实现时同步一项验证或守卫；非琐碎改动同 PR 写 `.agents/notes`（见该目录 README）
3. 更新归属文档，一事一处，不复制规则
4. 只跑与改动面匹配的检查；不要默认全量（见下）
5. 守卫失败先修再继续

## 检查范围
- 守卫/契约/lint：`pnpm verify:quick`
- 行为回放、Workers typecheck：`pnpm verify:all`（CI 必跑）
- 清单见 `docs/operations/验证运行手册.md`
- 未改运行时/契约时，不要为了提交再跑一遍已通过的全量

## 契约变更四件套
改 schema、mapping、跨服务字段语义或 required/enum 时必须同时：更新 `docs/contracts/契约索引.md`、服务内契约与迁移说明、`docs/operations/compatibility_windows.yaml`、守卫或 fixture、`pnpm generate:contracts` 并提交生成物。

## 版本与兼容
- breaking 必须升版并给迁移路径
- 新字段先 optional，过完兼容窗口再评估 required
- 枚举/原因码/状态码单点定义，代码与 schema 对齐

## 运行时边界
- Node 编译排除 `src/worker.ts` 与 `src/infrastructure/cloudflare/**`
- Workers 编译排除 `src/main.ts`
- 领域层禁止引用 Cloudflare 或 Node 运行时 API
- typecheck/lint 对着源码；镜像与 Workers 产物对着构建结果，两面不要混用

## TypeScript 约束
- 保持 `tsconfig.base.json` 的 `strict`；禁止 `any`，外部输入用 `unknown` 再收窄
- 导出函数写参数与返回值类型；类型用接口 / alias / 泛型复用
- 领域模型与值对象优先 `readonly`；复杂类型才加 JSDoc
- `pnpm lint`（`eslint.config.mjs`）兜底

## 安全与变更原则
- 禁止输出或记录密钥；token 只写 `.env` / `.dev.vars`，仓库只提交 `*.example`
- 最小改动；未获批准不新增外部依赖

## DDD 分层
新增代码必须遵守；存量只在本次触达范围收敛。

1. `src/api`：协议、鉴权上下文、校验、响应映射；不放核心规则，不编排多仓储事务
2. `src/application`：用例、事务、幂等、顺序；只依赖领域与仓储接口
3. `src/domain`：规则、实体、值对象、领域服务；规则单点，禁止跨层重复
4. `src/infrastructure`：DB/缓存/消息/第三方；不反向依赖 api

## 渐进迁移
- 临时兼容路径必须在迁移文档写清窗口与下线条件
- 禁止把业务规则继续堆进通用 common/utility

## PR 必填
领域归属、分层说明、契约影响（是否改 `contracts/*`）、验证证据、兼容计划。模板：`.github/pull_request_template.md`

## 发布与回滚
- 关键链路至少有成功率、延迟、积压/活跃量之一
- 行为切换必须有开关或回滚路径；灰度期守卫失败先回滚或修复
- 手册：`docs/operations/`
