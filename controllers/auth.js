const jwt = require("../services/jwt");
const moment = require("moment");
const user = require("../models/user");


/*-----------------------------*/
/* Està funcion es para comprobar si el token a expirado */
/*-----------------------------*/
function willExpireToken(token) {
    const {exp} = jwt.decodedToken(token);
    const currentDate = moment().unix();

    if(currentDate > exp) {
        return true;
    }

    return false;
}

/*-----------------------------*/
/* Creamos el edpoint para Refrescar el accesstoken  y  tambien sacamos el id del usuario*/
/*-----------------------------*/
function refreshAccessToken(req, res) {
    // console.log("Estamos refrescando el access token");
    const { refreshToken } = req.body;
    // console.log(refreshToken);
    const isTokenExpired = willExpireToken(refreshToken);
    // console.log(isTokenExpired);
    if(isTokenExpired) {
        res.status(404).send({message:"El refreshToken ha expirado"});
    } else {
        const { id } = jwt.decodedToken(refreshToken);

        user.findOne({ _id: id }, (err, userStored) => {
                if(err) {
                    res.status(500).send({message: "Error del servidor"});
                } else {
                    if(!userStored) {
                        res.status(404).send({message:"Usuario no encontrado."})
                    } else {
                        res.status(200).send({
                            accessToken: jwt.createAccessToken(userStored),
                            refreshToken: refreshToken
                        });

                    }
                }
        });
    }
}

module.exports = {refreshAccessToken};

