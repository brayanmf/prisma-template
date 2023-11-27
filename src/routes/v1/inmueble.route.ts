import { inmueblesController } from '../../controllers';
import express from "express";

const router = express.Router();

router
    .route('/obtenerPorId/:id')
    .get(inmueblesController.consultarAreaPorId);

export default router;