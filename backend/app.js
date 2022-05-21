const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const helmet = require("helmet");
require("dotenv").config();
app.use(helmet());
const path = require("path");

const userRoutes = require("./routes/user");
//const sauceRoutes = require("./routes/sauce");

mongoose
  //connection à mongoDb
  .connect(
    "mongodb+srv://Yannick:" +
      process.env.DB_PASSWORD +
      "@cluster0.fkzmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  //"en-tête" des requêtes
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
//app.use("/api/sauces", sauceRoutes);

module.exports = app;
