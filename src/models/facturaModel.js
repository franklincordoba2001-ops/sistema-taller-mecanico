const db = require('../config/db');

// --- ESTA ES LA FUNCIÓN QUE FALTABA ---
const getAllFacturas = async () => {
  const [rows] = await db.query(`
    SELECT 
      f.id AS factura_id,
      f.fecha,
      f.total,
      f.metodo_pago,
      o.descripcion AS orden_descripcion,
      c.nombre AS cliente_nombre
    FROM facturas f
    JOIN ordenes_servicio o ON f.orden_id = o.id
    JOIN motos m ON o.moto_id = m.id
    JOIN clientes c ON m.cliente_id = c.id
  `);
  return rows;
};

// Obtener factura completa con joins
const getFacturaCompletaById = async (id) => {
  const [rows] = await db.query(`
    SELECT 
      f.id AS factura_id,
      f.fecha,
      f.total,
      f.metodo_pago,
      o.descripcion,
      m.placa,
      m.marca,
      m.modelo,
      c.nombre AS cliente_nombre,
      c.telefono
    FROM facturas f
    JOIN ordenes_servicio o ON f.orden_id = o.id
    JOIN motos m ON o.moto_id = m.id
    JOIN clientes c ON m.cliente_id = c.id
    WHERE f.id = ?
  `, [id]);
  return rows[0];
};

// Obtener factura por ID
const getFacturaById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM facturas WHERE id = ?',
    [id]
  );
  return rows[0];
};

// Crear factura
const createFactura = async (orden_id, fecha, total, metodo_pago) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO facturas (orden_id, fecha, total, metodo_pago)
       VALUES (?, ?, ?, ?)`,
      [orden_id, fecha, total, metodo_pago]
    );

    await connection.query(
      `UPDATE ordenes_servicio 
       SET estado = 'entregado'
       WHERE id = ?`,
      [orden_id]
    );

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Eliminar factura
const deleteFactura = async (id) => {
  const [result] = await db.query(
    'DELETE FROM facturas WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  getAllFacturas, // Ahora sí existe arriba
  getFacturaById,
  createFactura,
  deleteFactura,
  getFacturaCompletaById
};