import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBook } from './create-book-input';
import { BookCopy } from './copy.entity';

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

  async findAll(): Promise<Book[]> {
    return await this.repository.find();
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

  async addBookCopie(bookId, user) {
    const book = await this.repository.findOne({ id: bookId });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const bookCopie = new BookCopy();
    bookCopie.book = book;
    bookCopie.user = user;
    return this.bookCopyRepository.save(bookCopie);
  }
  async updateBookCopie(inputBookCopie) {
    const bookCopie = await this.bookCopyRepository.findOne({
      id: inputBookCopie.id
    });
    if (!bookCopie) {
      throw new NotFoundException('Bookcopie not found');
    }
    bookCopie.price = inputBookCopie.price || bookCopie.price;
    bookCopie.quantity = inputBookCopie.quantity || bookCopie.quantity;
    return this.bookCopyRepository.save(bookCopie);
  }

  async findBookCopies(userId): Promise<Book[]> {
    return await this.repository.find();
  }
}
