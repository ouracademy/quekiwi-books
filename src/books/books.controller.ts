import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  createParamDecorator
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateUserBook } from './create-book-input';
import { AuthGuard } from '@nestjs/passport';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

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
    return this.books.findByTitle(query.title);
  }

  @Post(':id/copies')
  @UseGuards(AuthGuard('jwt'))
  addBookCopie(@Param('id') bookId, @User() user) {
    return this.books.addBookCopie(bookId, user);
  }
  @Post()
  create(@Body() input: CreateUserBook) {
    return this.books.create(input);
  }
}
