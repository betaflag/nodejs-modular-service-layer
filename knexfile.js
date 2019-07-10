module.exports = {
  client: "sqlite",
  migrations: {
    directory: "src/database/migrations"
  },
  seeds: {
    directory: "src/database/seeds"
  },
  connection: {
    filename: "./app.sqlite"
  }
};
