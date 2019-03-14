import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBook } from './create-book-input';
import { BookCopy } from './copies/copy.entity';
import { CreateCopyInput, UpdateCopyInput } from './copies/copies.controller';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
    @InjectRepository(BookCopy)
    private readonly bookCopyRepository: Repository<BookCopy>
  ) {}

  async getShortInfoOf(id) {
    return await this.repository.findOne(id);
  }

  async autocompleteByTitle(title = ''): Promise<any[]> {
    return this.getBooksByTitle(title).then(books =>
      books.map(book => ({ name: book.title }))
    );
  }

  private getBooksByTitle(title: string) {
    return title
      ? this.repository
          .createQueryBuilder()
          .where('LOWER(title) LIKE :title', {
            title: `%${title.toLowerCase()}%`
          })
          .getMany()
      : Promise.resolve([]);
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.getBooksByTitle(title);
  }

  async create(input: CreateUserBook) {
    const book = new Book();
    book.title = input.title;
    book.subtitle = input.subtitle;

    return this.repository.save(book);
  }

  async addBookCopy(input: CreateCopyInput, user) {
    const book = await this.repository.findOneOrFail({ id: input.bookId });

    const bookCopy = new BookCopy();
    bookCopy.price = input.price;
    bookCopy.quantity = input.quantity;
    bookCopy.book = book;
    bookCopy.user = user;

    return this.bookCopyRepository.save(bookCopy);
  }

  async updateBookCopy(input: UpdateCopyInput, user) {
    const bookCopy = await this.bookCopyRepository.findOneOrFail({
      id: input.id
    });

    bookCopy.price = input.price || bookCopy.price;
    bookCopy.quantity = input.quantity || bookCopy.quantity;

    return this.bookCopyRepository.save(bookCopy);
  }

  async findBookCopies(userId): Promise<Book[]> {
    return await this.repository.find();
  }
}
