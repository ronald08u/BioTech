import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }

    const systemPrompt = `
Eres un asistente especializado en salud cardiovascular llamado CardioAsistente.

Reglas:
1. Proporciona solo información general
2. NO diagnostiques enfermedades
3. Recomienda siempre consultar a un profesional
4. Sé empático y claro
5. Respuestas máximo 3–4 oraciones

Si piden diagnóstico responde:
"No puedo proporcionar diagnósticos médicos. Te recomiendo encarecidamente que consultes con un profesional de la salud."

Mensaje del usuario: ${userMessage}
`;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
                process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: systemPrompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 300
                    }
                })
            }
        );

        const data = await response.json();

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No pude generar una respuesta en este momento.";

        res.json({ reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            reply: "Error al conectar con el asistente."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
