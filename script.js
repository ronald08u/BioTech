// Navegación entre pestañas
function openTab(event, tabId, title) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    const navItems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }

    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");
    document.getElementById("header-title").innerText = title;

    // Vibración ligera al tocar (solo en dispositivos compatibles)
    if (window.navigator.vibrate) window.navigator.vibrate(5);
}

// Lógica de Chatbot
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    if (input.value.trim() === "") return;

    // Mensaje de Usuario
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.textContent = input.value;
    chatBox.appendChild(userDiv);

    const texto = input.value.toLowerCase();
    input.value = "";

    // Respuesta Automática
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot';
        
        if (texto.includes("hola")) {
            botDiv.textContent = "¡Hola! ¿Cómo puedo ayudarte hoy?";
        } else if (texto.includes("perfil")) {
            botDiv.textContent = "Puedes ver tu perfil en la cuarta pestaña del menú inferior.";
        } else {
            botDiv.textContent = "Entiendo. ¿Podrías darme más detalles sobre eso?";
        }

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 700);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Buscador superior
function abrirBuscador() {
    const busqueda = prompt("¿Qué estás buscando?");
    if (busqueda) {
        alert("Buscando '" + busqueda + "' en la aplicación...");
    }
}
