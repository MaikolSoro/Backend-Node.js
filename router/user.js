const express = require("express");
const UserController = require("../controllers/user");
const multipart = require("connect-multiparty");
const api = express.Router();

// rutas

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
module.exports = api;