import { Injectable, NotFoundException } from '@nestjs/common';
import { Credentials } from 'src/auth/auth.service';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  login(credentials: Credentials) {
    const user = this.users.findOne({
      where: { email: credentials.email, password: credentials.password }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findById(id: number) {
    return this.users.findOne(id);
  }
  create(email, password) {
    return this.users.save(new User(email, password));
  }
}
