# Dockerfile

FROM node:20-alpine

# Instala dependências necessárias para o pnpm funcionar
RUN apk add --no-cache curl bash

# Ativa o corepack e instala o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cria o diretório do app
WORKDIR /app

# Copia só os arquivos de dependência primeiro
COPY package.json pnpm-lock.yaml ./

# Instala as dependências com travamento garantido
RUN pnpm install --frozen-lockfile

# Copia o restante da aplicação
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Gera o build do NestJS
RUN pnpm build

# Expõe a porta padrão
EXPOSE 3000

# Aplica migrations e sobe a aplicação (produção real)
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
