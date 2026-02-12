const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', facturaController.getFacturas);
router.get('/:id', facturaController.getFactura);
router.post('/', facturaController.createFactura);
router.delete('/:id', facturaController.deleteFactura);
router.get('/', verifyToken, facturaController.getFacturas);
router.post('/', verifyToken, facturaController.createFactura);
router.get('/:id/pdf', verifyToken, facturaController.generarFacturaPDF);
module.exports = router;
