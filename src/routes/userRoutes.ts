import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController";

export const usersRouter = Router()
  .post("/users", createUser)
  .get("/users/:id", getUserById)
  .patch("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);
