// Charge fichier .env + remplie process.env avec les variables
require("dotenv").config();

const express = require("express");

const app = express();

// Pour que express lise les fichier JSON
app.use(express.json());

// Le ?? 5000 fourni une valeur par défaut si process.env.APP_PORT n'est pas défini
const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};



app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const users = require("./users");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);

app.post("/api/movies", movieHandlers.postMovie);
app.post("api/users", users.postUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
