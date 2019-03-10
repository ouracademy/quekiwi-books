import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BookCopie } from './copie.entity';

// interface Cover {
//   small?: string;
//   medium?: string;
//   large?: string;
// }

@Entity()
export class Book {
  @PrimaryColumn()
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
  @OneToMany(type => BookCopie, copie => copie.book) // note: we will create author property in the Photo class below
  copies: BookCopie[];
}
