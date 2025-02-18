import { Router } from 'express';
import { favoritosController } from '../controllers/favoritoController.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/", favoritosController.getAllFavoritos);
router.get("/:id", favoritosController.getFavoritosById);
router.get("/usuario/:user", favoritosController.getUserFavoritos);
router.get("/producto/:prod", favoritosController.getProdFavoritos);
router.post("/", favoritosController.postCrearFavoritos); //Clientes pueden agregar favoritos

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1) Cliente (2)
router.put("/:id", verifyToken, verificarRol([1]),favoritosController.putActualizarFavoritos);
router.delete("/:id", verifyToken, verificarRol([2]),favoritosController.deleteEliminarFavoritos);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1) Cliente (2)

router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;