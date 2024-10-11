import { ErrorRequestHandler, Request, Response } from "express";
import { NotFoundError } from "../models/notFound";

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
) => {
  console.log("Error handler", err);
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({ message: err });
  }
};
