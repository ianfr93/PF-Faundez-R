let usuarios = [{
    usuario: "usuario1",
    contraseña: "contraseña1"
  },
  {
    usuario: "usuario2",
    contraseña: "contraseña2"
  },
  {
    usuario: "usuario3",
    contraseña: "contraseña3"
  },
  {
    usuario: "usuario4",
    contraseña: "contraseña4"
  },
  {
    usuario: "usuario5",
    contraseña: "contraseña5"
  },
  {
    usuario: "usuario6",
    contraseña: "contraseña6"
  }
];

let intentosRestantes = 4;

function autenticarUsuario(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  let nombreUsuario = document.getElementById("username").value;
  let contraseña = document.getElementById("password").value;

  let usuarioValido = usuarios.find(user => user.usuario === nombreUsuario && user.contraseña === contraseña);

  // Obtén el elemento del mensaje
  let mensajeElement = document.getElementById("mensaje");

  if (!usuarioValido) {
    // Decrementa los intentos restantes antes de mostrar el mensaje de error
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
    // Redirige al usuario al dashboard solo si los datos son válidos
    window.location.href = './pages/Menu-de-caja.html';
    // Agrega un evento al botón que abrirá la ventana modal
document.getElementById("botonAbrirVentana").addEventListener("click", function () {
  // Muestra la ventana modal
  $('#ventanaFlotante').modal('show');
});
  }
}

document.getElementById("acceso").addEventListener("click", function (event) {
  if (intentosRestantes > 4) {
    autenticarUsuario(event);
  }

});


