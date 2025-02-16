import { Router } from 'express';
import { categoriaController } from '../controllers/categoriaController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/", categoriaController.getAllCategoria);
router.get("/:id", categoriaController.getCategoriaById);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.post("/", verifyToken, verificarRol([1]),categoriaController.postCrearCategoria);
router.put("/:id", verifyToken, verificarRol([1]),categoriaController.putActualizarCategoria);
router.delete("/:id", verifyToken, verificarRol([1]),categoriaController.deleteEliminarCategoria);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;