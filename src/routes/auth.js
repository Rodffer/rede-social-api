const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

router.post('/register', authMiddleware.registerUser);

module.exports = router;