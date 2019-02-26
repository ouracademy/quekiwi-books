import { CreateUserInput } from './create-user-input';
import { validate, useContainer } from 'class-validator';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';

describe('CreateUserInput', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
    useContainer(app, { fallbackOnErrors: true });
  });

  it('must pass', () => {
    const input = new CreateUserInput();
    input.email = 'arthur@our-academy.org';
    input.name = 'arthur';
    input.password = '123456';

    return validate(input).then(errors => expect(errors.length).toEqual(0));
  });

  it('should get errors on bad email, large name, password min 6', () => {
    const input = new CreateUserInput();
    input.email = 'bad email';
    input.name = 'un texto muy grande más de 100 letras o quiza menos pero..';
    input.password = '1';

    return validate(input).then(errors => {
      expect(getRuleProperty(errors)).toEqual([
        { rule: 'maxLength', property: 'name' },
        { rule: 'isEmail', property: 'email' },
        { rule: 'length', property: 'password' }
      ]);
    });
  });

  // TODO: this user must exist always in the database
  it('should fail on already existing email', () => {
    const input = new CreateUserInput();
    input.email = 'amd11dot4@gmail.com';
    return validate(input).then(errors => {
      expect(getRuleProperty(errors)).toContainEqual({
        rule: 'isUnique',
        property: 'email'
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

const getRuleProperty = errors =>
  errors.map(x => ({
    rule: Object.keys(x.constraints)[0],
    property: x.property
  }));
