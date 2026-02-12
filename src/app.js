const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);

app.get('/', (req, res) => {
    res.send('API Taller Mecánico funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
