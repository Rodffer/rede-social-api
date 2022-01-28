const router = require('express').Router();

const userMiddleware = require('../middlewares/users');

router.put('/:id', userMiddleware.updateUser);
router.delete('/:id', userMiddleware.deleteUser);
router.get('/:id', userMiddleware.searchUser);
router.put('/:id/follow', userMiddleware.followUser);
router.put('/:id/unfollow', userMiddleware.unfollowUser);

module.exports = router;