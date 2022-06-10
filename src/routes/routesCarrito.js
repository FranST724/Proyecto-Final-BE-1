const Contenedor = require('../contenedor');
const ContenedorCarritos = require('../contenedorCarrito');
const { Router } = require('express');
const router = Router();

const archivoProductos = new Contenedor('productos.txt');
const archivoCarrito = new ContenedorCarritos('carritos.txt');

router.post('/', async (req, res) => {
	const newCart = await archivoCarrito.createCart();
	res.json({ idCarrito: newCart });
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const nuevoArchivo = await archivoCarrito.deleteById(parseInt(id));
	res.json({ CarritoEliminado: nuevoArchivo });
});

router.get('/:id/productos', async (req, res) => {
	const { id } = req.params;
	const productosCarrito = await archivoCarrito.getAllById(parseInt(id));
	res.json(productosCarrito);
});

router.post('/:id/productos', async (req, res) => {
	const { id } = req.params;
	const { idProd } = req.body;

	const carritos = await archivoCarrito.getAll();
	const arrayIndexPorId = [];
	carritos.forEach((element, index) => {
		arrayIndexPorId.push({ elemId: element.id, elemIndex: index });
	});
	const carritoASuplirIdIndex = arrayIndexPorId.find((carrito) => carrito.elemId === parseInt(id));

	if (carritoASuplirIdIndex) {
		const carrito = await archivoCarrito.getById(parseInt(id));
		const productos = await archivoProductos.getAll();
		const productoBuscado = productos.find((producto) => producto.id === parseInt(idProd));
		if (productoBuscado) {
			const producto = await archivoProductos.getById(parseInt(idProd));
			carrito.products.push(producto);

			const indexElemSuplir = carritoASuplirIdIndex.elemIndex;
			carritos.splice(indexElemSuplir, 1, carrito);

			await archivoCarrito.saveArray(carritos);
			res.json({ mensaje: `producto con id ${idProd} agregado al carrito` });
		} else {
			res.json({ mensaje: 'no existe el producto que busca incluir' });
		}
	} else {
		res.send('no existe el carrito que busca modificar');
	}
});
router.delete('/:id/productos/:id_prod', async (req, res) => {
	const { id } = req.params;
	const { id_prod } = req.params;

	const carritos = await archivoCarrito.getAll();
	const arrayIndexPorId = [];
	carritos.forEach((element, index) => {
		arrayIndexPorId.push({ elemId: element.id, elemIndex: index });
	});
	const carritoASuplirIdIndex = arrayIndexPorId.find((carrito) => carrito.elemId === parseInt(id));
	if (carritoASuplirIdIndex) {
		const carrito = await archivoCarrito.getById(parseInt(id));
		const productoBuscadoCarrito = carrito.products.find((producto) => producto.id === parseInt(id_prod));
		if (productoBuscadoCarrito) {
			const arrayCarritoMenosProd = carrito.products.filter((producto) => producto.id !== parseInt(id_prod));
			carrito.products = arrayCarritoMenosProd;

			const indexElemSuplir = carritoASuplirIdIndex.elemIndex;
			carritos.splice(indexElemSuplir, 1, carrito);

			await archivoCarrito.saveArray(carritos);
			res.json({ mensaje: `productos con id ${id_prod} eliminados del carrito` });
		} else {
			res.json({ mensaje: 'no existe el producto que busca borrar' });
		}
	} else {
		res.send('no existe el carrito que busca modificar');
	}
});

module.exports = router;
