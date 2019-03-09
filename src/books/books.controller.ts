import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateUserBook } from './create-book-input';

@Controller('books')
export class BooksController {
  constructor(private books: BooksService) {}

  @Get()
  findAll() {
    return this.books.findAll();
  }

  @Get('autocomplete')
  autocomplete(@Query() query: { title: any }) {
    return this.books.autocompleteByTitle(query.title);
  }
  @Post('findBy')
  search(@Body() query) {
    return this.books.findBy(query);
  }

  @Post()
  create(@Body() input: CreateUserBook) {
    return this.books.create(input);
  }
}
