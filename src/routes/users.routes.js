//Aquí se ejecutan las consultas de user a la base de datos
import { Router } from "express";

//controladores para usuarios
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/users.controller.js";

const userRouter = Router();

// Todo el CRUD de usuarios
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.post("/users/login", loginUser);

export default userRouter;
