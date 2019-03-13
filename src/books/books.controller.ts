import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  createParamDecorator,
  Put
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateUserBook } from './create-book-input';
import { AuthGuard } from '@nestjs/passport';
import { CreateCopie } from './create-copie-input';

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

  @Get('/autocomplete')
  autocomplete(@Query() query: { title: any }) {
    return this.books.autocompleteByTitle(query.title);
  }

  @Post()
  create(@Body() input: CreateUserBook) {
    return this.books.create(input);
  }

  @Post(':id/copies')
  @UseGuards(AuthGuard('jwt'))
  addBookCopie(@Param('id') bookId, @User() user) {
    return this.books.addBookCopie(bookId, user);
  }

  @Put('copies')
  @UseGuards(AuthGuard('jwt'))
  updateBookCopie(@Body() input: CreateCopie) {
    return this.books.updateBookCopie(input);
  }
}
