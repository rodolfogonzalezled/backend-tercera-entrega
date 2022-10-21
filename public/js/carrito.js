function agregarAlCarrito(idCarrito, idProducto) {
    fetch(`/api/carrito/${idCarrito}/productos`, {
        method: 'POST',
        body: JSON.stringify({ id: idProducto }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => console.error('Error:', error));
}

function borrarProductoCarrito(idCarrito, idProducto) {
    fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => window.location.reload())
        .catch(error => console.error('Error:', error));
}

function vaciarCarrito(idCarrito) {
    fetch(`/api/carrito/${idCarrito}/productos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        swal("Elementos borrados del carrito", '', "error", {button: false, timer: 1000});
        window.location.reload();
    })
    .catch(error => console.error('Error:', error));
}

function finalizarCarrito(idCarrito) {
    fetch(`/api/carrito/${idCarrito}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        swal("Compra finalizada", '', "success", {button: false, timer: 2000})
        window.location.reload();
    })
    .catch(error => console.error('Error:', error));
}