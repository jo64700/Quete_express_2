const argon2 = require("argon2");

const database = require("./database");
const { hashPassword } = require("./auth");
const getUsers = (req, res) => {
    database
    .query("select * from users")
    .then(([users]) => {
        res.json(users)
        res.status(200);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving data from database")
    });
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
        if (users[0] != null) {
            res.json(users[0])
            res.status(200);
        } else {
            res.status(404).send("Not Found");
            
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
    });
};

const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword} = req.body;
    database.query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUE (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )

    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
  };

  //Permet de remplacer des données avec POSTMAN
const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    database
      .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the users");
      });
  };

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

//Filtrer entre city et language
const getUser = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }
  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    updateUsers,
    deleteUser,
    getUser,
};