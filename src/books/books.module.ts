import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookCopy } from './copy.entity';
import { CopyController } from './copy/copy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCopy])],
  controllers: [BooksController, CopyController],
  providers: [BooksService]
})
export class BooksModule {}
