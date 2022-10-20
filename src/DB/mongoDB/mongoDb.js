import mongoose from "mongoose";
import { config } from "../../Config/config.js";

export const connectMongo = async () => {
    const URL = config.urlMongoDB;
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB Connected - MongoDB");
}