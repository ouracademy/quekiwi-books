import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Credentials, AuthService } from '../src/auth/auth.service';
import { JwtPayload } from '../src/auth/interfaces/jwt-payload.interface';

describe('Auth', () => {
  let app: INestApplication;
  const userTest = { email: 'qpdiam@gmail.com', id: '1' };
  const userService = {
    login: (credentials: Credentials) => {
      if (userTest.email !== credentials.email) {
        throw new NotFoundException('User not found');
      }
      return userTest;
    },

    findById: id => {
      return userTest.id === id ? userTest : null;
    }
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule]
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = module.createNestApplication();
    await app.init();
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
        expect(payload.id).toBe('1');
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
    return authService
      .createToken({
        email: userTest.email,
        password: '12345'
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
