document.addEventListener('DOMContentLoaded', function () {
    const tablaProductos = document.getElementById('tablaProductos');

    // Función para cargar los productos en la tabla
    function cargarProductos() {
        // Limpiar la tabla antes de cargar los productos para evitar duplicados
        tablaProductos.innerHTML = '';

        // Recorremos todos los productos y los agregamos a la tabla
        productos.forEach(function (producto) {
            const fila = document.createElement('tr');
            fila.id = `producto${producto.id}`;

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

    // Llamamos a la función para cargar los productos cuando la página se carga
    cargarProductos();

    // Función para actualizar el stock de un producto
    function actualizarStock(nombreProducto, cantidad) {
        // Buscamos el producto por su nombre
        const producto = productos.find(p => p.nombre === nombreProducto);
        if (producto) {
            // Actualizamos el stock
            producto.stock -= cantidad;
            // Actualizamos la cantidad en la tabla
            const filaProducto = document.getElementById(`producto${producto.id}`);
            if (filaProducto) {
                const celdaCantidad = filaProducto.querySelector('td:nth-child(3)');
                if (celdaCantidad) {
                    celdaCantidad.textContent = producto.stock;
                }
            }
        }
    }

    // Aquí puedes agregar la lógica para descontar el stock cuando se realice una venta
    // Por ejemplo, podrías escuchar eventos de venta y llamar a la función actualizarStock()

    // Ejemplo de cómo actualizar el stock cuando se hace una venta
    // Suponiendo que tienes un evento "ventaRealizada" que se dispara cuando se hace una venta
    document.addEventListener('ventaRealizada', function (event) {
        const nombreProductoVendido = event.detail.nombreProducto;
        const cantidadVendida = event.detail.cantidad;

        actualizarStock(nombreProductoVendido, cantidadVendida);
    });
});
