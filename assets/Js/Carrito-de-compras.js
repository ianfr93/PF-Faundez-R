// Función para calcular el total de la venta incluyendo el IVA
function calcularTotal(productos) {
  let total = 0;
  const IVA = 0.19; 
  productos.forEach(function (producto) {
    total += producto.precio * producto.cantidad;
  });
  // Calcular el monto del IVA y sumarlo al total
  const montoIVA = total * IVA;
  total += montoIVA;
  return total;
}

// Función para descontar el stock de un producto vendido
function descontarStock(nombreProducto, cantidad) {
  console.log("Descontando stock de " + nombreProducto + " en " + cantidad + " unidades.");

  // Actualizar el stock en el localStorage
  let stockActual = localStorage.getItem(nombreProducto);
  if (stockActual) {
    stockActual = parseInt(stockActual);
    let nuevoStock = stockActual - cantidad;
    localStorage.setItem(nombreProducto, nuevoStock);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar evento click a los botones "Añadir al carro"
  let botonesAgregar = document.querySelectorAll('.price button');
  botonesAgregar.forEach(function (boton) {
    boton.addEventListener('click', function () {
      let producto = boton.closest('.item-group');
      if (producto) {
        agregarAlCarrito(producto);
      }
    });
  });

  // Agregar evento click al botón "Borrar Venta"
  let btnBorrarVenta = document.getElementById('btnBorrarVenta');
  if (btnBorrarVenta) {
    btnBorrarVenta.addEventListener('click', function () {
      borrarVenta();
    });
  }

  // Función para agregar producto al carrito
  function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    // Obtener información del producto
    let nombreProducto = producto.querySelector('.product-name').textContent;
    let precioProducto = parseFloat(producto.querySelector('.now-price').textContent.replace('$', ''));

    // Buscar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Crear objeto de producto para agregar al carrito
      let nuevoProducto = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: 1
      };
      // Agregar el nuevo producto al carrito
      carrito.push(nuevoProducto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Actualizar la interfaz de usuario con el contenido del carrito
    actualizarCarritoUI(carrito);
  }

  // Función para eliminar producto del carrito
  function eliminarProductoCarrito(nombreProducto) {
    let carrito = obtenerCarrito();
    let indice = carrito.findIndex(item => item.nombre === nombreProducto);
    if (indice !== -1) {
      carrito.splice(indice, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarritoUI(carrito);
    }
  }

  // Función para aumentar la cantidad de un producto en el carrito
  function aumentarCantidad(nombreProducto) {
    let carrito = obtenerCarrito();
    let producto = carrito.find(item => item.nombre === nombreProducto);
    if (producto) {
      producto.cantidad += 1; // Incrementar la cantidad
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarritoUI(carrito);
    }
  }

  // Función para disminuir la cantidad de un producto en el carrito
  function disminuirCantidad(nombreProducto) {
    let carrito = obtenerCarrito();
    let producto = carrito.find(item => item.nombre === nombreProducto);
    if (producto && producto.cantidad > 1) {
      producto.cantidad -= 1; // Decrementar la cantidad
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarritoUI(carrito);
    }
  }

  // Función para borrar toda la venta y limpiar el carrito
  function borrarVenta() {
    // Limpiar el carrito en localStorage
    localStorage.removeItem('carrito');

    actualizarCarritoUI([]);
  }

  // Función para obtener el carrito del localStorage
  function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito');
    if (!carrito) {

      return [];
    }
    return JSON.parse(carrito);
  }

  // Recuperar el carrito al cargar la página
  let carrito = obtenerCarrito();
  actualizarCarritoUI(carrito);

  // Función para actualizar la interfaz de usuario con el contenido del carrito
  function actualizarCarritoUI(carrito) {
    let historialCompras = document.getElementById('historialCompras');
    if (historialCompras) {
      historialCompras.innerHTML = '';
      let totalCompra = 0;

      // Crear la tabla para mostrar los productos en el carrito
      let tablaCarrito = document.createElement('table');
      tablaCarrito.classList.add('carrito-table');
      let cabecera = tablaCarrito.createTHead();
      let filaCabecera = cabecera.insertRow();
      let celdaProducto = filaCabecera.insertCell();
      let celdaCantidad = filaCabecera.insertCell();
      let celdaPrecio = filaCabecera.insertCell();


      // Agregar elementos span para separar visualmente los textos en las celdas
      celdaProducto.innerHTML = '<span>Producto</span>';
      celdaCantidad.innerHTML = '<span>Cantidad</span>';
      celdaPrecio.innerHTML = '<span>Precio</span>';

      let cuerpoTabla = tablaCarrito.createTBody();

      carrito.forEach(function (producto) {
        let filaProducto = cuerpoTabla.insertRow();
        let celdaNombre = filaProducto.insertCell();
        let celdaCantidad = filaProducto.insertCell();
        let celdaPrecio = filaProducto.insertCell();
        let celdaEliminar = filaProducto.insertCell();

        celdaNombre.textContent = producto.nombre;

        // Botón de disminuir cantidad
        let botonDisminuir = document.createElement('button');
        botonDisminuir.textContent = '-';
        botonDisminuir.addEventListener('click', function () {
          disminuirCantidad(producto.nombre);
        });
        celdaCantidad.appendChild(botonDisminuir);

        // Mostrar la cantidad
        let spanCantidad = document.createElement('span');
        spanCantidad.textContent = producto.cantidad;
        celdaCantidad.appendChild(spanCantidad);

        // Botón de aumentar cantidad
        let botonAumentar = document.createElement('button');
        botonAumentar.textContent = '+';
        botonAumentar.addEventListener('click', function () {
          aumentarCantidad(producto.nombre);
        });
        celdaCantidad.appendChild(botonAumentar);

        celdaPrecio.textContent = '$' + (producto.precio * producto.cantidad).toFixed(2);

        // Ícono de eliminación
        let iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt', 'eliminar-icon');
        iconoEliminar.addEventListener('click', function () {
          eliminarProductoCarrito(producto.nombre);
        });
        celdaEliminar.appendChild(iconoEliminar);

        // Agregar la clase cantidad-buttons a la celda de cantidad
        celdaCantidad.classList.add('cantidad-buttons');

        // Calcular el total de la compra
        totalCompra += producto.precio * producto.cantidad;
      });

      historialCompras.appendChild(tablaCarrito);

      // Mostrar el total de la compra
      let totalCompraElement = document.getElementById('totalCompra');
      if (totalCompraElement) {
        totalCompraElement.textContent = 'Total: $' + totalCompra.toFixed(2);
      }

      // Mostrar el precio total en el botón "Total a pagar"
      let precioTotalElement = document.getElementById('precioTotal');
      if (precioTotalElement) {
        precioTotalElement.textContent = totalCompra.toFixed(2);
      }
    }
  }

  // Agregar evento click al botón "Total a pagar"
  let btnPagar = document.getElementById('btnPagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', function (event) {
      event.preventDefault();

      realizarPago();
    });
  }

  // Función para realizar el pago
  function realizarPago() {
    let productos = obtenerCarrito();
    let total = calcularTotal(productos);

    // Mostrar información de la venta en la consola
    console.log("Venta realizada:");
    console.log("Lista de productos:");
    productos.forEach(function (producto) {
      console.log(producto.nombre + " - Cantidad: " + producto.cantidad + " - Precio unitario: $" + producto.precio.toFixed(2) + " - Total: $" + (producto.precio * producto.cantidad).toFixed(2));
    });
    console.log("Total de la venta: $" + total.toFixed(2));

    // Verificar si el total es igual a 0
    if (total === 0) {
      // Mostrar mensaje de error
      alert('No puedes realizar el pago porque el carrito está vacío.');
    } else {
      // Descontar el stock de los productos vendidos
      productos.forEach(function (producto) {
        descontarStock(producto.nombre, producto.cantidad);
      });

      // Mostrar mensaje de alerta indicando que el pago se ha realizado con éxito
      alert('Pago realizado con éxito. ¡Gracias por tu compra!');

      // Limpiar el carrito después del pago exitoso
      borrarVenta();
    }
  }
});