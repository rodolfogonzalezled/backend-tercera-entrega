import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 9090,
    useDB: process.env.USE_DB || 'mongodb',
    urlMongoDB: process.env.URL_MONGO || 'mongodb://localhost:27017/ecommerce',
    secretSession: process.env.SECRET_SESSION || 'CoderSecret',
    superAdmin: process.env.SUPER_ADMIN,
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
};