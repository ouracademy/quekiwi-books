import {
  Controller,
  Post,
  UseGuards,
  Param,
  createParamDecorator,
  Put,
  Body,
  Get
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateCopie } from '../create-copie-input';
import { BooksService } from '../books.service';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

@Controller('books/:id/copies')
export class CopyController {
  constructor(private books: BooksService) {}

  // TODO: remove this, just for testing purposes
  @Get()
  something(@Param('id') bookId) {
    return { holas: bookId };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addBookCopie(@Param('id') bookId, @User() user) {
    return this.books.addBookCopie(bookId, user);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updateBookCopie(@Body() input: CreateCopie) {
    return this.books.updateBookCopie(input);
  }
}
