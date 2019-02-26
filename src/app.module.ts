import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from './is-unique';

@Module({
  imports: [TypeOrmModule.forRoot(), BooksModule, AuthModule, UsersModule],
  providers: [IsUniqueConstraint]
})
export class AppModule {}
