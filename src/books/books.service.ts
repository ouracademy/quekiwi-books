import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BookRepositoryToken')
    private readonly repository: Repository<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.repository.find();
  }
}
