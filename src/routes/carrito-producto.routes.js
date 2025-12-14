import { Router } from "express";
import {
  getCarritoProductos,
  createCarritoProducto,
  updateCarritoProducto,
  deleteCarritoProducto,
} from "../controllers/carritoProducto.controller.js";

const cpRouter = Router();

cpRouter.get("/carrito-producto", getCarritoProductos);
cpRouter.post("/carrito-producto", createCarritoProducto);
cpRouter.put("/carrito-producto/:id", updateCarritoProducto);
cpRouter.delete("/carrito-producto/:id", deleteCarritoProducto);

export default cpRouter;
