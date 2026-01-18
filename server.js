const express = require('express');
const cors = require('cors');
const app = express();

// 1. Configurar CORS para que tu Frontend pueda consultar la API
// Puedes dejarlo vacío para permitir todo o poner tu URL de GitHub Pages
app.use(cors()); 
app.use(express.json());

// 2. Una ruta de ejemplo
app.get('/api/datos', (req, res) => {
    res.json({
        mensaje: "Hola desde la API en Render",
        estado: "Conexión exitosa",
        fecha: new Date()
    });
});

// 3. EL CAMBIO MÁS IMPORTANTE: El puerto dinámico
// Render nos da el puerto en process.env.PORT
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
