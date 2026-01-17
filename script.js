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

