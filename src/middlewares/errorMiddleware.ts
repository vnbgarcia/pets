import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { notFoundError } from "../models/exceptions";
import { ZodError } from "zod";
import { ValidationError } from "sequelize";

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.error("Got an error", err);
  if (err instanceof ZodError) {
    res.status(400).json({ message: "Invalid data" });
  } else if (err instanceof notFoundError) {
    res.status(404).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(422).json({ message: err.message });
  } else {
    res.status(500).json({ message: err })
  }
}
