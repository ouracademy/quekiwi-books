export class AlreadyExistException extends Error {
  constructor(property) {
    super(`The ${property} already exists`);
    this.name = 'AlreadyExistUserException';
  }
}
