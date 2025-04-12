import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController (Login) - E2E', () => {
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
    // Certifique-se de que esse usuário já existe no banco com essa senha
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wildembergdejesusoliveira@gmail.com', password: 'novaSenha@123@' })
      .expect(201)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe('wildembergdejesusoliveira@gmail.com');
      });
  });
});
