import { createConnection } from 'typeorm';
import * as faker from 'faker';
import { range } from '@ouracademy/range';
import { Book } from 'src/books/book.entity';

const seedBooks = () =>
  range(1, 10)
    .toArray()
    .map(n => {
      const book = new Book();
      book.title = faker.name.title();
      if (faker.random.boolean()) {
        book.subtitle = faker.random.words(3);
      }
      book.numberOfPages = faker.random.number(200);
      book.publishDate = faker.date.past();
      return book;
    });

createConnection().then(async connection => {
  // tslint:disable-next-line:no-console
  console.log('Seeded started');

  for (const book of seedBooks()) {
    await connection.manager.save(book);
  }
  // tslint:disable-next-line:no-console
  console.log('Seeded successfully');
});
