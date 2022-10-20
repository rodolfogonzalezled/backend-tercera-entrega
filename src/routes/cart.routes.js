import { Router } from "express";
import { carts, products } from '../DAOs/index.js';

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

export default router;