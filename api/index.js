const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Tus rutas
app.get('/api/mensaje', (req, res) => {
    res.json({ texto: "Hola desde la API en Vercel" });
});

// Exportar la app para que Vercel la use
module.exports = app;

git
