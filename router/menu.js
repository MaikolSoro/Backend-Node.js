'use strict'
const express = require("express");
const MenuController = require("../controllers/menu");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu );  
api.get("/get-menu", MenuController.getMenus);
api.put("/update-menu/:id",[md_auth.ensureAuth], MenuController.updateMenu);
api.put("/activate-menu/:id",[md_auth.ensureAuth], MenuController.activateMenu);

module.exports = api;