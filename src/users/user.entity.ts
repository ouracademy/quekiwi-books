import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
