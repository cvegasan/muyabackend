import { Router } from 'express';
import { metodopagosController } from '../controllers/metodopagosController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/", metodopagosController.getAllMetodoPagos);
router.get("/:id", metodopagosController.getMetodoPagosById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.post("/", verifyToken, verificarRol([1]),metodopagosController.postCrearMetodoPagos);
router.put("/:id", verifyToken, verificarRol([1]),metodopagosController.putActualizarMetodoPagos);
router.delete("/:id", verifyToken, verificarRol([1]),metodopagosController.deleteEliminarMetodoPagos);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;