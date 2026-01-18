/*********************************
 * SCRIPT PRINCIPAL – SIN UI
 * Envía comentarios al backend
 * y registra respuestas de la IA
 *********************************/

// ===============================
// CONFIGURACIÓN
// ===============================
const API_URL = "https://TU_APP.onrender.com/api/chat";
// ⬆️ cambia TU_APP por tu dominio real en Render

// ===============================
// FUNCIÓN PARA ENVIAR COMENTARIOS
// ===============================
async function enviarComentario(comentario) {
  if (!comentario || comentario.trim() === "") {
    console.warn("⚠️ Comentario vacío");
    return;
  }

  console.log("🗣️ Usuario:", comentario);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: comentario
      })
    });

    if (!response.ok) {
      throw new Error("Error HTTP " + response.status);
    }

    const data = await response.json();

    console.log("🤖 IA:", data.reply);

    return {
      comentario,
      respuestaIA: data.reply,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("❌ Error al enviar comentario:", error);
  }
}

// ===============================
// EJEMPLO DE USO (PRUEBA)
// ===============================
(async () => {
  await enviarComentario("¿Cómo puedo cuidar mi corazón?");
  await enviarComentario("¿Qué hábitos reducen el riesgo cardiovascular?");
})();

