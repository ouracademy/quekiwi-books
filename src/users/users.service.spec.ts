import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

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
});
