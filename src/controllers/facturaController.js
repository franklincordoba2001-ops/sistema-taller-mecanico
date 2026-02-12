const facturaModel = require('../models/facturaModel');
const PDFDocument = require('pdfkit');

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
// Generar PDF de factura
const generarFacturaPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const factura = await facturaModel.getFacturaCompletaById(id);

    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=factura_${factura.factura_id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("TALLER MECÁNICO", { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Factura #${factura.factura_id}`);
    doc.text(`Fecha: ${factura.fecha}`);
    doc.moveDown();

    doc.text(`Cliente: ${factura.cliente_nombre}`);
    doc.text(`Teléfono: ${factura.telefono}`);
    doc.moveDown();

    doc.text(`Moto: ${factura.marca} ${factura.modelo}`);
    doc.text(`Placa: ${factura.placa}`);
    doc.moveDown();

    doc.text(`Servicio: ${factura.descripcion}`);
    doc.moveDown();

    doc.fontSize(16).text(`Total: $${factura.total}`);
    doc.text(`Método de pago: ${factura.metodo_pago}`);

    doc.end();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getFacturas,
  getFactura,
  createFactura,
  deleteFactura,
  generarFacturaPDF
};
