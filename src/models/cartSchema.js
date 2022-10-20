import mongoose from 'mongoose';
import { productSchema } from './productSchema.js';

const cartCollectionName = 'carritos';

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, default: [] }
});

cartSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});

const cartsModel = mongoose.model(cartCollectionName, cartSchema);

export { cartSchema, cartsModel };