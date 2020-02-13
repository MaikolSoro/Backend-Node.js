const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// load routings
//..
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// configure header HTTP
//....

// router Basic

module.exports = app;