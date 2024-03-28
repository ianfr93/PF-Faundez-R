document.addEventListener('DOMContentLoaded', function () {
  const categories = document.querySelectorAll('.category');
  const itemGroups = document.querySelectorAll('.item-group');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Declarar el array de productos como variable global
  let productos;

  // Función para cargar los datos de forma asíncrona
  const getData = async (url) => {
    try {
      const respuesta = await fetch(url);

      console.log(respuesta)
      const datos = await respuesta.json();
      console.log(datos);
      // Desestructurar los datos y asignarlos a la variable global 'productos'
      productos = datos.productos; // Asumiendo que el nombre del array es 'productos'

      // Después de obtener los datos, llamar a las funciones necesarias
      crearHtml(productos); // Asumiendo que existe la función crearHtml
      agregarEventos(productos); // Asumiendo que existe la función agregarEventos
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

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

// URL de la API o archivo JSON
const API_URL = "./db/db.json";

  // Llamar a la función para obtener los datos
  getData(API_URL);

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
});
