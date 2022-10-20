
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const foto = document.getElementById("foto");
const descripcion = document.getElementById("descripcion");
const codigo = document.getElementById("codigo");
const stock = document.getElementById("stock");
let modificacion = null;

function guardarProducto(e) {
    e.preventDefault();

    let product = {
        nombre: nombre.value,
        precio: precio.value,
        foto: foto.value,
        descripcion: descripcion.value,
        codigo: codigo.value,
        stock: stock.value
    };

    if (modificacion) {
        fetch(`/api/productos/${modificacion}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {})
            .catch(error => console.error('Error:', error));
    } else {
        fetch('/api/productos/', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => swal("Elemento agregado al carrito", '', "success", {button: false, timer: 1000}))
            .catch(error => console.error('Error:', error));
    }

    nombre.value = "";
    precio.value = "";
    foto.value = "";
    descripcion.value = "";
    codigo.value = "";
    stock.value = "";
    modificacion = null;
    return false;
}

function borrarProducto(id) {
    fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {})
        .catch(error => console.error('Error:', error));
}

function modificarProducto(id) {
    obtenerProductoPorId(id)
        .then(producto => {
            if (producto) {
                nombre.value = producto.nombre ? producto.nombre : '';
                precio.value = producto.precio ? producto.precio : '';
                foto.value = producto.foto ? producto.foto : '';
                descripcion.value = producto.descripcion ? producto.descripcion : '';
                codigo.value = producto.codigo ? producto.codigo : '';
                stock.value = producto.stock ? producto.stock : '';
                modificacion = id;
            }
        })
        .catch(error => console.error('Error:', error));
}

async function obtenerProductoPorId(id) {
    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error)
    }
}