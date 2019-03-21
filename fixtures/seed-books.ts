import { createConnection } from 'typeorm';
import * as faker from 'faker';
import { range } from '@ouracademy/range';
import { Book } from 'src/books/book.entity';
import { Feature } from 'src/books/feature.entity';

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

const seedFeatures = () =>
  [
    { name: 'Usado', type: 'time' },
    { name: 'Nuevo', type: 'time' },
    { name: 'Hoja blanca', type: 'color' },
    { name: 'Hoja bulqui', type: 'color' },
    { name: 'Tapa dura', type: 'any' }
  ].map(({ name, type }) => {
    const feature = new Feature();
    feature.name = name;
    feature.type = type;

    return feature;
  });

createConnection().then(async connection => {
  // tslint:disable-next-line:no-console
  console.log('Seeded started');

  for (const entity of [...seedBooks(), seedFeatures()]) {
    await connection.manager.save(entity);
  }
  // tslint:disable-next-line:no-console
  console.log('Seeded successfully');
});
