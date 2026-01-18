require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const cardiResponses = {
  saludos: [
    "¡Hola! Soy Cardi, tu asistente cardiovascular. ¿En qué puedo ayudarte hoy?",
    "¡Hola! Estoy aquí para ayudarte con temas de salud cardiovascular. ¿Qué te gustaría saber?",
    "¡Bienvenido/a! Soy Cardi y estoy aquí para orientarte en tu salud cardiovascular."
  ],
  prevencion: [
    "La prevención cardiovascular comienza con pequeños cambios: caminar 30 minutos al día, comer más vegetales y reducir el estrés. ¿Te gustaría más detalles sobre alguno?",
    "Para prevenir problemas cardiovasculares es clave: ejercicio regular, dieta balanceada, no fumar y controlar tu presión arterial. ¿Sobre cuál quieres saber más?",
    "Mantener un corazón sano implica: actividad física diaria, alimentación rica en frutas y verduras, y chequeos médicos regulares. ¿Necesitas información específica?"
  ],
  nutricion: [
    "Una dieta saludable para el corazón incluye: pescado rico en omega-3, frutas, verduras, granos enteros y limitar las grasas saturadas. ¿Quieres recetas o consejos específicos?",
    "Para tu corazón, consume: aceite de oliva, nueces, aguacate, verduras de hoja verde y reduce la sal. El potasio de los plátanos también ayuda. ¿Necesitas más ideas?",
    "Alimentos amigos del corazón: avena, salmón, arándanos, espinacas, tomates y chocolate negro (con moderación). Evita las grasas trans. ¿Quieres saber sobre porciones?"
  ],
  ejercicio: [
    "El ejercicio ideal para el corazón: 150 minutos de actividad moderada por semana. Caminar, nadar o bailar son excelentes opciones. ¿Tienes alguna limitación física?",
    "Ejercicios cardiovasculares recomendados: caminar rápido, trotar suave, ciclismo, natación. Empieza gradualmente y escucha a tu cuerpo. ¿Necesitas una rutina específica?",
    "Para fortalecer tu corazón: combina ejercicio aeróbico (30 min/día) con estiramientos y fortalecimiento muscular 2 veces por semana. ¿Prefieres ejercicios en casa o al aire libre?"
  ],
  sintomas: [
    "No puedo proporcionar diagnósticos médicos. Si experimentas dolor en el pecho, dificultad para respirar, mareos o fatiga extrema, consulta inmediatamente a un profesional de la salud.",
    "Los síntomas que mencionas requieren evaluación médica profesional. Te recomiendo encarecidamente que consultes con un cardiólogo lo antes posible para un diagnóstico adecuado.",
    "Por tu seguridad, no puedo evaluar síntomas. Si tienes molestias en el pecho, palpitaciones irregulares o cualquier síntoma preocupante, busca atención médica de inmediato."
  ],
  estres: [
    "El estrés afecta directamente al corazón. Técnicas útiles: respiración profunda, meditación 10 min/día, ejercicio regular y dormir 7-8 horas. ¿Quieres aprender alguna técnica específica?",
    "Para reducir el estrés cardiovascular: practica yoga, dedica tiempo a hobbies que disfrutes, mantén conexiones sociales y considera mindfulness. ¿Alguna de estas te interesa más?",
    "El estrés crónico eleva la presión arterial. Ayuda: ejercicio regular, técnicas de relajación, organizar tu tiempo y hablar con seres queridos. ¿Necesitas estrategias específicas?"
  ],
  presion: [
    "La presión arterial saludable es menor a 120/80 mmHg. Para mantenerla: reduce la sal, haz ejercicio, mantén peso saludable y limita el alcohol. ¿Monitorizas tu presión regularmente?",
    "Para controlar la presión arterial: dieta DASH (rica en frutas, verduras, bajo sodio), ejercicio 30 min/día, peso adecuado y medicación si el médico la indica. ¿Quieres más detalles?",
    "Controlar la hipertensión naturalmente: ejercicio aeróbico, dieta baja en sodio, controlar el estrés, dormir bien y evitar el tabaco. Siempre bajo supervisión médica. ¿Necesitas consejos específicos?"
  ],
  colesterol: [
    "Para reducir el colesterol: come más fibra (avena, legumbres), grasas saludables (pescado, nueces), ejercicio regular y evita grasas trans. ¿Conoces tus niveles actuales?",
    "El colesterol LDL (malo) debe estar bajo. Ayuda: aceite de oliva, pescado azul, nueces, ejercicio y fibra soluble. El médico puede indicar estatinas si es necesario. ¿Quieres recetas?",
    "Para un colesterol saludable: limita carnes rojas, come más vegetales, usa aceites vegetales, muévete 30 min/día y mantén peso adecuado. ¿Necesitas un plan alimenticio?"
  ],
  medicamentos: [
    "No puedo recomendar medicamentos. Solo tu médico puede prescribir o ajustar medicación cardiovascular según tu caso específico. ¿Tienes dudas que debas consultar con tu cardiólogo?",
    "La medicación cardiovascular debe ser siempre supervisada por un profesional. Si tienes efectos secundarios o dudas sobre tus medicamentos, consulta con tu médico. Nunca ajustes dosis por tu cuenta.",
    "Cada tratamiento es personalizado. Si tienes preguntas sobre medicamentos cardiovasculares, tu cardiólogo es quien mejor puede orientarte. ¿Necesitas preparar preguntas para tu próxima consulta?"
  ],
  general: [
    "Puedo ayudarte con información general sobre prevención cardiovascular, nutrición, ejercicio y hábitos saludables. ¿Sobre qué tema específico te gustaría saber más?",
    "Estoy aquí para orientarte en salud cardiovascular. Recuerda que siempre debes consultar con un profesional para diagnósticos y tratamientos. ¿En qué puedo ayudarte?",
    "Mi objetivo es brindarte información útil sobre cuidado cardiovascular. Para decisiones médicas importantes, consulta siempre con tu cardiólogo. ¿Qué te gustaría saber?"
  ]
};

