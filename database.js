require("dotenv").config();

// Importer le paquet mysql2
const mysql = require("mysql2/promise");
console.log(
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
)

// Utiliser mysql.createPool pour préparer un pool de connexion à l'aide des variables d'environnement
const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  database
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });

  database
  .query("select * from users")
  .then(([users]) => {
    console.log(users);
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = database;