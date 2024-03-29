document.addEventListener('DOMContentLoaded', function () {
    // Obtener el botón y la ventana emergente
    const btnProductoPorGlosa = document.getElementById('btnProductoPorGlosa');
    const popupWindow = document.getElementById('popupWindow');
    const closePopup = document.getElementById('closePopup');


    btnProductoPorGlosa.addEventListener('click', function () {
        // Mostrar la ventana emergente
        popupWindow.style.display = 'block';
        // Cargar el contenido de la ventana emergente
        cargarContenidoPopup();
    });


    closePopup.addEventListener('click', function () {
        // Ocultar la ventana emergente al hacer clic en el botón de cerrar
        popupWindow.style.display = 'none';
    });

    // Función para cargar el contenido de la ventana emergente
    async function cargarContenidoPopup() {
        // Contenido de la ventana emergente
        const popupContent = document.getElementById('popupContent');
        popupContent.innerHTML = `
            <h3 style="color: white;">Buscar Producto por Código de Barras o SKU</h3>
            <input type="text" id="codigoInput" placeholder="Código de Barras o SKU">
            <button id="btnBuscar">Buscar</button>
            <div id="resultado"></div>
        `;

        // Agregar evento de clic al botón de búsqueda
        document.getElementById('btnBuscar').addEventListener('click', async function () {
            const codigo = document.getElementById('codigoInput').value;
            // Realizar búsqueda en la base de datos y mostrar resultados
            await buscarProductoPorCodigo(codigo);
        });
    }

    // Función para cargar los datos de los productos desde db.json
    async function cargarDatosProductos() {
        try {
            const response = await fetch('/assets/db/db.json');
            const data = await response.json();
            return data.productos;
        } catch (error) {
            console.error('Error al cargar los datos de los productos:', error);
            return [];
        }
    }

    // Función para buscar el producto en la base de datos
    async function buscarProductoPorCodigo(codigo) {
        // Cargar los datos de los productos
        const productos = await cargarDatosProductos();

        // Realizar la búsqueda del producto por código de barras o SKU
        const productoEncontrado = productos.find(producto => producto.codigo_barras === codigo || producto.sku === codigo);

        // Mostrar el resultado de la búsqueda
        mostrarResultado(productoEncontrado);
    }

    // Función para mostrar el resultado de la búsqueda
    function mostrarResultado(productoEncontrado) {
        const resultadoElement = document.getElementById('resultado');
        if (productoEncontrado) {
            // Mostrar información del producto
            resultadoElement.innerHTML = `
                <h5 style="color: white;">${productoEncontrado.nombre}</h5>
                <p>Precio: ${productoEncontrado.precio}</p>
                <p>Stock: ${productoEncontrado.stock}</p>
                <p>SKU: ${productoEncontrado.sku}</p>
                <p>Código de Barras: ${productoEncontrado.codigo_barras}</p>
                <button id="btnAceptar">Aceptar</button>
            `;

            // Agregar evento de clic al botón de aceptar
            document.getElementById('btnAceptar').addEventListener('click', function () {
    
                popupWindow.style.display = 'none';
            });
        } else {
            resultadoElement.textContent = 'Producto no encontrado.';
        }
    }
});