'use strict'

const Newsletter = require("../models/newsletter");

/*-----------------------------*/
/* Suscribir el correo electronico */
/*-----------------------------*/
function suscribeEmail(req, res) {
    const email = req.params.email;
    const newsletter = new Newsletter();
  
    // si email no tiene contenido
    if (!email) {
      res.status(404).send({ code: 404, message: "El email es obligatorio" });
    } else {
        // si tiene contenido
      newsletter.email = email.toLowerCase();
      newsletter.save((err, newsletterStore) => {
        if (err) {
          res.status(500).send({ code: 500, message: "El email ya existe." });
        } else {
            // si el newsletterStore viene vació
          if (!newsletterStore) {
            res
              .status(400)
              .send({
                code: 400,
                message: "Error al registrar en la newsletter."
              });
          } else {
            res
              .status(200)
              .send({ code: 200, message: "Email registrado correctamente." });
          }
        }
      });
    }
  }
  

module.exports = {
    suscribeEmail
};