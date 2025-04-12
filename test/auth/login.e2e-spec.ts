import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController (Login) - E2E', () => {
  let app: INestApplication;

  const validUser = {
    name: 'Will Teste',
    email: 'willTeste@gmail.com',
    password: 'novaSenha@123@',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Garante que o usuário de teste exista no banco
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(validUser)
      .catch(() => {
        // Se o usuário já existir, o erro 409 será ignorado
      });

    // Suprime erros do console para não poluir o log do CI
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve falhar com credenciais inválidas', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'naoexiste@email.com', password: 'senhaErrada' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Usuário ou senha inválidos');
      });
  });

  it('deve logar com sucesso com credenciais válidas', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: validUser.email, password: validUser.password })
      .expect(201)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe(validUser.email);
      });
  });
});
