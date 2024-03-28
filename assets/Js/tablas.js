document.addEventListener('DOMContentLoaded', function () {
    const tablaProductos = document.getElementById('tablaProductos');

    // Función para cargar los productos en la tabla
    function cargarProductos(productos) {
        // Limpiar la tabla antes de cargar los productos para evitar duplicados
        tablaProductos.innerHTML = '';

        // Recorremos todos los productos y los agregamos a la tabla
        productos.forEach(function (producto) {
            const fila = document.createElement('tr');

            const celdaNombre = document.createElement('td');
            const celdaPrecio = document.createElement('td');
            const celdaCantidad = document.createElement('td');

            celdaNombre.textContent = producto.nombre;
            celdaPrecio.textContent = `$${producto.precio.toFixed(2)}`;
            celdaCantidad.textContent = producto.stock;

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaCantidad);

            tablaProductos.appendChild(fila);
        });
    }

    // Obtener los datos de productos del archivo db.json
    function obtenerDatos() {
        fetch('/assets/db/db.json') // Ruta al archivo JSON
            .then(response => response.json())
            .then(data => {
                cargarProductos(data.productos);
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });
    }

    // Llamamos a la función para cargar los productos cuando la página se carga
    obtenerDatos();

});
