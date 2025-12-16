import { Router } from "express";
import {
  getCarritos,
  getCarrito,
  createCarrito,
  updateCarrito,
  deleteCarrito,
} from "../controllers/carrito.controller.js";

const carritoRouter = Router();

carritoRouter.get("/carrito", getCarritos);
carritoRouter.get("/carrito/:id", getCarrito);
carritoRouter.post("/carrito", createCarrito);
carritoRouter.put("/carrito/:id", updateCarrito);
carritoRouter.delete("/carrito/:id", deleteCarrito);

export default carritoRouter;
