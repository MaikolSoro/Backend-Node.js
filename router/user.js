const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

// rutas

api.post('/sign-up', UserController.signUp);

module.exports = api;