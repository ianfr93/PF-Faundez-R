document.addEventListener('DOMContentLoaded', function () {
  const categories = document.querySelectorAll('.category');
  const itemGroups = document.querySelectorAll('.item-group');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  // Inicializar la lista de productos vacía
  let productos = [];

  // Cargar los productos desde el archivo JSON
  fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
      // Asignar los datos del JSON a la variable productos
      productos = data;

      // Asignar 'todos' como la categoría inicial
      const initialCategory = 'todos';

      categories.forEach(function (category) {
        category.classList.remove('active');
      });

      // Mostrar todos los productos
      itemGroups.forEach(function (group) {
        group.style.display = 'block';
      });

      categories.forEach(function (category) {
        if (category.dataset.category === initialCategory) {
          category.classList.add('active');
        }
      });

      // Event listener para cambiar los productos según la categoría seleccionada
      categories.forEach(function (category) {
        category.addEventListener('click', function () {
          categories.forEach(function (c) {
            c.classList.remove('active');
          });

          category.classList.add('active');

          const selectedCategory = category.dataset.category;

          itemGroups.forEach(function (group) {
            if (group.id === selectedCategory || selectedCategory === 'todos') {
              group.style.display = 'block';
            } else {
              group.style.display = 'none';
            }
          });
        });
      });

      // Agregar evento de click al botón de búsqueda
      searchButton.addEventListener('click', function () {
        buscar();
      });
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });

  // Función para buscar productos
  function buscar() {
    const inputBusqueda = searchInput.value.trim().toLowerCase();

    itemGroups.forEach(function (group) {
      const productosEnGrupo = group.querySelectorAll('.product-name');
      let algunProductoCoincideEnGrupo = false;

      productosEnGrupo.forEach(function (producto) {
        const nombreProducto = producto.textContent.trim().toLowerCase();

        if (nombreProducto.includes(inputBusqueda)) {
          const idProducto = parseInt(producto.dataset.productId);
          const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === nombreProducto);

          if (productoEncontrado) {
            console.log("Producto encontrado:");
            console.log("ID:", productoEncontrado.id);
            console.log("Nombre:", productoEncontrado.nombre);
            console.log("Precio:", productoEncontrado.precio);
            console.log("Stock:", productoEncontrado.stock);
            console.log("Objeto:", productoEncontrado);
            console.log("-----------------------");
          }

          algunProductoCoincideEnGrupo = true;
        }
      });

      if (algunProductoCoincideEnGrupo || inputBusqueda === '') {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });
  }
});
