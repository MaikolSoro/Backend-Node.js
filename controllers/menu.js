'use strict'
const Menu = require("../models/menu");

/*-----------------------------*/
/* Agregar o crear Menu */
/*-----------------------------*/
function addMenu(req, res) {
    // console.log("Add menu");

    const{ title, url, order, active } = req.body;
    const menu = new Menu();
    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    menu.save((err, createdMenu) => {
        if(err) {
            res.status(500).send({ message: "Error del servidor"});
        } else {
            if(!createdMenu) {
                res.status(404).send({ message: "Error al crear el menu."});
            } else {
                res.status(200).send({ message: "Menu creado correctamente"});
            }
        }
    });
}

/*-----------------------------*/
/* Muestro  los menus */
/*-----------------------------*/
function getMenus(req, res) {
    Menu.find()
      .sort({ order: "asc" })
      .exec((err, menusStored) => {
        if (err) {
          res.status(500).send({ message: "Error del servidor." });
        } else {
          if (!menusStored) {
            res.status(404).send({
              message: "No se ha encontrado ningun elemento en le menu."
            });
          } else {
            res.status(200).send({ menu: menusStored });
          }
        }
      });
}

/*-----------------------------*/
/* Actualizar menu */
/*-----------------------------*/
function updateMenu(req,res) {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if(err) {
      res.status(500).send({message: "Error del servidor"});
    } else {
      if(!menuUpdate) {
        res.status(404).send({ message: "No se ha encontrado ningun menu"});
      } else {
        res.status(200).send({ message: "Menu actualizado correctamente"});
      }
    }
  });
}
module.exports = {
    addMenu,
    getMenus,
    updateMenu
};