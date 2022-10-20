import mongoose from 'mongoose';
var cart = mongoose.model('carritos');

const userCollectionName = 'usuarios';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true },
    cart: { type: mongoose.Schema.ObjectId, ref: "carritos" },
    role: { type: String, required: true }
});

userSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});

const userModel = mongoose.model(userCollectionName, userSchema);

export { userSchema, userModel };