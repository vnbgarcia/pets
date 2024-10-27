import { Router } from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController";

export const usersRouter = Router()
  .get("/users/:id", getUserById)
  .patch("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);
