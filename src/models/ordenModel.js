const db = require('../config/db');

// Obtener todas las órdenes con datos de moto y cliente
const getAllOrdenes = async () => {
  const [rows] = await db.query(`
    SELECT 
      o.id AS orden_id,
      o.descripcion,
      o.fecha_ingreso,
      o.fecha_entrega,
      o.estado,
      o.costo,
      m.id AS moto_id,
      m.placa,
      m.marca,
      m.modelo,
      c.id AS cliente_id,
      c.nombre,
      c.telefono
    FROM ordenes_servicio o
    JOIN motos m ON o.moto_id = m.id
    JOIN clientes c ON m.cliente_id = c.id
  `); // Se quitó la coma extra después de c.telefono

  return rows;
};

// Obtener orden por ID
const getOrdenById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM ordenes_servicio WHERE id = ?',
    [id]
  );
  return rows[0];
};

// Crear orden (Esta es la que faltaba y causaba el ReferenceError)
const createOrden = async (moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costo) => {
  // Redondeamos el costo antes de insertar para evitar decimales innecesarios
  const costoLimpio = Math.round(costo || 0);

  const [result] = await db.query(
    `INSERT INTO ordenes_servicio 
    (moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costo) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [moto_id, descripcion, fecha_ingreso, fecha_entrega, estado || 'pendiente', costoLimpio]
  );
  return result;
};

// Actualizar orden
const updateOrden = async (id, moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costo) => {
  const costoLimpio = Math.round(costo || 0);
  
  const [result] = await db.query(
    `UPDATE ordenes_servicio 
     SET moto_id=?, descripcion=?, fecha_ingreso=?, fecha_entrega=?, estado=?, costo=? 
     WHERE id=?`,
    [moto_id, descripcion, fecha_ingreso, fecha_entrega, estado, costoLimpio, id]
  );
  return result;
};

// Eliminar orden
const deleteOrden = async (id) => {
  const [result] = await db.query(
    'DELETE FROM ordenes_servicio WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  getAllOrdenes,
  getOrdenById,
  createOrden, // Ahora sí está definida arriba
  updateOrden,
  deleteOrden
};