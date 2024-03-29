document.addEventListener("DOMContentLoaded", function () {
  // Función para obtener el valor seleccionado de un select
  function obtenerValorSelect(idSelect) {
    const selectElement = document.getElementById(idSelect);
    return selectElement.options[selectElement.selectedIndex].text;
  }

  // Función para validar los campos del formulario
  function validarCampos() {
    let empresa = obtenerValorSelect('selectEmpresa');
    let caja = obtenerValorSelect('selectCaja');
    let imprimir = obtenerValorSelect('selectImprimir');
    let tipoDocumento = obtenerValorSelect('selectDocumento');
    let monto = parseFloat(document.getElementById('monto').value);

    switch (true) {
      case (empresa === 'Seleccione' || caja === 'Seleccione' || imprimir === 'Seleccione' || tipoDocumento === 'Seleccione'):
        Swal.fire({
          confirmButtonColor: '#2c5d70',
          icon: 'error',
          title: 'Error',
          text: 'Por favor, seleccione todas las opciones antes de continuar.'
        });
        return false;
      case (monto <= 0 || isNaN(monto)):
        Swal.fire({
          confirmButtonColor: '#2c5d70',
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un monto válido mayor que cero.'
        });
        return false;
      default:
        return true;
    }
  }

  // Función para guardar y redirigir si los campos son válidos
  function guardarYRedirigir() {
    if (validarCampos()) {
      Swal.fire({
        confirmButtonColor: '#2c5d70',
        iconHtml: '<i class="fas fa-check-circle" style="color: green;"></i>',
        title: 'Éxito',
        text: 'Datos válidos. Guardando y redirigiendo desde la pantalla de caja...'
      }).then(() => {
        window.location.href = './dashboard.html';
      });
    }
  }
});