const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { login, register, updateUser } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').put(auth, updateUser);

module.exports = router;
