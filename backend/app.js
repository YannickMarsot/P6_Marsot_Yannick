const express = require("express");
const helmet = require("helmet");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();
app.use(helmet());
mongoose
  .connect(
    "mongodb+srv://Yannick:" +
      process.env.DB_PASSWORD +
      "@cluster0.fkzmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
