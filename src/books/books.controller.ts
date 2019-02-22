import { Controller, Get } from '@nestjs/common';
import { Book } from './book';

@Controller('books')
export class BooksController {
  @Get()
  findAll() {
    const noSQLDistilled = new Book();
    noSQLDistilled.id = 1;
    noSQLDistilled.numberOfPages = 120;
    noSQLDistilled.title = 'NoSQL distilled';
    noSQLDistilled.publishDate = new Date(2016, 5, 2);
    return [noSQLDistilled];
  }
}
