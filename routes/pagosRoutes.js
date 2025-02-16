import { Router } from 'express';
import { pagoController } from '../controllers/pagoController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/:id", pagoController.getPagoById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.get("/", verifyToken, verificarRol([1]),pagoController.getAllPago);
router.post("/", verifyToken, verificarRol([1]),pagoController.postCrearPago);
router.put("/:id", verifyToken, verificarRol([1]),pagoController.putActualizarPago);
router.delete("/:id", verifyToken, verificarRol([1]),pagoController.deleteEliminarPago);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;