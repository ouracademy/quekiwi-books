import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;
}
