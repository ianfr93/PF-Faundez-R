document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar las ventas del día en la tabla
    function mostrarVentasDelDia() {
        // Obtener las ventas del día del localStorage
        let ventasDelDia = JSON.parse(localStorage.getItem('ventasDelDia'));

        // Verificar si hay ventas del día
        if (ventasDelDia) {
            // Obtener la fecha actual en formato YYYY-MM-DD
            const fecha = new Date().toISOString().split('T')[0];

            // Obtener las ventas del día actual
            const ventas = ventasDelDia[fecha];

            // Verificar si hay ventas para mostrar
            if (ventas && ventas.length > 0) {
                let tablaVentas = document.getElementById('tablaVentas');

                // Limpiar la tabla antes de agregar nuevas ventas
                tablaVentas.innerHTML = '';

                // Iterar sobre las ventas del día y agregarlas a la tabla
                ventas.forEach(venta => {
                    // Formatear el precio del producto
                    const precioFormateado = new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP'
                    }).format(venta.precio);

                    let fila = `
                        <tr>
                            <td>${venta.nombre}</td>
                            <td>${precioFormateado}</td>
                            <td>${venta.cantidad}</td>
                        </tr>
                    `;
                    tablaVentas.innerHTML += fila;
                });
            }
        }
    }

    // Función para limpiar la tabla de ventas del día
    function limpiarTablaVentas() {

        let tablaVentas = document.getElementById('tablaVentas');

        // Limpiar la tabla
        tablaVentas.innerHTML = '';
    }

    // Llamar a la función para mostrar las ventas del día al cargar la página
    mostrarVentasDelDia();

    // Agregar evento de clic al botón para limpiar la tabla
    let btnLimpiarTabla = document.getElementById('btnLimpiarTabla');
    if (btnLimpiarTabla) {
        btnLimpiarTabla.addEventListener('click', function () {
            limpiarTablaVentas();
        });
    }
});