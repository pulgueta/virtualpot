ARG BUN_VERSION=1.3.5

FROM oven/bun:${BUN_VERSION} AS deps

WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN bun install --frozen-lockfile

FROM oven/bun:${BUN_VERSION} AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN bun run build

FROM oven/bun:${BUN_VERSION} AS runner

WORKDIR /app

COPY --from=builder /app/.output /app/.output

CMD ["bun", "run", ".output/server/index.mjs"]
