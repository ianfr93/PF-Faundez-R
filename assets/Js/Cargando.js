document.addEventListener('DOMContentLoaded', () => {
  let loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'block'; // Mostrar el indicador de carga cuando la página empiece a cargar
  }
});

window.addEventListener('load', () => {
  let loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none'; // Ocultar el indicador de carga cuando la página se haya cargado completamente
  }
});