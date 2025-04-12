# Etapa de build
FROM node:20-alpine AS builder

RUN apk add --no-cache curl bash
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia só arquivos essenciais pro install (melhor cache!)
COPY package.json pnpm-lock.yaml ./

# Instala dependências sem copiar tudo
RUN pnpm install --frozen-lockfile

# Agora copia o resto do código
COPY . .

# Gera Prisma Client
RUN npx prisma generate

# Compila o app
RUN pnpm build

# Etapa final (imagem mais enxuta)
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app .

RUN corepack enable && corepack prepare pnpm@latest --activate

EXPOSE 3000

CMD ["pnpm", "start:prod"]
