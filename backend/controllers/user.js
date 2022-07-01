const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/*s'inscrire*/
exports.signup = (req, res, next) => {
  console.log("req.body:", req.body);
  const user = new User({
    email: req.body.email,
    password: bcrypt.hash(req.body.password, 10, function (err, hash) {
      // Store hash in your password DB.
    }),
    /*on "hash" le mdp 10x afin de le sécuriser*/
    /*puis on crée un nouvel utilisateur avec l'email et le mdp "haché"*/
  });
  console.log(user);
  user
    /*on sauvegarde l'utilisateur ou erreur*/
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
    .catch((error) => res.status(400).json({ error }));
};

/*se connecter*/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    /*on cherche l'user avec l'email correspondant*/
    .then((user) => {
      /*si on ne le trouve pas erreur*/
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé!" });
      }
      bcrypt
        /*si on le trouve on compare le mot de passe rentré et celui ds la base de donnée*/
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            /*si il n'est pas valide erreur + message*/
            return res.status(401).json({ message: "mot de passe incorrect!" });
          }
          res.status(200).json({
            /*si valide creation d'un token pour les requêtes + connection*/
            userId: user._id,
            token: jwt.sign({ userId: user._id }, RANDOM_TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
