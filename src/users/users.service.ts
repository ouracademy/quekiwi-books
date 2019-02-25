import { Injectable, NotFoundException } from '@nestjs/common';
import { Credentials } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  data = [
    {
      name: 'diana',
      email: 'qpdiam@gmail.com',
      id: '1'
    },
    {
      name: 'arthur',
      email: 'amd11dot4@gmail.com',
      id: '2'
    }
  ];

  login(credentials: Credentials) {
    const user = this.data.find(x => x.email === credentials.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findById(id) {
    return this.data.find(user => user.id === id);
  }
}
