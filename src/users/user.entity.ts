import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BookCopy } from '../books/copy.entity';

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

  @OneToMany(type => BookCopy, copy => copy.user)
  copies: BookCopy[];
}
