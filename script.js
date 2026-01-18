/*********************************
 * LOGIN + SESIÓN
 *********************************/

let currentUser = "";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const loginScreen = document.getElementById("loginScreen");
  const appContainer = document.getElementById("appContainer");

  const userAvatar = document.getElementById("userAvatar");
  const profileAvatarLarge = document.getElementById("profileAvatarLarge");
  const postAvatar = document.getElementById("postAvatar");
  const profileName = document.getElementById("profileName");
  const welcomeMessage = document.getElementById("welcomeMessage");

  // 👉 Auto-login si hay sesión
  const savedUser = localStorage.getItem("healthcareUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser).name;
    enterApp();
  }

  // 👉 Login submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 🔑 evita recarga

    const name = usernameInput.value.trim();
    if (!name) return alert("Por favor ingresa tu nombre");

    currentUser = name;
    localStorage.setItem(
      "healthcareUser",
      JSON.stringify({ name })
    );

    enterApp();
  });

  function enterApp() {
    loginScreen.style.display = "none";
    appContainer.style.display = "block";

    const initials = currentUser
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (userAvatar) userAvatar.textContent = initials;
    if (profileAvatarLarge) profileAvatarLarge.textContent = initials;
    if (postAvatar) postAvatar.textContent = initials;
    if (profileName) profileName.textContent = currentUser;
    if (welcomeMessage)
      welcomeMessage.textContent = `¡Bienvenido/a, ${currentUser}!`;
  }
});

/*********************************
 * CHATBOT (DEMO LOCAL)
 *********************************/

const heartChatbot = document.getElementById("heartChatbot");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

heartChatbot?.addEventListener("click", () => {
  chatWindow.classList.toggle("active");
});

closeChat?.addEventListener("click", () => {
  chatWindow.classList.remove("active");
});

sendMessage?.addEventListener("click", sendChat);
chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendChat();
  }
});

function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const loading = addMessage("Escribiendo...", "bot");

  setTimeout(() => {
    updateMessage(loading, demoReply(text));
  }, 600);
}

function demoReply(text) {
  const msg = text.toLowerCase();

  if (msg.includes("presión"))
    return "Mantener la presión controlada es clave para la salud cardiovascular.";

  if (msg.includes("ejercicio"))
    return "Caminar 30 minutos diarios es una excelente forma de cuidar el corazón.";

  if (msg.includes("hola"))
    return `Hola ${currentUser || ""} 😊 ¿Cómo puedo ayudarte?`;

  return "Puedo ayudarte con información sobre prevención cardiovascular y hábitos saludables.";
}

/*********************************
 * UI MENSAJES
 *********************************/

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${type === "user" ? "user" : ""}`;

  if (type === "user") {
    const initials = currentUser
      ? currentUser.split(" ").map(n => n[0]).join("").slice(0, 2)
      : "U";

    msg.innerHTML = `
      <div class="message-avatar user-avatar">${initials}</div>
      <div class="message-bubble">${text}</div>
    `;
  } else {
    msg.innerHTML = `
      <svg class="message-avatar" viewBox="0 0 100 100">
        <path d="M50 85C50 85 15 60 15 35C15 20 25 15 35 15C42 15 47 19 50 25C53 19 58 15 65 15C75 15 85 20 85 35C85 60 50 85 50 85Z" fill="#E63946"/>
      </svg>
      <div class="message-bubble">${text}</div>
    `;
  }

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function updateMessage(msgElement, newText) {
  const bubble = msgElement.querySelector(".message-bubble");
  if (bubble) bubble.textContent = newText;
}



