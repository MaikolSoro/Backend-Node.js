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
//....

// router Basic
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);
module.exports = app;