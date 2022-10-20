// ---------------------- MEMORY ---- --------------------------
import ProductsMemoryDao from './productos/productosDaoMem.js';     // Memory
import CartsMemoryDao from './carritos/carritosDaoMem.js';          // Memory

// ---------------------- FILE SYSTEM --------------------------
import ProductsFileDao from './productos/productosDaoArchivo.js';   // fileSystem
import CartsFileDao from './carritos/carritosDaoArchivo.js';        // fileSystem

// ---------------------- MONGODB --------------------------------
import ProductsMongoDBDao from './productos/productosDaoMongoDb.js'; // MongoDB
import CartsMongoDBDao from './carritos/carritosDaoMongoDb.js';      // MongoDB
import { connectMongo } from '../DB/mongoDB/mongoDb.js';

// ---------------------- FIREBASE --------------------------------
import ProductsFirebaseDao from './productos/productosDaoFirebase.js'; //Firebase
import CartsFirebaseDao from './carritos/carritosDaoFirebase.js';      //Firebase
import { config } from '../Config/config.js';

let products;
let carts;

switch (config.useDB) {
    case 'mongodb':
        connectMongo();
        products = new ProductsMongoDBDao();  //MongoDB
        carts = new CartsMongoDBDao();        //MongoDB
        break;
    case 'firebase':
        products = new ProductsFirebaseDao(); //Firebase
        carts = new CartsFirebaseDao();       //Firebase
        break;
    case 'memory':
        products = new ProductsMemoryDao();    //Memory
        carts = new CartsMemoryDao();          //Memory
        break;
    default:
        products = new ProductsFileDao();  // fileSystem
        carts = new CartsFileDao();        // fileSystem
        break;
}

export { products, carts };
