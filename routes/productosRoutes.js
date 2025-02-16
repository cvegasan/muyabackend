import { Router } from 'express';
import { productoController } from '../controllers/productoController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.post('/', verifyToken, verificarRol([1]),productoController.postCrearProducto);
router.put("/:id", verifyToken, verificarRol([1]),productoController.putActualizarProducto);
router.delete("/:id", verifyToken, verificarRol([1]),productoController.deleteEliminarProducto);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;