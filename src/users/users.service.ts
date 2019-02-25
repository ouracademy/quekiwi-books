import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOneByEmail(email: string): any {
    return {
      name: 'diana',
      email: 'qpdiam@gmail.com'
    };
  }
}
