document.addEventListener('DOMContentLoaded', function() {
  var loader = document.getElementById('loader');
  loader.style.display = 'block'; // Mostrar el indicador de carga cuando la página empiece a cargar
});

window.addEventListener('load', function() {
  var loader = document.getElementById('loader');
  loader.style.display = 'none'; // Ocultar el indicador de carga cuando la página se haya cargado completamente
});