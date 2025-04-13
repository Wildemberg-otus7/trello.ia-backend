# Etapa de build
FROM node:23-alpine AS builder

RUN apk add --no-cache curl bash
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

# Etapa final
FROM node:23-alpine

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas o necessário
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start:prod"]
