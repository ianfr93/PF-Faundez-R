document.addEventListener("DOMContentLoaded", function () {
  // Obtener usuarios existentes de localStorage o inicializar como array vacío
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Capturar el formulario de registro
  const formRegistro = document.getElementById("loginForm");

  // Manejar el envío del formulario de registro
  formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const nombreCompleto = document.getElementById("nombreCompleto").value;
      const usuario = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Verificar si el usuario ya existe
      if (usuarios.some(user => user.usuario === usuario)) {
          showMessage("danger", "El nombre de usuario ya está en uso.");
          console.log("Nombre de usuario ya en uso:", usuario); // Mensaje adicional en consola
          return;
      }

      // Crear un nuevo usuario
      const newUser = {
          nombreCompleto: nombreCompleto,
          usuario: usuario,
          email: email,
          password: password
      };

      // Agregar el nuevo usuario a la lista
      usuarios.push(newUser);

      // Guardar lista actualizada en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Limpiar el formulario
      formRegistro.reset();

      // Mostrar mensaje de éxito
      showMessage("success", "¡Usuario registrado con éxito!");
      console.log("Nuevo usuario registrado:", newUser); // Mensaje adicional en consola
  });

  // Función para mostrar mensajes
  function showMessage(type, message) {
      var mensajeDiv = document.getElementById("mensaje");
      mensajeDiv.innerHTML = message;
      mensajeDiv.classList.add("alert-" + type);
      mensajeDiv.style.display = "block";

      // Ocultar el mensaje después de 3 segundos
      setTimeout(function () {
          mensajeDiv.style.display = "none";
          mensajeDiv.classList.remove("alert-" + type);
      }, 3000);
  }
});
