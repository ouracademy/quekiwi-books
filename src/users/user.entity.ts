import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BookCopie } from 'src/books/copie.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => BookCopie, copie => copie.user) // note: we will create author property in the Photo class below
  copies: BookCopie[];
}
