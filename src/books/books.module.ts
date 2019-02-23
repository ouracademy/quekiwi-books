import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { bookProviders } from './book.providers';

@Module({
  controllers: [BooksController],
  providers: [...bookProviders, BooksService]
})
export class BooksModule {}
