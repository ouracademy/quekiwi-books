import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private books: BooksService) {}

  @Get()
  findAll() {
    return this.books.findAll();
  }
}
