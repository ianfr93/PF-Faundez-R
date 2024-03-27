// Función para mostrar las ventas del día en la página "Ventas del día"
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
            // Obtener la referencia a la tabla en la página "Ventas del día"
            let tablaVentas = document.querySelector('#tablaVentas tbody');

            // Limpiar la tabla antes de agregar nuevas ventas
            tablaVentas.innerHTML = '';

            // Iterar sobre las ventas del día y agregarlas a la tabla
            ventas.forEach(venta => {
                let fila = `
                    <tr>
                        <td>${venta.nombre}</td>
                        <td>${venta.precio}</td>
                        <td>${venta.cantidad}</td>
                    </tr>
                `;
                tablaVentas.innerHTML += fila;
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Llamar a la función para mostrar las ventas del día al cargar la página
    mostrarVentasDelDia();
});