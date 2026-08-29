# api

模板服务：同一套领域逻辑，Node/Docker 与 Cloudflare Workers 双入口。

```bash
pnpm --filter @umaker/api start
pnpm --filter @umaker/api dev:workers
```

- Node：内存仓储，`PORT` 默认 3000
- Workers：本地模拟 KV，绑定名 `KV`
