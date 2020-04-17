// const fs = require("fs");
// const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");
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
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales." });
    } else {
      bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario." });
              } else {
                res.status(200).send({ user: userStored });
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
function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              });
            }
          }
        });
      }
    }
  });
}

/*-----------------------------*/
/* Obtengo los usuarios que se encuentran en el sistema */
/*-----------------------------*/
function getUsers(req, res){
  // console.log("Get");
  User.find().then(users => {
    if(!users){
       res.status(404).send({
        message:"No se ha encontrado ningun usuario."
      });
    } else {
      res.status(200).send({ users });
    }
  })
}

/*-----------------------------*/
/* Obtener los usuarios activados */
/*-----------------------------*/
function getUsersActive(req, res) {
  const query = req.query;

  User.find({active: query.active}).then(users => {
  if(!users){
    res.status(404).send({
      message: "No se ha activado"
    });
  } else {
    res.status(200).send({users});
  }
})
}

/*-----------------------------*/
/*  Subir la imagen  */
/*-----------------------------*/
function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "Nose ha encontrado ningun usuario." });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"
            });
          } else {
            user.avatar = fileName; // añado el nombre de la imagen
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario." });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

/*-----------------------------*/
/* Recuperar La URL del avatar y mostar el avatar o la imagen */
/*-----------------------------*/
function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, exists => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

/*-----------------------------*/
/* Actualizar usuario */
/*-----------------------------*/
function updateUser(req, res) {
    const userData = req.body;
    const params =  req.params;

    User.findByIdAndUpdate({_id: params.id }, userData, userData, (err, userUpdate) => {
      if(err) {
        res.status(500).send({message: "Error del servidor"});

      }else {
        if(!userUpdate) {
          res.status(404).send({message: "No se ha encontado ningun usuario."});
        } else {
          res.status(200).send({message: "Usuario actualizado correctamente."});
        }
      }
    });
  // console.log(userData);
}
module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser
};
