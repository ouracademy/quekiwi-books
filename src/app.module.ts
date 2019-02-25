import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, DatabaseModule, AuthModule, UsersModule]
})
export class AppModule {}
