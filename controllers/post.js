'use strict'
const Post = require("../models/post");

/*-----------------------------*/
/* El endpoint para crear los nuevos post */
/*-----------------------------*/
function addPost(req, res) {
    // console.log("Todo funciona correcto");
    const body = req.body;
    const post = new Post(body);

    post.save((err, postStored) => {

        if(err) {
            res.status(500).send({ code: 500, message: "Error del servidor."});
        } else {
            if(!postStored) {
                res.status(400).send({code: 400, message: "No se ha podido crear el post."});
            } else {
                res.status(200).send({ code: 200, message: "Post creado correctamente."});
            }
        }
    });
}

/*-----------------------------*/
/* Obtner todos los post  */
/*-----------------------------*/
function getPosts(req, res) {
    const {page, limit} = req.query;

    const options = {
        page: page,
        limit: parseInt(limit),
        sort: { date: "desc"}
    };

    Post.paginate({}, options, (err, postsStored) => {
        if(err) {
            res.status(500).send({ code: 500, message: "Error del servidor"});
        } else {
            if(!postsStored) {
                res.status(404).send({ code: 404, message: "No se ha encontrado  ningun post."});
            } else {
                res.status(200).send({ code: 200, posts: postsStored });
            }
        }
    });
}
module.exports = {
    addPost,
    getPosts
}