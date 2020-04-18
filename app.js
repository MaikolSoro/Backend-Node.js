// Utilizar funcionalidades del Ecmascript 6
'use strict'
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const { API_VERSION } = require('./config');

// load routings

const userRoutes = require('./router/user');
const authRoutes = require('./router/auth');
//..
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// configure header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
//....

// router Basic
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);
module.exports = app;