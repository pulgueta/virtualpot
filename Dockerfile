ARG BUN_VERSION=1.3.5

FROM oven/bun:${BUN_VERSION} AS base-deps

WORKDIR /app

COPY package.json bun.lock turbo.json ./

RUN bun install --frozen-lockfile

FROM oven/bun:${BUN_VERSION} AS app-deps

WORKDIR /app

COPY --from=base-deps /app/node_modules /app/node_modules
COPY --from=base-deps /app/bun.lock ./bun.lock
COPY --from=base-deps /app/turbo.json ./turbo.json
COPY --from=base-deps /app/package.json ./package.json
COPY apps/*/package.json ./apps/*/package.json
COPY packages/*/package.json ./packages/*/package.json

RUN bun install --frozen-lockfile

FROM oven/bun:${BUN_VERSION} AS builder

WORKDIR /app

COPY --from=base-deps /app/node_modules /app/node_modules
COPY --from=app-deps /app/apps/*/node_modules ./apps/*/node_modules
COPY --from=app-deps /app/packages/*/node_modules ./packages/*/node_modules

COPY --from=base-deps /app/bun.lock ./bun.lock
COPY --from=base-deps /app/turbo.json ./turbo.json

COPY --from=base-deps /app/package.json ./package.json
COPY --from=app-deps /app/apps/*/package.json ./apps/*/package.json
COPY --from=app-deps /app/packages/*/package.json ./packages/*/package.json

RUN bun run build

FROM oven/bun:${BUN_VERSION} AS runner

WORKDIR /app

COPY --from=builder /app/.output /app/.output

CMD ["bun", "run", ".output/server/index.mjs"]