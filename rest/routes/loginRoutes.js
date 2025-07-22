const express = require('express');
const router = express.Router();
const { login, resetarSenhaController } = require('../controllers/loginController');

router.post('/login', login);
router.post('/resetar-senha', resetarSenhaController);

module.exports = router; 