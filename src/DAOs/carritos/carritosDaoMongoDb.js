import MongoContainer from '../../contenedores/ContenedorMongoDb.js';
import { cartsModel } from '../../models/cartSchema.js';

export default class CartsMongoDBDao extends MongoContainer {
    constructor() {
        super(cartsModel);
    }
    async desconectar() {
    }
}