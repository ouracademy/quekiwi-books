import { CreateUserInput } from './create-user-input';
import { validate } from 'class-validator';

describe('CreateUserInput', () => {
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
});

const getRuleProperty = errors =>
  errors.map(x => ({
    rule: Object.keys(x.constraints)[0],
    property: x.property
  }));
