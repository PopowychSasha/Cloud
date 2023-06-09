// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      database: 'files_popovych',
      user: 'root',
      password: 'mainAdmin1',
      host: 'localhost',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      database: 'files_popovych',
      user: 'proger',
      password: 'mainAdmin1',
      host: 'mysql-db',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  test: {
    client: 'mysql2',
    connection: {
      database: 'files_popovych_test',
      user: 'root',
      password: 'mainAdmin1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
