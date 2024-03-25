document.addEventListener("DOMContentLoaded", function () {
  const usuarios = [
    {
      usuario: "usuario1",
      contraseña: "contraseña1",
     
    },
    {
      usuario: "usuario2",
      contraseña: "contraseña2",
     
    },
    {
      usuario: "usuario3",
      contraseña: "contraseña3",
     
    },
    {
      usuario: "usuario4",
      contraseña: "contraseña4",
     
    },
    {
      usuario: "usuario5",
      contraseña: "contraseña5",
      
    },
    {
      usuario: "usuario6",
      contraseña: "contraseña6",
     
    },
  ];

  let intentosRestantes = 4;

  function autenticarUsuario(event) {
    event.preventDefault();

    let nombreUsuario = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    let usuarioValido = usuarios.find(user => user.usuario === nombreUsuario && user.contraseña === contraseña);

    let mensajeElement = document.getElementById("mensaje");

    if (!usuarioValido) {
      intentosRestantes--;

      if (intentosRestantes > 0) {
        mensajeElement.innerHTML = `Nombre de usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`;
        mensajeElement.className = "error-message";
        mensajeElement.style.display = "block";
      } else {
        mensajeElement.innerHTML = "¡Se han agotado los intentos! Reinicie la sesión para intentar nuevamente.";
        resetForm();
      }
    } else {
      sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioValido));
      window.location.href = './pages/Menu-de-caja.html';
    }
  }

  function resetForm() {
    // Implementa la lógica para reiniciar el formulario si es necesario
  }

  let loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", autenticarUsuario);
  }

  const botonGuardar = document.getElementById("acceso");

  if (botonGuardar) {
    botonGuardar.addEventListener("click", function () {
      guardarYRedirigir();
    });
  }

  function guardarYRedirigir() {
    // Implementa la lógica para guardar y redirigir
  }

  const formulario = document.getElementById("loginForm");

  if (formulario) {
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(event.target);
      console.log(event.target[0]);
      console.log(event.target[1]);
      //console.log("Formulario enviado");
    });
  }
});
