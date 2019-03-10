import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookCopy } from './copy.entity';

// interface Cover {
//   small?: string;
//   medium?: string;
//   large?: string;
// }

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  subtitle: string;
  @Column()
  numberOfPages: number;
  // subjects
  // publishers,
  @Column({ default: new Date() })
  publishDate: Date;
  // cover: Cover
  // languages
  // authors
  @OneToMany(type => BookCopy, copy => copy.book)
  copies: BookCopy[];
}
