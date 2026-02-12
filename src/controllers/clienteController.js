const clienteModel = require('../models/clienteModel');

// Obtener todos los clientes
const getClientes = (req, res) => {
    clienteModel.getAllClientes((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener cliente por ID
const getCliente = (req, res) => {
    const { id } = req.params;

    clienteModel.getClienteById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear cliente
const createCliente = (req, res) => {
    const cliente = req.body;

    clienteModel.createCliente(cliente, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Cliente creado correctamente',
            id: result.insertId
        });
    });
};

// Actualizar cliente
const updateCliente = (req, res) => {
    const { id } = req.params;
    const cliente = req.body;

    clienteModel.updateCliente(id, cliente, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente actualizado correctamente' });
    });
};

// Eliminar cliente
const deleteCliente = (req, res) => {
    const { id } = req.params;

    clienteModel.deleteCliente(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    });
};

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
};
