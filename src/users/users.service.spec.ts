import { UsersService } from './users.service';
import { User } from './user.entity';
import { isHashGenerated } from '../helpers/hash';
import { Repository } from 'typeorm';
import { AlreadyExistException } from './already-exist.exception';

const mockRepository = {
  save(user: User) {
    return Promise.resolve(user);
  },
  async findOne({ email }) {
    return email === 'qpdiam@gmail.com'
      ? {
          email: 'qpdiam@gmail.com'
        }
      : null;
  }
};

describe('UsersService', () => {
  const service = new UsersService(mockRepository as Repository<User>);

  it('should create user', async () => {
    expect.assertions(1);
    const user = await service.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '123456'
    });
    expect(user.email).toBe('arthur@gmail.com');
  });

  it('should create user with hash password ', async () => {
    expect.assertions(1);

    const user = await service.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '123456'
    });

    const isEqual = await isHashGenerated('123456', user.password);
    expect(isEqual).toBe(true);
  });

  it(`create user with email already registered`, () => {
    expect.assertions(1);
    return service
      .create({
        name: 'diana',
        email: 'qpdiam@gmail.com',
        password: 'aPassword'
      })
      .catch(error => {
        expect(error).toEqual(new AlreadyExistException('email'));
      });
  });
});

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
