import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateUserBook } from './create-book-input';

@Controller('books')
export class BooksController {
  constructor(private books: BooksService) {}

  @Get()
  findAll() {
    return this.books.findAll();
  }

  @Get('/short-info/:id')
  get(@Param('id') id) {
    return this.books.getShortInfoOf(id);
  }

  @Get('/short-info')
  search(@Query() query: { title: any }) {
    return this.books.findByTitle(query.title);
  }

  @Get('/autocomplete')
  autocomplete(@Query() query: { title: any }) {
    return this.books.autocompleteByTitle(query.title);
  }

  @Post()
  create(@Body() input: CreateUserBook) {
    return this.books.create(input);
  }
}
