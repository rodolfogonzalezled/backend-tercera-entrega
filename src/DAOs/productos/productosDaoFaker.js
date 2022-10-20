import MemoryContainer from "../../contenedores/ContenedorMemoria.js";
import { generateProduct } from "../../utils/productsFaker.js";

export default class ProductsFakerDao extends MemoryContainer {

    constructor() {
        super();
    };

    populate(quantity = 50) {
        const newProducts = [];

        for (let i = 0; i < quantity; i++) {
            const newProduct = this.add(generateProduct());
            newProducts.push(newProduct);
        }
        return newProducts;
    }
}