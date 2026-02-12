const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
// registro de rutas
const clienteRoutes = require('./routes/clienteRoutes');
const motoRoutes = require('./routes/motoRoutes');
const ordenRoutes = require('./routes/ordenRoutes');

const app = express();

app.use(cors());
app.use(express.json());
// Rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/motos', motoRoutes);
app.use('/api/ordenes', ordenRoutes);


app.get('/', (req, res) => {
    res.send('API Taller Mecánico funcionando correctamente');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
