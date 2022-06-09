const express = require('express');
const routesProductos = require('./routes/routesProductos');
const routesCarrito = require('./routes/routesCarrito');
const morgan = require('morgan');

const app = express();

//Midddlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/productos', routesProductos);
app.use('/api/carrito', routesCarrito);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
