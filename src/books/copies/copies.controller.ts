import {
  Controller,
  Post,
  UseGuards,
  Param,
  createParamDecorator,
  Put,
  Body
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateCopyInput } from './create-copy-input';
import { BooksService } from '../books.service';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

@Controller('books-copies')
export class BookCopiesController {
  constructor(private books: BooksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addBookCopie(@Param('id') bookId, @User() user) {
    return this.books.addBookCopie(bookId, user);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updateBookCopie(@Body() input: CreateCopyInput) {
    return this.books.updateBookCopie(input);
  }
}
