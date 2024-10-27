import { Router } from "express";
import { createUser } from "../controllers/userController";

export const usersUnprotectedRouter = Router().post("/users", createUser);
