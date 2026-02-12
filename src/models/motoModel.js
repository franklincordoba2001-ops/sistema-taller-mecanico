const db = require('../config/db');

// Obtener todas las motos
const getAllMotos = async () => {
  const [rows] = await db.query('SELECT * FROM motos');
  return rows;
};

// Obtener moto por ID
const getMotoById = async (id) => {
  const [rows] = await db.query('SELECT * FROM motos WHERE id = ?', [id]);
  return rows[0];
};

// Crear moto
const createMoto = async (placa, marca, modelo, cilindraje, cliente_id) => {
  const [result] = await db.query(
    'INSERT INTO motos (placa, marca, modelo, cilindraje, cliente_id) VALUES (?, ?, ?, ?, ?)',
    [placa, marca, modelo, cilindraje, cliente_id]
  );
  return result;
};

// Actualizar moto
const updateMoto = async (id, placa, marca, modelo, cilindraje, cliente_id) => {
  const [result] = await db.query(
    'UPDATE motos SET placa=?, marca=?, modelo=?, cilindraje=?, cliente_id=? WHERE id=?',
    [placa, marca, modelo, cilindraje, cliente_id, id]
  );
  return result;
};

// Eliminar moto
const deleteMoto = async (id) => {
  const [result] = await db.query(
    'DELETE FROM motos WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  getAllMotos,
  getMotoById,
  createMoto,
  updateMoto,
  deleteMoto
};
