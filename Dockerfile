# Dockerfile

FROM node:20-alpine

# Instala dependências necessárias para o pnpm funcionar
RUN apk add --no-cache curl bash

# Instala o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cria o diretório do app
WORKDIR /app

# Copia os arquivos
COPY . .

# Instala as dependências
RUN pnpm install

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando padrão para rodar o app em desenvolvimento
CMD ["pnpm", "start:dev"]
