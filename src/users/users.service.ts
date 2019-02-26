import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { validate } from 'class-validator';

import { Credentials } from 'src/auth/auth.service';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user-input';
import { hash, isHashGenerated } from '../helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  async login(credentials: Credentials) {
    const user = await this.users.findOne({
      where: { email: credentials.email }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordCorrespondToHash = await isHashGenerated(
      credentials.password,
      user.password
    );
    if (!passwordCorrespondToHash) {
      throw new NotFoundException('Credentials are invalid');
    }

    return user;
  }

  findById(id: number) {
    return this.users.findOne(id);
  }

  async create(input: CreateUserInput) {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = await hash(input.password);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log({ errors });
      throw new UnprocessableEntityException(errors);
    }
    return await this.users.save(user);
  }
}
