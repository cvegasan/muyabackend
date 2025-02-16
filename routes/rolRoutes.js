import { Router } from 'express';
import { rolController } from '../controllers/rolController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.get("/", verifyToken, verificarRol([1]),rolController.getAllRoles);
router.get("/:id", verifyToken, verificarRol([1]),rolController.getRolById);
router.post("/", verifyToken, verificarRol([1]),rolController.postCrearRol);
router.put("/:id", verifyToken, verificarRol([1]),rolController.putActualizarRol);
router.delete("/:id", verifyToken, verificarRol([1]),rolController.deleteEliminarRol);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;