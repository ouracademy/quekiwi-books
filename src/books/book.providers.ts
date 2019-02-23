import { Connection } from 'typeorm';
import { Book } from './book.entity';

export const bookProviders = [
  {
    provide: 'BookRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Book),
    inject: ['DbConnectionToken']
  }
];
