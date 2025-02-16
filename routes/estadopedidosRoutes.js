import { Router } from 'express';
import { estadoPedidosController } from '../controllers/estadopedidosController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/", estadoPedidosController.getAllEstadoPedidos);
router.get("/:id", estadoPedidosController.getEstadoPedidosById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.post("/", verifyToken, verificarRol([1]),estadoPedidosController.postCrearEstadoPedidos);
router.put("/:id", verifyToken, verificarRol([1]),estadoPedidosController.putActualizarEstadoPedidos);
router.delete("/:id", verifyToken, verificarRol([1]),estadoPedidosController.deleteEliminarEstadoPedidos);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;