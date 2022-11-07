import type { NextFunction, Request, Response } from "express";
import type CustomError from "../../CustomError/CustomError";

export const notFoundPage = (req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message =
    error.publicMessage || "Ops, something went wrong, try again later";
  res.status(statusCode).json(message);
};
