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
  @Column({ nullable: true })
  subtitle: string;
  @Column({ nullable: true })
  numberOfPages: number;
  // subjects
  // publishers,
  @Column({ nullable: true })
  publishDate: Date;
  // cover: Cover
  // languages
  // authors
  @OneToMany(type => BookCopy, copy => copy.book)
  copies: BookCopy[];
}
