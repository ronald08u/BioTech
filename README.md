# Cardi Backend

Backend API para el asistente cardiovascular Cardi.

## Despliegue en Render

1. Crea un repositorio en GitHub con estos archivos
2. Ve a [Render](https://render.com)
3. Crea un nuevo Web Service
4. Conecta tu repositorio de GitHub
5. Configuración:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Despliega

## URL del Backend

Después del despliegue, Render te dará una URL como:
```
https://tu-app.onrender.com
```

## Integración con Frontend

En tu archivo `script.js`, cambia:

```javascript
// ANTES (usando Gemini directamente)
const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {...});

// DESPUÉS (usando tu backend)
const response = await fetch('https://tu-app.onrender.com/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mensaje: userMessage
  })
});

const data = await response.json();
const respuesta = data.respuesta;
```

## API Endpoints

### GET /
Health check del servidor

### POST /api/chat
Envía un mensaje y recibe una respuesta de Cardi

**Request:**
```json
{
  "mensaje": "¿Cómo puedo cuidar mi corazón?"
}
```

**Response:**
```json
{
  "respuesta": "La prevención cardiovascular comienza con pequeños cambios..."
}
```

## Desarrollo Local

```bash
npm install
npm start
```

Servidor disponible en `http://localhost:3000`
