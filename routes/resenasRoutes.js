import { Router } from 'express';
import { resenaController } from '../controllers/resenaController.js';

const router = Router();

//SIN RESTRICCIONES
router.get("/", resenaController.getAllResena);
router.get("/:id", resenaController.getResenaById);
router.get("/producto/usuario/:id",resenaController.getResenaByUser);
router.post("/", resenaController.postCrearResena);
router.put("/:id", resenaController.putActualizarResena);
router.delete("/:id", resenaController.deleteEliminarResena);
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;