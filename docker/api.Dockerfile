FROM node:22-bookworm-slim

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY packages/contracts-ts/package.json packages/contracts-ts/
COPY packages/cloudflare-adapters/package.json packages/cloudflare-adapters/

RUN pnpm install --frozen-lockfile

COPY apps/api apps/api
COPY packages packages

RUN pnpm --filter @umaker/contracts-ts build

EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "--filter", "@umaker/api", "start"]
