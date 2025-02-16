import { Router } from 'express';
import { estadoPagosController } from '../controllers/estadopagosController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/", estadoPagosController.getAllEstadoPagos);
router.get("/:id", estadoPagosController.getEstadoPagosById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.post("/", verifyToken, verificarRol([1]),estadoPagosController.postCrearEstadoPagos);
router.put("/:id", verifyToken, verificarRol([1]),estadoPagosController.putActualizarEstadoPagos);
router.delete("/:id", verifyToken, verificarRol([1]),estadoPagosController.deleteEliminarEstadoPagos);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;