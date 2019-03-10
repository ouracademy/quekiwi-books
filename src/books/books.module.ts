import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookCopie } from './copie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCopie])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
