import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import ordenRouter from "./routes/orden.routes.js";
import ordenProductoRouter from "./routes/orden_producto.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import productosRouter from "./routes/productos.routes.js";
import carritoRouter from "./routes/carrito.routes.js";
import carritoProductoRouter from "./routes/carrito-producto.routes.js";

export default function registerRoutes(app) {
  const apiBase = "/rest/v1";

  app.use(apiBase, userRouter);
  app.use(apiBase, authRouter);
  app.use(apiBase, ordenRouter);
  app.use(apiBase, ordenProductoRouter);
  app.use(`${apiBase}/categorias`, categoriasRouter);
  app.use(`${apiBase}/productos`, productosRouter);
}
  app.use(apiBase, carritoRouter);
  app.use(apiBase, carritoProductoRouter);
}
