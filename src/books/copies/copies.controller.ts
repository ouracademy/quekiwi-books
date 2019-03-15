import {
  Controller,
  Post,
  UseGuards,
  createParamDecorator,
  Body,
  Patch,
  Delete,
  Param
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { BooksService } from '../books.service';
import { IsDefined } from 'class-validator';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

export class CreateCopyInput {
  features: string[];
  quantity: number;
  price: number;
  bookId: number;
}

export class UpdateCopyInput extends CreateCopyInput {
  @IsDefined()
  id: number;
}

@Controller('book-copies')
@UseGuards(AuthGuard('jwt'))
export class BookCopiesController {
  constructor(private books: BooksService) {}

  @Post()
  create(@Body() input: CreateCopyInput, @User() user) {
    return {
      ...input,
      features: [],
      id: new Date().getTime()
    };
    //this.books.addBookCopy(input, user);
  }

  @Patch()
  update(@Body() input: UpdateCopyInput, @User() user) {
    return input;
    //return this.books.updateBookCopy(input, user);
  }

  @Delete(':id')
  delete(@Param('id') id, @User() user) {
    return { id: +id };
  }
}
