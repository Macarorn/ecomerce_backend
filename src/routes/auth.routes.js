import { Router } from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/auth/register", createUser);
authRouter.get("/auth/users", getUsers);
authRouter.post("/auth/login", loginUser);

export default authRouter;
