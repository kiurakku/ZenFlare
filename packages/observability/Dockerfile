FROM node:20-alpine AS base

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY packages/observability/package.json packages/observability/package.json

RUN npm install -g pnpm@9 && pnpm install --filter @zenflare/observability...

COPY packages/observability packages/observability
COPY src/public src/public
COPY assets/icons assets/icons

WORKDIR /app/packages/observability

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

COPY --from=base /app/packages/observability/dist ./dist
COPY --from=base /app/packages/observability/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/src/public ./public
COPY --from=base /app/assets/icons ./icons

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/index.js"]

