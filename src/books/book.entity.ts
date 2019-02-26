import { Entity, Column, PrimaryColumn } from 'typeorm';

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
  @Column()
  publishDate: Date;
  // cover: Cover
  // languages
  // authors
}
