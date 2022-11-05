import Robot from "../../database/models/Robot.js";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const getRobots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const robots = await Robot.find();
    if (!robots?.length) {
      res.status(404).json({ message: "No robots found" });
      return;
    }

    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "An error occurred"
    );
    next(customError);
  }
};

export default getRobots;
