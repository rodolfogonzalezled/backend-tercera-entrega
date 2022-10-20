import { Router } from "express";
import { isAdmin } from '../middlewares/isAdmin.js';
import ProductsFakerDao from '../DAOs/productos/productosDaoFaker.js';
import { products } from '../DAOs/index.js';

const router = Router();

router.get('/', async (req, res) => {
    res.json(await products.getAll());
});

router.get('/:id?', isAdmin, async (req, res) => {
    let product = await products.getById(req.params.id);
    res.json(product ?? { error: "Producto no encontrado" }
    );
});

router.post('/', isAdmin, async (req, res) => {
    res.json({ id: await products.add(req.body) });
});

router.put('/:id', isAdmin, async (req, res) => {
    let result = await products.updateById(req.params.id, req.body);
    result ? res.json(result) : res.sendStatus(200);
});

router.delete('/:id', isAdmin, async (req, res) => {
    let result = await products.deleteById(req.params.id);
    result ? res.json(result) : res.sendStatus(200);
});

const productsFaker = new ProductsFakerDao();
router.get('/productos-test/', async (req, res) => {
    res.json(await productsFaker.populate(5));
});

export default router;