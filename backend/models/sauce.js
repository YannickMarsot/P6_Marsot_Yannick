const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sauceShema = mongoose.Schema({
  //creation d'un modéle desauce
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: String, required: false },
  usersDisliked: { type: String, required: false },
});

sauceShema.plugin(uniqueValidator);
module.exports = mongoose.model("Sauce", sauceShema);
