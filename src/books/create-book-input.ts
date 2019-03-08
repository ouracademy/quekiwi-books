import { MaxLength } from 'class-validator';

export class CreateUserBook {
  @MaxLength(100)
  title: string;
  @MaxLength(100)
  subtitle: string;
}
