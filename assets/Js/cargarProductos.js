document.addEventListener('DOMContentLoaded', function () {
  const categories = document.querySelectorAll('.category');
  const itemGroups = document.querySelectorAll('.item-group');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Función para cargar los datos de productos de forma asíncrona desde el archivo db.json
  const getData = async () => {
    try {
      const respuesta = await fetch('/assets/db/db.json');
      const productos = await respuesta.json();
      return productos;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Función para buscar productos por nombre
  function buscar() {
    const inputBusqueda = searchInput.value.trim().toLowerCase();

    itemGroups.forEach(function (group) {
      const productosEnGrupo = group.querySelectorAll('.product-name');
      let algunProductoCoincideEnGrupo = false;

      productosEnGrupo.forEach(function (producto) {
        const nombreProducto = producto.textContent.trim().toLowerCase();

        if (nombreProducto.includes(inputBusqueda)) {
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

  // Asignar 'todos' como la categoría inicial
  const initialCategory = 'todos';

  categories.forEach(function (category) {
    category.classList.remove('active');
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

  // Cargar datos y ejecutar funciones necesarias después de obtener los datos
  getData()
    .then(productos => {
      // Almacenar los productos obtenidos en una variable global
      window.productos = productos;
      // Llamar a las funciones necesarias después de obtener los datos
      // Por ejemplo, aquí podrías llamar a la función para crear la interfaz HTML con los productos
      crearInterfaz(productos); // Llama a una función para crear la interfaz con los productos
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
    });
  
  // Función para crear la interfaz HTML con los productos
  function crearInterfaz(productos) {
    // Aquí puedes crear la interfaz HTML con los productos utilizando los datos obtenidos
    // Por ejemplo:
    // productos.forEach(producto => {
    //   // Crea elementos HTML para cada producto y agrega al DOM
    // });
  }

});
