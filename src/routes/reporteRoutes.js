const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const verifyToken = require('../middleware/authMiddleware');

//  Total general
router.get('/total', verifyToken, reporteController.totalGeneral);

//  Total por método de pago
router.get('/metodo-pago', verifyToken, reporteController.totalPorMetodoPago);

//  Total por rango de fechas
router.get('/por-fecha', verifyToken, reporteController.totalPorFecha);

module.exports = router;
