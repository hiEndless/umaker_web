# 2026-08-20 Agent 工作流（从 DeepSeek Harness 吸收）

## 决策
骨架采用「根 AGENTS 只放站岗规则、细节链到归属文档」：`CLAUDE.md` 指向 `AGENTS.md`；非琐碎改动写 `.agents/notes`；新服务按 `docs/cookbook/新增服务.md`。产品仍是契约 + DDD + Cloudflare/Docker，不采用插件化 harness。

## 原因
Codex 需要短、可执行的约束；完整流程写进单文件会膨胀且重复。

## 放弃
不搬 Cordis、不搬 100% 覆盖、不把运行时校验改成「只信 TypeScript」。

## 验证
`pnpm verify:quick`（含结构守卫新增路径）。

## 兼容
无运行时兼容影响。
