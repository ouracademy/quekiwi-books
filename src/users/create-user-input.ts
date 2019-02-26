import { Length, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @MaxLength(20)
  name: string;
  @IsEmail()
  email: string;
  @Length(6, 20)
  password: string;
}
