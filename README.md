````md
# 🧠 Trello.ia – Backend

Backend da aplicação Trello.ia, desenvolvido com:

- [NestJS](https://nestjs.com/) (v11)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT Auth](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) para testes automatizados

---

## 🚀 Requisitos

- Node.js 20+
- PNPM (`npm install -g pnpm`)
- Docker + Docker Compose

---

## 📦 Instalação

```bash
pnpm install
```
````

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com:

```env
DATABASE_URL="postgresql://postgres:012345678@localhost:5432/trelloia"
```

---

## 🐳 Usando Docker para o banco

```bash
docker compose up -d
```

Para resetar com volume:

```bash
docker compose down -v
docker compose up -d
```

---

## 🛠️ Migrations com Prisma

```bash
pnpm prisma migrate dev --name init
```

Para resetar:

```bash
pnpm prisma migrate reset
```

---

## 🧪 Testes

Rodar todos os testes:

```bash
pnpm test
```

Modo watch:

```bash
pnpm test:watch
```

Coverage:

```bash
pnpm test:cov
```

---

## ▶️ Rodando a aplicação

```bash
pnpm start:dev
```

---

## 📁 Estrutura básica

```
src/
├── auth/      # Módulo de autenticação (JWT, login, registro)
├── users/     # Módulo de usuários
├── prisma/    # Serviço Prisma
└── main.ts    # Bootstrap do NestJS
```

---

## ✅ Em breve

- [ ] CRUD completo de usuários
- [ ] Login com JWT
- [ ] Validação com Guards e Decorators
- [ ] Testes e2e de login/cadastro
- [ ] Documentação com Swagger

---

## 🧠 Autor

Will – [GitHub](https://github.com/seuusuario)

```

---

Se quiser que eu gere ele direto no projeto como arquivo ou já prepare uma versão com badges (build, coverage, etc), só avisar.
```
