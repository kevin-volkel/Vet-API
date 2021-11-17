const express = require('express');
const router = express.Router();

const { login, register, updatePermissions } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').put(updatePermissions);

module.exports = router