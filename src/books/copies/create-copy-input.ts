import { IsDefined } from 'class-validator';

export class CreateCopyInput {
  @IsDefined()
  id: number;
  quantity: number;
  price: number;
}
