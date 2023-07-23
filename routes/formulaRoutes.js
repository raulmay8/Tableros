import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { actualizarFormula, agregarFormula, eliminarFormula, obtenerFormula } from "../Controllers/formulaController.js";

const router = express.Router()

/* router.post('/', checkAuth, agregarFormula)
router
    .route('/:id')
    .get(checkAuth,obtenerFormula)
    .put(checkAuth,actualizarFormula)
    .delete(checkAuth,eliminarFormula) */

    router.post('/', checkAuth, agregarFormula)
    router.get('/:id', checkAuth, obtenerFormula)
    router.put('/:id', checkAuth, actualizarFormula)
    router.delete('/:id', checkAuth, eliminarFormula)


export default router