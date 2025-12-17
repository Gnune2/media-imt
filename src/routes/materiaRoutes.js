const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rotas de Matéria (Todas protegidas pelo Token)

// Criar uma nova matéria com notas iniciais
router.post('/', authenticateToken, materiaController.criarMateria);

// Listar todas as matérias do aluno logado
router.get('/', authenticateToken, materiaController.listarMaterias);

// Atualizar apenas as notas de uma matéria específica
router.patch('/:id/notas', authenticateToken, materiaController.atualizarNotas);

// EXCLUIR uma matéria específica (Adicione esta linha abaixo)
router.delete('/:id', authenticateToken, materiaController.eliminarMateria);

module.exports = router;