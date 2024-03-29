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
          // Mostrar mensaje de error 
          Swal.fire({
              icon: 'error',
              confirmButtonColor: '#2c5d70',
              title: 'Error',
              text: 'El nombre de usuario ya está en uso.'
          });
          console.log("Nombre de usuario ya en uso:", usuario); 
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
      Swal.fire({
          iconHtml: '<i class="fas fa-check-circle" style="color: green;"></i>',
          confirmButtonColor: '#2c5d70',
          title: 'Éxito',
          text: '¡Usuario registrado con éxito!'
      }).then((result) => {
          // Redireccionar a la página index
          window.location.href = "index.html";
      });

      console.log("Nuevo usuario registrado:", newUser); 
  });
});
