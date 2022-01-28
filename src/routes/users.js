const router = require('express').Router();

const userMiddleware = require('../middlewares/users');

router.put('/:id', userMiddleware.updateUser);
router.delete('/:id', userMiddleware.deleteUser);

module.exports = router;