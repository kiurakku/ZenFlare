FROM node:20-alpine AS base

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY packages/deploy/package.json packages/deploy/package.json

RUN npm install -g pnpm@9 && pnpm install --filter @zenflare/deploy...

COPY packages/deploy packages/deploy

WORKDIR /app/packages/deploy

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

COPY --from=base /app/packages/deploy/dist ./dist
COPY --from=base /app/packages/deploy/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]

