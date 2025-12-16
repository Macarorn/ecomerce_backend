// orden_producto.routes.js - CORREGIDO
import express from "express";
import {
  getOrdenProductos,
  createOrdenProducto,
  updateOrdenProducto,
  deleteOrdenProducto,
} from "../controllers/orden_producto.controller.js";

const router = express.Router();

router.get("/orden-producto", getOrdenProductos);
router.post("/orden-producto", createOrdenProducto);
router.put("/orden-producto/:id", updateOrdenProducto);
router.delete("/orden-producto/:id", deleteOrdenProducto);

export default router;
