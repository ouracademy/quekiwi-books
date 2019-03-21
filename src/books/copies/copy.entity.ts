import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Book } from '../book.entity';
import { User } from '../../users/user.entity';
import { Feature } from '../feature.entity';

@Entity()
export class BookCopy {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  price: number;

  @ManyToMany(type => Feature)
  @JoinTable()
  features: Feature[];

  @ManyToOne(type => Book, book => book.copies)
  book: Book;

  @ManyToOne(type => User, user => user.copies)
  user: User;
}
