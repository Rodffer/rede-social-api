const router = require('express').Router();

const userMiddleware = require('../middlewares/users');

router.put('/:id', userMiddleware.updateUser);

module.exports = router;