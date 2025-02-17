import { Router } from 'express';
import { pedidoController } from "../controllers/pedidoController.js"
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";

const router = Router();

router.get("/usuario/:id", pedidoController.getPedidoByUser);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1) Cliente (2)
router.get("/", verifyToken, verificarRol([1]),pedidoController.getAllPedido);
router.post("/", verifyToken, verificarRol([2]),pedidoController.postCreatePedido);
router.put("/:id",verifyToken, verificarRol([1]),pedidoController.putUpdatePedido);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1) Cliente (2)
export default router;