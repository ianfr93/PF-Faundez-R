$(document).ready(function () {
    // Manejar el envío del formulario de cierre de caja
    $('form').submit(function (event) {
        event.preventDefault(); 

        // Obtener los valores del formulario
        let montoCierre = $('#montoCierre').val();
        let comentarios = $('#comentarios').val();

        // Validar el formulario
        if (montoCierre && comentarios) {
 
            Swal.fire({
                iconHtml: '<i class="fas fa-check-circle" style="color: green;"></i>',
                confirmButtonColor: '#2c5d70',
                title: 'Caja cerrada con éxito',
                text: '¡Gracias por tu trabajo!',
            });
        } else {
            // Mostrar mensaje de error si no se completaron todos los campos
            Swal.fire({
                confirmButtonColor: '#2c5d70',
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos.',
            });
        }
    });
});