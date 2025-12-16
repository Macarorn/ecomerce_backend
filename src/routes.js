import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import carritoRouter from "./routes/carrito.routes.js";
import carritoProductoRouter from "./routes/carrito-producto.routes.js";

export default function registerRoutes(app) {
  const apiBase = "/rest/v1";

  app.use(apiBase, userRouter);
  app.use(apiBase, authRouter);
  app.use(apiBase, carritoRouter);
  app.use(apiBase, carritoProductoRouter);
}
