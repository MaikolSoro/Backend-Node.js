'use strict'
const express = require("express");

const PostController = require("../controllers/post");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-post", [md_auth.ensureAuth], PostController.addPost);
api.get("/get-posts", PostController.getPosts);
api.put("/update-post/:id",[md_auth.ensureAuth], PostController.updatePost);

module.exports = api;