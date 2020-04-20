'use strict'
const mongoose = require("mongoose");
const Shema = mongoose.Schema;

// crear el shema
const UserShema = Shema({

    name: String,
    lastname: String,
    email : {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model("User", UserShema);