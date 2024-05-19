const router = require('express').Router();
const { get_posts_controller, add_posts_controller, like_post_controller, delete_post_controller } = require('../../controllers/likescontrollers');

router.get('/get-all', get_posts_controller);
router.post('/add', add_posts_controller);
router.put('/:id/like', like_post_controller); // Ruta para manejar la solicitud de like
router.delete('/:id', delete_post_controller);

module.exports = router;