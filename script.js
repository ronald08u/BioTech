function openTab(event, tabId, title) {
    // 1. Ocultar todos los contenidos de pestañas
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 2. Quitar la clase 'active' de todos los botones
    const navItems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }

    // 3. Mostrar la pestaña actual y añadir 'active' al botón
    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");

    // 4. Cambiar el título del header
    document.getElementById("header-title").innerText = title;

    // Feedback táctil (opcional para móviles)
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

function activarBusqueda() {
    let query = prompt("¿Qué deseas buscar?");
    if(query) alert("Buscando: " + query);
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    if (input.value.trim() !== "") {
        // Mensaje del usuario
        const userDiv = document.createElement('div');
        userDiv.className = 'msg user';
        userDiv.textContent = input.value;
        chatBox.appendChild(userDiv);

        // Respuesta simulada del Bot
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'msg bot';
            botDiv.textContent = "Estoy procesando tu solicitud...";
            chatBox.appendChild(botDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 600);

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
