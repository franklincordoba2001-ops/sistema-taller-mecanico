const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.getFacturas);
router.get('/:id', facturaController.getFactura);
router.post('/', facturaController.createFactura);
router.delete('/:id', facturaController.deleteFactura);

module.exports = router;
