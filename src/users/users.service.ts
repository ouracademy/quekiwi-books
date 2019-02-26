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
import { hash } from '../helpers/hash';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  login(credentials: Credentials) {
    const user = this.users.findOne({
      where: { email: credentials.email, password: hash(credentials.password) }
    });

    if (!user) {
      throw new NotFoundException('User not found');
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
    user.password = hash(input.password);
    const errors = await validate(user);
    if (errors.length) {
      throw new UnprocessableEntityException(errors);
    }
    return this.users.save(user);
  }
}
