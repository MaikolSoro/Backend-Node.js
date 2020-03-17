const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

// importamos el modelo
const User = require("../models/user");


/*-----------------------------*/
/* Se crea el usuario */
/*-----------------------------*/
function signUp(req, res) {
  const user = new User();

  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user = role = "admin";
  user.active = false;
  
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales." });
    } else {
      bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear usuario." });
              } else {
                res.status(200).send({ message: "Usuario creado" });
              }
            }
          });
        }
      });
    }
  }
}

/*-----------------------------*/
/* Iniciar sección y generar el token */
/*-----------------------------*/
function signIn(req, res){
  console.log("Login correcto");

  const params  = req.body;
  const email  = params.email.toLowerCase();
  const password = params.password;

  User.findOne({email},  (err, userStored) => {
    if(err){
      res.status(500).send({message:"Error del servidor."});
    } else {
      if(!userStored) {
        res.status(404).send({message: "Usuario no encontrado."});
      } else {
        bcrypt.compare(password, userStored, password, (err, check) => {
          if(err) {
            res.status(500).send({message: "Error del servidor."});
          } else if (!check){
            res.status(404).send({message: "La contraseña es incorrecta"});
          } 
          else {
            if(!userStored.active){
              res.status(200).send({code: 200, message: "El usuario no se ha activado."});
            }else {
              res.status(200).send({accesToken: jwt.createAccessToken(userStored), 
                                    refrshToken: jwt.createRefreshToken(userStored) 
              });
            }
          }
        });
      }
    }
  });   

}
module.exports = {
  signUp,
  signIn
};
