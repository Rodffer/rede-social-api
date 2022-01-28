const router = require('express').Router();

const postMiddleware = require('../middlewares/posts');

router.post('/', postMiddleware.createPost);
router.put('/', postMiddleware.updatePost);
router.delete('/:id', postMiddleware.deletePost);
router.put('/like', postMiddleware.likePost);
router.get('/', postMiddleware.getPost);
router.get('/timeline', postMiddleware.getTimelinePost);

module.exports = router;