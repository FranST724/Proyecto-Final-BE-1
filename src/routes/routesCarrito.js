const Contenedor = require('../contenedor');
const { Router } = require('express');
const router = Router();

let contenedorCarrito = new Contenedor();

router.get('/', async (req, res) => {
	console.log('Mostrando el carrito');
	res.send('okay');
});

module.exports = router;
