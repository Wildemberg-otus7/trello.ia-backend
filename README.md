Claro! Aqui está o `README.md` atualizado para o **backend** do Trello.ia, mantendo tudo importante que já havia e incluindo o que você já configurou com sucesso:

---

```md
# Trello.ia – Backend

API REST do projeto **Trello.ia**, um sistema de organização de tarefas estilo Trello com inteligência artificial integrada. Desenvolvido em **NestJS** com foco em escalabilidade, boas práticas e deploy em container.

---

## 🚀 Tecnologias Utilizadas

- **NestJS** 11
- **TypeScript**
- **PostgreSQL** (via Docker)
- **Prisma ORM**
- **JWT** – Autenticação
- **Jest + Supertest** – Testes unitários e E2E
- **ESLint + Prettier**
- **Docker + Docker Compose**
- **.env** – Gerenciamento de variáveis de ambiente

---

## ✅ Funcionalidades já implementadas

- Estrutura inicial completa com NestJS
- Conexão com PostgreSQL usando Prisma
- Modelagem e migrate do modelo **User**
- Ambiente configurado com ESLint, Prettier e Jest
- Testes unitários e E2E funcionando
- Backend rodando via Docker na porta **3001**
- Integração com banco de dados via container Docker (porta **5432**)

---

## 📁 Estrutura de Pastas

```bash
src/
├── auth/               # Módulo de autenticação (em desenvolvimento)
├── users/              # Módulo de usuários
├── prisma/             # Serviço de conexão com Prisma
├── config/             # Módulo global de variáveis de ambiente
├── app.controller.ts   # Endpoint raiz
├── app.module.ts       # Módulo principal
├── app.service.ts      # Serviço raiz
└── main.ts             # Ponto de entrada da aplicação
```

---

## 🐳 Docker

### 🧱 docker-compose.yml (isolado)

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
    container_name: trelloia-backend
    restart: unless-stopped
    ports:
      - "3001:3000"
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:16
    container_name: trelloia-db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 012345678
      POSTGRES_DB: trelloia
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 🧪 Testes

```bash
pnpm test           # Executa testes unitários
pnpm test:e2e       # Executa testes end-to-end
pnpm test:cov       # Gera relatório de cobertura
```

---

## ⚙️ Comandos úteis

```bash
pnpm prisma migrate dev        # Rodar migrations
pnpm prisma generate           # Gerar cliente Prisma
pnpm prisma studio             # Abrir visualizador do banco
pnpm run start:dev             # Iniciar com hot reload
pnpm run build && pnpm start   # Build e iniciar em produção
```

---

## 🌐 Variáveis de ambiente

```env
# .env
DATABASE_URL="postgresql://postgres:012345678@localhost:5432/trelloia"
JWT_SECRET="sua-chave-secreta"
PORT=3000
```

---

## 🧠 Objetivo

Criar uma API sólida que permita ao frontend:

- Cadastrar e autenticar usuários
- Gerenciar boards, listas e tarefas
- Usar IA para sugerir automações e melhorias nas rotinas do usuário

---

## 📄 Licença

Será definida no lançamento oficial do repositório público.

---

Desenvolvido por **Wildemberg de Jesus Oliveira**  
Perfil: [LinkedIn](https://www.linkedin.com/in/wildemberg-de-jesus-oliveira/) – Desenvolvedor Fullstack Pleno
```