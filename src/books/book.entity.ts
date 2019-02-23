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
  @Column({ nullable: true })
  subtitle: string;
  @Column({ type: 'int', nullable: true })
  numberOfPages: number;
  // subjects
  // publishers,
  @Column({ type: 'date', nullable: true })
  publishDate: Date;
  // cover: Cover
  // languages
  // authors
}
