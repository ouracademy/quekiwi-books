import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { User } from '../users/user.entity';

@Entity()
export class BookCopy {
  @PrimaryColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  price: number;

  @ManyToOne(type => Book, book => book.copies)
  book: Book;

  @ManyToOne(type => User, user => user.copies)
  user: User;
}
