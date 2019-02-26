import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export function hash(myPlaintextPassword) {
  return bcrypt.hash(myPlaintextPassword, saltRounds);
}
