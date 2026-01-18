const heartChatbot = document.getElementById("heartChatbot");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

// abrir / cerrar
heartChatbot.addEventListener("click", () => {
  chatWindow.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  chatWindow.classList.remove("active");
});

// enviar
sendMessage.addEventListener("click", sendChat);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendChat();
  }
});

function addMessage(text, isUser) {
  const div = document.createElement("div");
  div.className = `chat-message ${isUser ? "user" : ""}`;
  div.innerHTML = `<div class="message-bubble">${text}</div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, true);
  chatInput.value = "";

  const typing = addMessage("Escribiendo...", false);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    typing.remove();
    addMessage(data.reply, false);
  } catch (err) {
    typing.remove();
    addMessage("Error de conexión con el servidor", false);
  }
}


