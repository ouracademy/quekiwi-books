import { IsDefined } from 'class-validator';

export class CreateCopie {
  @IsDefined()
  id: number;
  quantity: number;
  price: number;
}
