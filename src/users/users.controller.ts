import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './create-user-input';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() input: CreateUserInput) {
    return this.users.create(input);
  }
}
