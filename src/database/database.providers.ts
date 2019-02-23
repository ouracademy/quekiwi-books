import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'stampy.db.elephantsql.com',
        port: 5432,
        username: 'qmpoukcp',
        password: 'zDBGL6FI0dfzYRVzIQQc7wjPOlez4mvE',
        database: 'qmpoukcp',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
