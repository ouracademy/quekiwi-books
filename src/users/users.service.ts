import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';

import { Credentials } from 'src/auth/auth.service';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user-input';
import { hash, isHashGenerated } from '../helpers/hash';
import { AlreadyExistException } from './already-exist.exception';

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
    if (await this.users.findOne({ email: input.email })) {
      throw new AlreadyExistException('email');
    }

    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = await hash(input.password);

    return this.users.save(user).catch(error => {
      if (
        error.message.startsWith(
          'duplicate key value violates unique constraint'
        )
      ) {
        const [key, value] = error.detail.match(/(?<=\().+?(?=\))/g);
        throw new BadRequestException(`El ${key} ${value} ya existe`);
      } else {
        throw new Error('A error');
      }
    });
  }
}
