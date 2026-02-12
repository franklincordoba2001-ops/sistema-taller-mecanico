const facturaModel = require('../models/facturaModel');

// GET todas
const getFacturas = async (req, res) => {
  try {
    const facturas = await facturaModel.getAllFacturas();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET por ID
const getFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await facturaModel.getFacturaById(id);

    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear
const createFactura = async (req, res) => {
  try {
    const { orden_id, fecha, total, metodo_pago } = req.body;

    if (!orden_id || !fecha || !total) {
      return res.status(400).json({
        message: 'Campos obligatorios faltantes'
      });
    }

    const result = await facturaModel.createFactura(
      orden_id,
      fecha,
      total,
      metodo_pago
    );

    res.status(201).json({
      message: 'Factura creada correctamente',
      id: result.insertId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;

    await facturaModel.deleteFactura(id);

    res.json({ message: 'Factura eliminada correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFacturas,
  getFactura,
  createFactura,
  deleteFactura
};
