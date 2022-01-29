const router = require('express').Router();

const postMiddleware = require('../middlewares/posts');

router.post('/', postMiddleware.createPost);
router.put('/:id', postMiddleware.updatePost);
router.delete('/:id', postMiddleware.deletePost);
router.put('/:id/like', postMiddleware.likePost);
router.get('/:id', postMiddleware.getPost);
router.get('/timeline', postMiddleware.getTimelinePost);

module.exports = router;