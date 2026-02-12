const ordenModel = require('../models/ordenModel');

// Creamos un formateador de números una sola vez para reutilizarlo
const formateadorCosto = new Intl.NumberFormat('es-CO', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

// GET todas
const getOrdenes = async (req, res) => {
  try {
    const ordenes = await ordenModel.getAllOrdenes();
    
    // Formateamos el costo de cada orden antes de enviarla
    const ordenesFormateadas = ordenes.map(orden => ({
      ...orden,
      costo: formateadorCosto.format(orden.costo)
    }));

    res.json(ordenesFormateadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET por ID
const getOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ordenModel.getOrdenById(id);

    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // Formateamos el costo de la orden encontrada
    orden.costo = formateadorCosto.format(orden.costo);

    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear
const createOrden = async (req, res) => {
  try {
    const { moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costo } = req.body;

    const result = await ordenModel.createOrden(
      moto_id,
      descripcion,
      fecha_ingreso,
      fecha_entrega,
      estado || 'pendiente',
      costo
    );

    res.status(201).json({
      message: 'Orden creada correctamente',
      id: result.insertId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT actualizar
const updateOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costo } = req.body;

    await ordenModel.updateOrden(
      id,
      moto_id,
      descripcion,
      fecha_ingreso,
      fecha_entrega,
      estado,
      costo
    );

    res.json({ message: 'Orden actualizada correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE eliminar
const deleteOrden = async (req, res) => {
  try {
    const { id } = req.params;

    await ordenModel.deleteOrden(id);

    res.json({ message: 'Orden eliminada correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrdenes,
  getOrden,
  createOrden,
  updateOrden,
  deleteOrden
};