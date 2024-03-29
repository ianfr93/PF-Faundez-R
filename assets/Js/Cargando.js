document.addEventListener("DOMContentLoaded", function() {
  // Retrasar la ocultación del overlay por 1 segundo (1200 milisegundos)
  setTimeout(function() {
    document.getElementById("loading-overlay").style.display = "none";
  }, 1200);
});