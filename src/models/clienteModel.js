const db = require('../config/db');

// Obtener todos los clientes
const getAllClientes = (callback) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, callback);
};

// Obtener cliente por ID
const getClienteById = (id, callback) => {
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    db.query(sql, [id], callback);
};

// Crear cliente
const createCliente = (cliente, callback) => {
    const sql = `
        INSERT INTO clientes (nombre, telefono, direccion, email)
        VALUES (?, ?, ?, ?)
    `;
    const values = [
        cliente.nombre,
        cliente.telefono,
        cliente.direccion,
        cliente.email
    ];

    db.query(sql, values, callback);
};

// Actualizar cliente
const updateCliente = (id, cliente, callback) => {
    const sql = `
        UPDATE clientes
        SET nombre = ?, telefono = ?, direccion = ?, email = ?
        WHERE id = ?
    `;
    const values = [
        cliente.nombre,
        cliente.telefono,
        cliente.direccion,
        cliente.email,
        id
    ];

    db.query(sql, values, callback);
};

// Eliminar cliente
const deleteCliente = (id, callback) => {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
