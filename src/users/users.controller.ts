import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

export interface CreateUserInput {
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() input: CreateUserInput) {
    return this.users.create(input.email, input.password);
  }
}
