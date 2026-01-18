/*********************************
 * CARDIOASISTENTE TODO-EN-UNO
 * Frontend + Backend + Gemini
 *********************************/

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

// ===============================
// FRONTEND INLINE
// ===============================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>CardioAsistente IA</title>
</head>
<body>
  <h2>🫀 CardioAsistente IA</h2>

  <input id="msg" placeholder="Escribe tu comentario" />
  <button onclick="enviar()">Enviar</button>

  <pre id="log"></pre>

<script>
async function enviar() {
  const input = document.getElementById("msg");
  const texto = input.value;
  if (!texto) return;

  document.getElementById("log").textContent += "Tú: " + texto + "\\n";
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: texto })
  });

  const data = await res.json();
  document.getElementById("log").textContent += "IA: " + data.reply + "\\n\\n";
}
</script>

</body>
</html>
`);
});

// ===============================
// API CHAT GEMINI
// ===============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: \`
Eres un asistente de salud cardiovascular.
No diagnostiques ni recetes.
Mensaje del usuario: "\${message}"
              \`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No hay respuesta.";

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Error al contactar la IA." });
  }
});

// ===============================
// START
// ===============================
app.listen(PORT, () => {
  console.log("🫀 CardioAsistente activo en puerto", PORT);
});
