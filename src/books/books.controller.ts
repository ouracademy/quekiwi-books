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

  @Get('/short-info/:id')
  get(@Param('id') id) {
    return this.books.getShortInfoOf(id);
  }

  @Get('/short-info')
  search(@Query() query: { title: any }) {
    return this.books.findByTitle(query.title);
  }

  @Post(':id/copies')
  @UseGuards(AuthGuard('jwt'))
  addBookCopie(@Param('id') bookId, @User() user) {
    return this.books.addBookCopie(bookId, user);
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
