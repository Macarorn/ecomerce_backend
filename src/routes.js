import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";

export default function registerRoutes(app) {
  const apiBase = "/rest/v1";

  app.use(apiBase, userRouter);
  app.use(apiBase, authRouter);
}
