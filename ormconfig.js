module.exports = {
  type: 'postgres',
  host: 'stampy.db.elephantsql.com',
  port: 5432,
  username: 'qmpoukcp',
  password: 'zDBGL6FI0dfzYRVzIQQc7wjPOlez4mvE',
  database: 'qmpoukcp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations'
  }
};
