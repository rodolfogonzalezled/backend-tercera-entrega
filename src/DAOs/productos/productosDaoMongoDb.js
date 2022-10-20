import MongoContainer from '../../contenedores/ContenedorMongoDb.js';
import { productsModel } from '../../models/productSchema.js';

export default class ProductsMongoDBDao extends MongoContainer {
    constructor() {
        super(productsModel);
    }
    async desconectar() {
    }
}