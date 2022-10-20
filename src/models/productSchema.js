import mongoose from 'mongoose';

const productCollectionName = 'productos';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

productSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});

const productsModel = mongoose.model(productCollectionName, productSchema);

export { productSchema, productsModel };