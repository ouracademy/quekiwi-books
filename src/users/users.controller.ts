import { Controller, Post, Body } from '@nestjs/common';
import { UsersService, CreateUserInput } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() input: CreateUserInput) {
    return this.users.create(input);
  }
}
