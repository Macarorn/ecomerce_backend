//Aquí se ejecutan las consultas de user a la base de datos
import { Router } from "express";

//controladores para usuarios
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const userRouter = Router();

//Todo el CRUD de usuarios
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
