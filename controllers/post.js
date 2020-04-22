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

/*-----------------------------*/
/* Actualizar posts */
/*-----------------------------*/
function updatePost(req , res) {

    const postData = req.body;
    const { id } = req.params;

    Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {

        if(err) {
            res.status(500).send({ code: 500 , message: "Error del servidor."});
        } else {
            if(!postUpdate) {
                res.status(404).send({ code: 404, message: "No se ha encontrado  ningun post."});
            } else {
                res.status(200).send({ code: 200, message: "Post actualizado correctamente."});
            }
        }
    });

}

/*-----------------------------*/
/* Eliminar post por el id */
/*-----------------------------*/
function deletePost(req , res) {
    const {id} = req.params;

    Post.findByIdAndRemove(id, (err, postDeleted) => {

        if(err) {
            res.status(500).send({ code: 500, message: "Error del servidor."});
        } else {
            if(!postDeleted) {
            res.status(404).send({ code: 404, message: "Post no encontrado."});
            } else {
            res.status(200).send({ code: 200, message: "El post ha sido eliminado correctamente."});
            }
        }
    });

}
module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost
}