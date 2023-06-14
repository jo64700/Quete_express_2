const Joi = require("joi");

/*
// Valider la section Movie puis passer à next() si tout va bien
const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;

 //Création de tableau d'erreur
    const errors =[];

//Erreur 422 si un champ est manquant ou invalide
    if (title == null) {
        errors.push({ field: "title", message: "This field is required" })
    
//Permet de renvoyer un message pour titre trop long
    } else if (title.length >= 255) {
        errors.push({field: "title", message: "Should contain less than 255 characters" });
    }
    if (director == null){
        errors.push({ field:"director", message: "The field 'director' is required "});
    }
    if (year == null){
        errors.push({field: "year", message: "The field 'year' is required"});
    }
    if (color == null){
        errors.push({field: "color", message: "The field 'color' is required"})
    } 
    if (duration == null){
        errors.push({field: duration, message: "The field 'duration' is required"})
    } 

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};


// Valider la section User avec JOI

//On donne les condition
const userSchema = Joi.object({
    email: Joi.string().max(255).required(),
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;

//Si abortEarly est sur true, la validation s'arrête des la 1ère Erreurs et ne vérifie pas les autres

    const { errors } = userSchema.validate(
        { firstname, lastname, email },
        { abortEarly: false}
    );

        if (error) {
            res.status(422).json({ validationErrors: error.details });
        } else {
            next();
        }
};
*/


const validateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1800).max(2030),
    genre: Joi.string().required(),
    director: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};



  module.exports = {
    validateMovie,
    validateUser,
  };