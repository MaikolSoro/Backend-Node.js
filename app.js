const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const { API_VERSION } = require('./config');

// load routings

const userRoutes = require('./router/user');
//..
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// configure header HTTP
//....

// router Basic
app.use(`/api/${API_VERSION}`,userRoutes);

module.exports = app;