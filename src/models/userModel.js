const db = require('../config/db');

const createUser = async (nombre, email, password) => {
  const [result] = await db.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail
};
