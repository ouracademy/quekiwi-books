import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hash, isHashGenerated } from '../helpers/hash';

describe('UsersService', () => {
  let service: UsersService;
  const mockRepository = {
    save: (user: User) => {
      return Promise.resolve(user);
    }
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ]
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async done => {
    const user = await service.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '123456'
    });
    expect(user.email).toBe('arthur@gmail.com');
    done();
  });
  it('should create user with hash password ', async done => {
    const user = await service.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '123456'
    });

    const isEqual = await isHashGenerated('123456', user.password);
    expect(isEqual).toBe(true);
    done();
  });
});

// TODO: unique
// describe('Users', () => {
//   let app: INestApplication;

//   it(`/POST create user with email already registered`, () => {
//     return request(app.getHttpServer())
//       .post('/users')
//       .send({ email: 'nuevo@gmail.com', name: 'nuevo', password: '123456' })
//       .expect(409, {
//         statusCode: 409,
//         error: 'Conflict',
//         message: 'The email already exists'
//       });
//   });
// TODO: move to API testing (can't be done here sad :( )
// it(`/POST incomplete fields for create user`, () => {
//   return request(app.getHttpServer())
//     .post('/users')
//     .send({ email: 'qpdian@gmail.com' })
//     .expect(400, {
//       statusCode: 400,
//       error: 'Bad request',
//       message: 'The fields are incompletes'
//     });
// });
