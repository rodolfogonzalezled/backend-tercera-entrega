import faker from "faker";
faker.locale = 'es';

export const generateProduct = () => {
    return {
        timestamp: faker.date.recent(),
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.imageUrl(),
        descripcion: faker.commerce.productDescription(),
        codigo: faker.random.uuid(),
        stock: faker.random.number()
    }
};


