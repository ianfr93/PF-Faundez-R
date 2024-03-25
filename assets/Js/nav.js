document.addEventListener("DOMContentLoaded", function() {
    // Obtener el usuario autenticado desde el almacenamiento local
    const usuarioAutenticado = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));

    // Verificar si hay un usuario autenticado
    if (usuarioAutenticado) {
        // Obtener el nombre completo del usuario
        const nombreCompletoUsuario = usuarioAutenticado.nombreCompleto;

        // Crear el nuevo elemento del perfil de usuario
        const nuevoElementoPerfilUsuario = document.createElement("li");
        nuevoElementoPerfilUsuario.classList.add("nav-item");
        nuevoElementoPerfilUsuario.classList.add("dropdown");
        nuevoElementoPerfilUsuario.classList.add("user-dropdown");

        // Crear el contenido del perfil de usuario
        nuevoElementoPerfilUsuario.innerHTML = `
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user fa-sm"></i> ${nombreCompletoUsuario}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="./Ver-mi perfil.html">Ver Perfil de Usuario</a>
            </div>
        `;

        // Insertar el nuevo elemento del perfil de usuario antes del botón "Cerrar Sesión"
        const cerrarSesionElemento = document.querySelector(".navbar-nav .nav-item:nth-child(4)");
        cerrarSesionElemento.parentNode.insertBefore(nuevoElementoPerfilUsuario, cerrarSesionElemento.nextSibling);

        // Agregar evento de clic al enlace dropdown-toggle para mostrar/ocultar el menú desplegable
        const dropdownToggle = nuevoElementoPerfilUsuario.querySelector('#navbarDropdownMenuLink');
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            const dropdownMenu = nuevoElementoPerfilUsuario.querySelector('.dropdown-menu');
            dropdownMenu.classList.toggle('show');
        });
    }
});
