'use strict'
const mongoose = require("mongoose");
const Shema = mongoose.Schema;

// crear el shema
const MenuSchema = Shema({

    title: String,
    url: String,
    order: Number,
    active: Boolean,
});
module.exports = mongoose.model("Menu", MenuSchema)