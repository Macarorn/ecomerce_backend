// orden.routes.js - CORREGIDO
import express from "express";
import {
  getOrdenes,
  getOrdenById,
  createOrden,
  updateOrden,
  deleteOrden,
} from "../controllers/orden.controller.js";

const router = express.Router();

router.get("/orden", getOrdenes);
router.get("/orden/:id", getOrdenById);
router.post("/orden", createOrden);
router.put("/orden/:id", updateOrden);
router.delete("/orden/:id", deleteOrden);

export default router;
