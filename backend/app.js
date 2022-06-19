const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");

const path = require("path");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

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

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use(helmet());
module.exports = app;
