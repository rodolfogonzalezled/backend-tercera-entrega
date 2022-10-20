import mongoose from 'mongoose';

export const authorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    nombre: { type: String },
    apellido: { type: String },
    edad: { type: Number },
    alias: { type: String },
    avatar: { type: String }
});

authorSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});
