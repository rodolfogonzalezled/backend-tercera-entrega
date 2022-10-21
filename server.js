import __dirname from './dirname.js';
import express from 'express';
import { config } from './src/Config/config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import viewsRoutes from './src/routes/views.routes.js';
import productsRoutes from './src/routes/product.routes.js';
import cartsRoutes from './src/routes/cart.routes.js';
import sessionRoutes from './src/routes/session.routes.js';
import passport from 'passport';
import initializePassport from './src/Config/passport.config.js';

const app = express();

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.urlMongoDB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10000
    }),
    secret: config.secretSession,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());

app.use('/', viewsRoutes);
app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartsRoutes);
app.use('/api/session', sessionRoutes);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));               // con http://localhost:9090/
app.set("views",  __dirname + "/public/views");
app.set("view engine", "ejs");

// --- Conexión del Servidor ------------------------------------------------------------
const PORT = config.port;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
});
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));