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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async createToken(@Body() credentials: Credentials): Promise<any> {
    return await this.authService.createToken(credentials);
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    return {
      congratulations: 'This is restricted :)'
    };
  }
}
