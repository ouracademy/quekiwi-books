import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../src/auth/auth.service';
import { JwtPayload } from '../src/auth/jwt-payload';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { hash } from '../src/helpers/hash';
import { useContainer } from 'class-validator';

describe('Auth', () => {
  let app: INestApplication;
  let userTest;
  let userRepository;

  beforeAll(async () => {
    userTest = {
      id: 1,
      email: 'qpdiam@gmail.com',
      password: await hash('123456')
    };

    userRepository = {
      findOne(arg) {
        if (typeof arg === 'object') {
          if (userTest.email === arg.where.email) {
            return userTest;
          }
        }

        const id = +arg;
        return userTest.id === id ? userTest : null;
      }
    };

    const module = await Test.createTestingModule({
      imports: [AuthModule]
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userRepository)
      .compile();

    app = module.createNestApplication();
    await app.init();

    useContainer(app, { fallbackOnErrors: true });
  });

  it(`/POST success login`, () => {
    const jwtService = app.get(JwtService);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'qpdiam@gmail.com', password: '123456' })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('token');
        const token = response.body.token;
        const payload = jwtService.decode(token) as JwtPayload;
        expect(payload.id).toBe(1);
      });
  });

  it(`/POST invalid login`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'qpdian@gmail.com', password: 'lalalala' })
      .expect(404, {
        statusCode: 404,
        error: 'Not Found',
        message: 'User not found'
      });
  });

  it(`/GET data without token authenticated`, () => {
    return request(app.getHttpServer())
      .get('/auth/data')
      .set('Authorization', 'Bearer hola')
      .expect(401);
  });

  it(`/GET data with token authenticated`, () => {
    const authService = app.get(AuthService);

    /// ay era el bug aca

    return authService
      .createToken({
        email: 'qpdiam@gmail.com',
        password: '123456'
      })
      .then(({ token }) =>
        request(app.getHttpServer())
          .get('/auth/data')
          .set('Authorization', `Bearer ${token}`)
          .expect(200, {
            congratulations: 'This is restricted :)'
          })
      );
  });

  afterAll(async () => {
    await app.close();
  });
});
