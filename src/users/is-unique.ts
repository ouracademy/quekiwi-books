import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private entityManager: EntityManager) {}

  validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;

    return this.entityManager
      .getRepository(entityClass)
      .findOne({ [property]: value })
      .then(entity => (entity ? false : true));
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, property] = args.constraints;
    return `${property} already exist in ${entityClass.name}`;
  }
}

export function IsUnique(
  entityClass,
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass, property],
      validator: IsUniqueConstraint
    });
  };
}
