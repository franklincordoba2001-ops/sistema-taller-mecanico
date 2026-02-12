const reporteModel = require('../models/reporteModel');

//  Total general
const totalGeneral = async (req, res) => {
  try {
    const data = await reporteModel.getTotalGeneral();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Total por método de pago
const totalPorMetodoPago = async (req, res) => {
  try {
    const data = await reporteModel.getTotalPorMetodoPago();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Total por rango de fechas
const totalPorFecha = async (req, res) => {
  try {
    const { inicio, fin } = req.query;

    if (!inicio || !fin) {
      return res.status(400).json({
        message: "Debe enviar fecha inicio y fin"
      });
    }

    const data = await reporteModel.getTotalPorFecha(inicio, fin);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  totalGeneral,
  totalPorMetodoPago,
  totalPorFecha
};
