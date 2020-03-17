const jwt =  require("jwt-simple");
const  moment = require("moment");

const SECRET_KEY = "gR7cH9Svf9klgjasnjwin1u3v2";


/*-----------------------------*/
/* Genero el token del usuario */
/*-----------------------------*/
exports.createAccessToken = function(user) {

    const payload = {
        id: user._id,
        name:user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createToken: moment().unix(), 
        exp: moment().add(3,"hours").unix()

    };

    return jwt.encode(payload, SECRET_KEY);
};

/*-----------------------------*/
/* Refresco el token */
/*-----------------------------*/
exports.createRefreshToken = function(user) {

    const payload = {
        id: user._id,
        exp: moment().add(30,"days").unix()
    };
    return jwt.encode(payload,SECRET_KEY);
};

/*-----------------------------*/
/* Descodefica cualquier de los dos tokens */
/*-----------------------------*/
exports.decodeToken = function(token) {
    return jwt.encode(token, SECRET_KEY, true);
}
