import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController (Register) - E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(async () => {
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
        expect(res.body).not.toHaveProperty('password'); // sanitizado
      });
  });

  it('deve falhar ao registrar usuário já existente', async () => {
    // email que já existe no banco
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Will',
        email: 'wildembergdejesusoliveira@gmail.com',
        password: 'SenhaRepetida123@',
      })
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
