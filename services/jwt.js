'use strict'
const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA";


/*-----------------------------*/
/* Genero el token del usuario */
/*-----------------------------*/
exports.createAccessToken = function(user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment()
      .add(3, "hours")
      .unix()
  };

  return jwt.encode(payload, SECRET_KEY);
};

/*-----------------------------*/
/* Refresco el token */
/*-----------------------------*/
exports.createRefreshToken = function(user) {
  const payload = {
    id: user._id,
    exp: moment()
      .add(30, "days")
      .unix()
  };

  return jwt.encode(payload, SECRET_KEY);
};

/*-----------------------------*/
/* Descodefica cualquier de los dos tokens */
/*-----------------------------*/
exports.decodedToken = function(token) {
  return jwt.decode(token, SECRET_KEY, true);
};