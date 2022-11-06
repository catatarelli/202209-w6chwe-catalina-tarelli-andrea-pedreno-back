import "../../loadEnvironments.js";
import Robot from "../../database/models/Robot.js";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import mongoose from "mongoose";

const { TOKEN: tokenSecret } = process.env;

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find();
    if (!robots?.length) {
      res.status(404).json({ message: "No robots found." });
      return;
    }

    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { robotId } = req.params;
    const { token } = req.query as {
      token: string;
    };

    if (!token || token !== tokenSecret) {
      throw new CustomError(
        `The token (${token}) provided is not valid`,
        498,
        "Token expired or invalid. Try with another one."
      );
    }

    if (!mongoose.isValidObjectId(robotId)) {
      throw new CustomError(
        `The id (${robotId}) provided is not valid`,
        404,
        "Invalid id. Try with another one."
      );
    }

    const robot = await Robot.findById(robotId);

    if (!robot) {
      throw new CustomError(
        `The robot searched by the id (${robotId}) doesn't exist`,
        404,
        "Sorry, no robot found with that id."
      );
    }

    await Robot.deleteOne({
      _id: robotId,
    }).exec();
    res.status(200).json({ robotId });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).statusCode ?? 500,
      (error as CustomError).publicMessage ||
        "Database doesn't work, try again later."
    );
    next(customError);
  }
};
