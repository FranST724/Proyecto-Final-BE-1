const Contenedor = require('../contenedor');
const { Router } = require('express');
const router = Router();

let contenedor = new Contenedor('productos.txt');

const Admin = true;

router.get('/', async (req, res) => {
	console.log('Mostrando todos los productos');
	let productos = await contenedor.getAll();
	res.send(productos);
});

router.get('/:id', async (req, res) => {
	let { id } = req.params;
	let productoPorId = await contenedor.getById(parseInt(id));
	res.json(productoPorId);
});

router.post('/', async (req, res) => {
	let data = req.body;
	if (data.title) {
		await contenedor.save(data);
	}
	res.json('Objeto guardado exitosamente');
});

router.put('/:id', async (req, res) => {
	let { id } = req.params;
	let data = req.body;
	if (data.title) {
		await contenedor.update(data, id);
	}
	res.json('exito');
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await contenedor.deleteById(parseInt(id));
	res.json({ mensaje: 'producto eliminado exitosamente' });
});

module.exports = router;
