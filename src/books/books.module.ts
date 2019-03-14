import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookCopy } from './copy.entity';
import { BookCopiesController } from './copies/copies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCopy])],
  controllers: [BooksController, BookCopiesController],
  providers: [BooksService]
})
export class BooksModule {}
