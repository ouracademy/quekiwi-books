import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, Credentials } from './auth.service';
import { CreateUserInput } from '../users/create-user-input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async createToken(@Body() credentials: Credentials): Promise<any> {
    return await this.authService.createToken(credentials);
  }

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() input: CreateUserInput): Promise<any> {
    return this.authService.signup(input);
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    return {
      congratulations: 'This is restricted :)'
    };
  }
}
