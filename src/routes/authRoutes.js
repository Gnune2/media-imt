const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas de Autenticação
router.post('/cadastro', authController.cadastro);
router.post('/login', authController.login);

module.exports = router;