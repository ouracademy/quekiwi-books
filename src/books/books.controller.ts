import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateUserBook } from './create-book-input';

@Controller('books')
export class BooksController {
  constructor(private books: BooksService) {}

  @Get()
  findAll() {
    return this.books.findAll();
  }

  @Post()
  create(@Body() input: CreateUserBook) {
    return this.books.create(input);
  }
}
