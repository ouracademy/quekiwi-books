import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async createToken(credentials: Credentials) {
    const user = await this.usersService.login(credentials);
    const payload: JwtPayload = { id: user.id };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findById(payload.id);
  }
}
