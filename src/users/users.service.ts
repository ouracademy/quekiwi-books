import { Injectable, NotFoundException } from '@nestjs/common';

import { Credentials } from 'src/auth/auth.service';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user-input';
import { hash } from '../helpers/hash';

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

    return this.users.save(user);
  }
}
