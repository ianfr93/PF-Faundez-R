document.addEventListener("DOMContentLoaded", function () {
  // Obtener usuarios existentes de localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let intentosRestantes = 4;

  // Función para autenticar al usuario
  function autenticarUsuario(event) {
      event.preventDefault();

      // Obtener nombre de usuario y contraseña del formulario
      const nombreUsuario = document.getElementById("username").value;
      const contraseña = document.getElementById("password").value;

      // Buscar el usuario en la lista de usuarios
      const usuarioValido = usuarios.find(user => user.usuario === nombreUsuario && user.password === contraseña);

      // Elemento para mostrar mensajes
      const mensajeElement = document.getElementById("mensaje");

      if (!usuarioValido) {
          // Reducir el número de intentos restantes
          intentosRestantes--;

          if (intentosRestantes > 0) {
              // Mostrar mensaje de error y actualizar los intentos restantes
              mensajeElement.innerHTML = `Nombre de usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`;
              mensajeElement.className = "error-message";
              mensajeElement.style.display = "block";
          } else {
              // Si se agotan los intentos, mostrar mensaje y reiniciar formulario
              mensajeElement.innerHTML = "¡Se han agotado los intentos! Reinicie la sesión para intentar nuevamente.";
              resetForm();
          }

          console.log("Intento de inicio de sesión fallido para el usuario:", nombreUsuario); // Mensaje adicional en consola
      } else {
          // Si las credenciales son válidas, almacenar usuario en sessionStorage y redirigir
          sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioValido));
          window.location.href = './pages/Menu-de-caja.html';

          console.log("Inicio de sesión exitoso para el usuario:", nombreUsuario); // Mensaje adicional en consola
      }
  }

  // Función para reiniciar el formulario
  function resetForm() {
      document.getElementById("loginForm").reset();
  }

  // Capturar el formulario de inicio de sesión
  const loginForm = document.getElementById("loginForm");

  // Manejar el envío del formulario de inicio de sesión
  if (loginForm) {
      loginForm.addEventListener("submit", autenticarUsuario);
  }
});
