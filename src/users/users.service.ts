import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOneByEmail(email: string): any {
    throw new Error('Method not implemented.');
  }
  findOneByToken(token: string): any {
    throw new Error('Method not implemented.');
  }
}
