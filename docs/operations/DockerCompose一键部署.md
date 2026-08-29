# Docker 一键部署

```bash
docker compose -f docker/docker-compose.yml up --build
```

服务监听 `http://localhost:3000`。

- `GET /health`
- `POST /events`
- `GET /events/:eventId`
