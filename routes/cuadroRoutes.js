import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { actualizarCuadro, agregarCuadro, cambiarEstadoCarga, eliminarCuadro, obtenerCuadro } from "../Controllers/cuadroController.js";

const router = express.Router()

router.post('/', checkAuth, agregarCuadro)
router
    .route('/:id')
    .get(checkAuth,obtenerCuadro)
    .put(checkAuth,actualizarCuadro)
    .delete(checkAuth,eliminarCuadro)

router.post('/estado/:id',checkAuth, cambiarEstadoCarga)

export default router