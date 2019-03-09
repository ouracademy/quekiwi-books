import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
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

  async autocompleteByTitle(title = ''): Promise<any[]> {
    return this.repository
      .createQueryBuilder()
      .where('LOWER(title) LIKE :title', { title: `%${title.toLowerCase()}%` })
      .getMany()
      .then(books => books.map(book => ({ name: book.title })));
  }
  async findBy(query): Promise<Book[]> {
    return await this.repository.find(query);
  }

  async create(input: CreateUserBook) {
    const book = new Book();
    book.title = input.title;
    book.subtitle = input.subtitle;

    return this.repository.save(book);
  }
}
