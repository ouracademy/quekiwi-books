import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/POST create user`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'nuevo@gmail.com', password: '123456' })
      .expect(201)
      .then(response => {
        const { email } = response.body;
        expect(email).toBe('nuevo@gmail.com');
      });
  });

  it(`/POST create user with email already registered`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'nuevo@gmail.com', password: '123456' })
      .expect(409, {
        statusCode: 409,
        error: 'Conflict',
        message: 'The email already exists'
      });
  });

  it(`/POST incomplete fields for create user`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'qpdian@gmail.com' })
      .expect(400, {
        statusCode: 400,
        error: 'Bad request',
        message: 'The fields are incompletes'
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
