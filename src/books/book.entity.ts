import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column('int')
  numberOfPages: number;
  // subjects
  // publishers,
  @Column('date')
  publishDate: Date;
  // cover: Cover
  // languages
  // authors
}
