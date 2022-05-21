const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    /*on verifie si le token de l'user correspond bien*/
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      /*erreur si l'user id ne correspond pas avec l'user qui "porte" le token*/
      throw "UserId non valable!";
    } else {
      /*l'utilisateur posséde un token pour sa requête et peut y accéder*/
      next();
    }
  } catch (error) {
    /*l'utilisateur ne posséde pas un token pour sa reqûete donc erreur*/
    res.status(403).json({ error: error | "unauthorized request" });
  }
};
