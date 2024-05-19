const { PostCollection } = require('../database/models/likesModel');

const add_posts_controller = async (req, res, next) => {
    try {
        const { titulo, img, descripcion, likes } = req.body;
        const response = await PostCollection.addPost(titulo, img, descripcion, likes);
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const get_posts_controller = async (req, res, next) => {
    try {
        const response = await PostCollection.getPosts();
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const like_post_controller = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await PostCollection.likePost(id);
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const delete_post_controller = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await PostCollection.deletePost(id);
        res.send(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    get_posts_controller,
    add_posts_controller,
    like_post_controller,
    delete_post_controller
};