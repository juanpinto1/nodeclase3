const database = require('../dbConfig');

const addPost = async (titulo, img, descripcion, likes) => {
  try {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [titulo, img, descripcion, likes];

    const result = await database.query(consulta, values);

    if (result.rowCount) {
      return {
        msg: 'Post agregado',
        data: result.rows[0]
      };
    } else {
      return {
        msg: 'Post no agregado',
        data: []
      };
    }
  } catch (error) {
    throw error;
  }
};

const getPosts = async () => {
  try {
    const consulta = "SELECT * FROM posts";

    const { rows } = await database.query(consulta);

    if (rows.length) {
      return {
        msg: 'Posts encontrados',
        data: rows
      };
    } else {
      return {
        msg: 'No hay Posts',
        data: []
      };
    }
  } catch (error) {
    throw error;
  }
};

const likePost = async (postId) => {
  try {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [postId];

    const result = await database.query(consulta, values);

    if (result.rowCount) {
      return {
        msg: 'Like agregado al post',
        data: result.rows[0]
      };
    } else {
      return {
        msg: 'No se pudo agregar el like al post',
        data: []
      };
    }
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [postId];

    const result = await database.query(consulta, values);

    if (result.rowCount) {
      return {
        msg: 'Post eliminado',
        data: result.rows[0]
      };
    } else {
      return {
        msg: 'No se pudo eliminar el post',
        data: []
      };
    }
  } catch (error) {
    throw error;
  }
};

const PostCollection = {
  addPost,
  getPosts,
  likePost,
  deletePost
};

module.exports = { PostCollection };