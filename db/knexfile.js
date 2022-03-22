const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "basic-ecom",
      user: "root",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    ...knexSnakeCaseMappers,
  },
};