function detectarTema(mensaje) {
  const msg = mensaje.toLowerCase();
  
  if (msg.match(/hola|buenos|buenas|saludos|hey/)) return 'saludos';
  if (msg.match(/prevenir|prevención|evitar|cuidar|proteger/)) return 'prevencion';
  if (msg.match(/comer|comida|alimento|dieta|nutrición|receta/)) return 'nutricion';
  if (msg.match(/ejercicio|actividad|deporte|caminar|correr|gimnasio/)) return 'ejercicio';
  if (msg.match(/síntoma|dolor|molestia|siento|me duele|palpitación/)) return 'sintomas';
  if (msg.match(/estrés|estres|ansiedad|nervios|preocup|relaj/)) return 'estres';
  if (msg.match(/presión|hipertensión|tension|mmhg/)) return 'presion';
  if (msg.match(/colesterol|grasa|triglicérido/)) return 'colesterol';
  if (msg.match(/medicamento|medicina|pastilla|fármaco|droga|tomo/)) return 'medicamentos';
  
  return 'general';
}

function obtenerRespuesta(mensaje) {
  const tema = detectarTema(mensaje);
  const respuestas = cardiResponses[tema];
  const indice = Math.floor(Math.random() * respuestas.length);
  return respuestas[indice];
}

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    mensaje: 'API de Cardi funcionando correctamente',
    version: '1.0.0'
  });
});

app.post('/api/chat', (req, res) => {
  try {
    const { mensaje } = req.body;
    
    if (!mensaje || typeof mensaje !== 'string') {
      return res.status(400).json({ 
        error: 'El campo "mensaje" es requerido y debe ser texto'
      });
    }

    if (mensaje.trim().length === 0) {
      return res.status(400).json({ 
        error: 'El mensaje no puede estar vacío'
      });
    }

    const respuesta = obtenerRespuesta(mensaje);
    
    res.json({ respuesta });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      respuesta: 'Lo siento, tuve un problema al procesar tu mensaje. Intenta de nuevo.'
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🫀 Servidor Cardi ejecutándose en puerto ${PORT}`);
});
