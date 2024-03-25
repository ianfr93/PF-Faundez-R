document.addEventListener("DOMContentLoaded", function () {
  // Obtener usuarios existentes de localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Constructor de usuario
  class Usuario {
      constructor(usuario, email, password) {
          this.usuario = usuario;
          this.email = email;
          this.pass = password;
      }
  }

  // Función para guardar usuarios en localStorage
  function guardarEnLS(arr) {
      localStorage.setItem("usuarios", JSON.stringify(arr));
  }

  // Capturar el formulario de registro
  const formRegister = document.getElementById("registroForm");

  // Manejar el envío del formulario de registro
  formRegister.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const usuario = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Crear un nuevo usuario
      const newUser = new Usuario(usuario, email, password);

      // Agregar el nuevo usuario a la lista
      usuarios.push(newUser);

      // Guardar lista actualizada en localStorage
      guardarEnLS(usuarios);

      // Limpiar el formulario
      formRegister.reset();

      // Mostrar mensaje de éxito
      alert("Usuario registrado con éxito.");
  });
});
