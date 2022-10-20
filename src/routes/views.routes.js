import { Router } from "express";
import { products, carts } from '../DAOs/index.js';

const router = Router();

router.get("/", async (req, res) => {
    if (!req.session?.user) return res.redirect('/login');
    let productos = await products.getAll();
    res.render("pages/index", { user: req.session.user, products: productos });
});

router.get('/carrito', async (req, res) => {
    if (!req.session?.user) return res.redirect('/login');
    let cart = await carts.getById(req.session.user.cart);
    res.render('pages/carrito', { cart: cart });
});

router.get('/login', (req, res) => {
    if (req.session?.user) return res.redirect('/');
    res.render('pages/login');
})

router.get('/register', (req, res) => {
    if (req.session?.user) return res.redirect('/');
    res.render('pages/register');
})

export default router;