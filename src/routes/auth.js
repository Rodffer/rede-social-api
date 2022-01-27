const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

router.post('/register', authMiddleware.registerUser);
router.post('/login', authMiddleware.loginUser);

module.exports = router;