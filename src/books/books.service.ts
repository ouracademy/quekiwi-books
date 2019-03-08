import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBook } from './create-book-input';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.repository.find();
  }
  async create(input: CreateUserBook) {
    const book = new Book();
    book.title = input.title;
    book.subtitle = input.subtitle;

    return this.repository.save(book);
  }
}
