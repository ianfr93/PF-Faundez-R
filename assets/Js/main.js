document.addEventListener("DOMContentLoaded", function () {
  const usuarios = [
    {
      usuario: "usuario1",
      contraseña: "contraseña1",
      perfil: {
        nombre: "Ian Faúndez Rubio",
        rut: "18408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Emiliano Zapata 693",
      },
    },
    {
      usuario: "usuario2",
      contraseña: "contraseña2",
      perfil: {
        nombre: "juan fernandez calvo",
        rut: "13402203-9",
        correo: "juanito.c@hotmail.com",
        direccion: "Santiago,centro",
      },
    },
    {
      usuario: "usuario3",
      contraseña: "contraseña3",
      perfil: {
        nombre: "marcelo rios",
        rut: "10708223-9",
        correo: "Chinorrios@hotmail.com",
        direccion: "lo barnechea las casas 45",
      },
    },
    {
      usuario: "usuario4",
      contraseña: "contraseña4",
      perfil: {
        nombre: "gabriel prieto",
        rut: "11408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Nuñoa 456",
      },
    },
    {
      usuario: "usuario5",
      contraseña: "contraseña5",
      perfil: {
        nombre: "luis miguel",
        rut: "11402303-9",
        correo: "luismi.a@hotmail.com",
        direccion: "coquimbo 345",
      },
    },
    {
      usuario: "usuario6",
      contraseña: "contraseña6",
      perfil: {
        nombre: "nicolas massu",
        rut: "13408103-1",
        correo: "nicolas.massu@hotmail.com",
        direccion: "la florida 233",
      },
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
