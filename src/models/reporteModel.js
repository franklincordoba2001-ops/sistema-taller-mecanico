const db = require('../config/db');

// Total general facturado
const getTotalGeneral = async () => {
  const [rows] = await db.query(`
    SELECT 
      IFNULL(SUM(total), 0) AS total_general,
      COUNT(*) AS cantidad_facturas
    FROM facturas
  `);
  return rows[0];
};

// Total por método de pago
const getTotalPorMetodoPago = async () => {
  const [rows] = await db.query(`
    SELECT 
      metodo_pago,
      SUM(total) AS total
    FROM facturas
    GROUP BY metodo_pago
  `);
  return rows;
};

// Total por rango de fechas
const getTotalPorFecha = async (inicio, fin) => {
  const [rows] = await db.query(`
    SELECT 
      IFNULL(SUM(total), 0) AS total_rango
    FROM facturas
    WHERE fecha BETWEEN ? AND ?
  `, [inicio, fin]);

  return rows[0];
};

module.exports = {
  getTotalGeneral,
  getTotalPorMetodoPago,
  getTotalPorFecha
};
