const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// GET - Obtener todos los clientes
router.get('/', clienteController.getClientes);

// GET - Obtener cliente por ID
router.get('/:id', clienteController.getCliente);

// POST - Crear cliente
router.post('/', clienteController.createCliente);

// PUT - Actualizar cliente
router.put('/:id', clienteController.updateCliente);

// DELETE - Eliminar cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
