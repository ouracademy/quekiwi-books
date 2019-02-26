import { Length, IsEmail, IsString, MaxLength } from 'class-validator';
import { IsUnique } from './is-unique';
import { User } from './user.entity';

export class CreateUserInput {
  @IsString()
  @MaxLength(20)
  name: string;
  @IsUnique(User, 'email')
  @IsEmail()
  email: string;
  @Length(6, 20)
  password: string;
}
