import { Router } from "express";
import { carts, products } from '../DAOs/index.js';
import mailingService from "../services/mailing.js";

const router = Router();

router.post('/', async (req, res) => {
    let product;
    if (req.body.id) {
        product = await products.getById(req.body.id);
    }
    
    let cart = await carts.add({ productos: [{ ...product, cantidad: 1 }] });
    res.json({ id: cart });
})

router.delete('/:id', async (req, res) => {
    let result = await carts.deleteById(req.params.id);
    result ? res.json(result) : res.sendStatus(200);
})

router.get('/:id/productos', async (req, res) => {
    let cart = await carts.getById(req.params.id);
    res.json(cart ? cart.productos : { error: "Carrito no encontrado" });
})

router.post('/:id/productos', async (req, res) => {
    let cart = await carts.getById(req.params.id);
    if (cart) {
        let product = await products.getById(req.body.id);
        if (product) {
            let productos = cart.productos ? cart.productos : [];
            
            let productIndex = productos.findIndex((e) => e.id ? e.id == product.id : e._id.toString() == product._id.toString());

            if (productIndex != -1) {
                productos[productIndex] = { ...productos[productIndex], cantidad: productos[productIndex].cantidad + 1 }
            } else {
                productos.push({ ...product._doc, cantidad: 1 });
            }
            res.json(await carts.updateById(req.params.id, { productos: productos }));
        } else {
            res.json({ error: "Producto no encontrado" });
        }
    } else {
        res.json({ error: "Carrito no encontrado" });
    }
})

router.delete('/:id/productos/:id_prod?', async (req, res) => {
    let cart = await carts.getById(req.params.id);

    if (cart) {
        let productos = cart.productos ? cart.productos : [];

        let idProduct = req.params.id_prod;
        if (idProduct) {
            productos = productos.filter(producto => producto.id ? producto.id != idProduct : producto._id != idProduct);
        } else {
            productos = [];
        }
        await carts.updateById(req.params.id, { productos: productos });
        res.sendStatus(200);
    } else {
        res.json({ error: "Carrito no encontrado" });
    }
});

router.post('/:id/order', async (req, res) => {
    let cart = await carts.getById(req.params.id);
    if (cart) {
        let productos = cart.productos ? cart.productos : [];

        if (productos.length) {

            let subject = `Nuevo pedido de ${req.session.user.name}, ${req.session.user.email}`;

            let html = '<h1> Compra realizada </h1>';
            html += '<ul>';

            let precioTotal = 0;
            productos.forEach(product => {
                let subtotal = product.precio * product.cantidad;
                precioTotal += subtotal;
                html += `<li>
                    <div style="text-align: center; justify-content: space-between; display: flex;">
                        <div>
                            <img style="border-radius: 8%; height: 5em; border: solid 1px" src='${product.foto}'>
                        </div>
                        <div style="flex-direction: column; text-align: left;">
                            <div><b>Nombre:</b> ${product.nombre}</div>
                            <div><b>Precio Unitario:</b>$ ${product.precio}</div>
                        </div>
                        <div style="text-align: left;">
                            <div><b>Cantidad:</b> ${product.cantidad}</div>
                        </div>
                        <div style="text-align: center;">
                            <div><b>Subtotal:</b>$ ${subtotal} </div>
                        </div>
                    </div>
                </li>`
            });
            html += '</ul>';
            html += `<h3><b>Total a pagar: </b> ${precioTotal} </h3>`;

            const email = new mailingService();
            email.sendMail({
                from: 'Ecommerce Rodolfo',
                to: req.session.user.email,
                subject, 
                html
            });

            productos.map(async product => {
                await products.updateById(product._id, { stock: product.stock-product.cantidad });
            });

            await carts.updateById(req.params.id, { productos: [] });

            res.sendStatus(200);
        }
    } else {
        res.json({ error: "Carrito no encontrado" });
    }
})

export default router;