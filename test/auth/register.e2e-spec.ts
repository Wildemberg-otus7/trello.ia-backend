import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('AuthController (Register) - E2E', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  const existingUser = {
    name: 'Will',
    email: 'willTeste@gmail.com',
    password: 'SenhaRepetida123@',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Remove e recria o usuário para o teste de duplicidade
    await prisma.user.deleteMany({ where: { email: existingUser.email } });

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(existingUser)
      .expect(201);

    // Suprime erros do console para não poluir o log do CI
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('deve registrar novo usuário com sucesso', async () => {
    const uniqueEmail = `user${Date.now()}@teste.com`;

    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Novo Usuário',
        email: uniqueEmail,
        password: 'SenhaForte123@',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', uniqueEmail);
        expect(res.body).toHaveProperty('name', 'Novo Usuário');
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('deve falhar ao registrar usuário já existente', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(existingUser)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toBe('E-mail já está em uso');
      });
  });

  it('deve falhar se campos obrigatórios estiverem ausentes', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: '',
        password: '',
      })
      .expect(400);
  });
});
