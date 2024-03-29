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

    if (!usuarioValido) {
      // Reducir el número de intentos restantes
      intentosRestantes--;

      if (intentosRestantes > 0) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Nombre de usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`,
          confirmButtonColor: '#2c5d70',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      } else {
        // Si se agotan los intentos, mostrar mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡Se han agotado los intentos! Reinicie la sesión para intentar nuevamente.',
          confirmButtonColor: '#2c5d70',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
        resetForm();
      }

      console.log("Intento de inicio de sesión fallido para el usuario:", nombreUsuario);
    } else {
      // Si las credenciales son válidas, almacenar usuario en sessionStorage y redirigir
      sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioValido));

      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: `¡Bienvenido, ${nombreUsuario}!`,
        iconHtml: '<i class="fas fa-check-circle" style="color: green;"></i>',
        confirmButtonColor: '#2c5d70',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = './pages/Menu-de-caja.html';
      });
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