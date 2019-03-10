import { MaxLength } from 'class-validator';

export class CreateUserBook {
  @MaxLength(100)
  title: string;

  subtitle: string;
}
