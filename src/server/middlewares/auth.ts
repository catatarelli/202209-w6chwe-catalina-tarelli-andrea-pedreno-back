import type { NextFunction, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import jwt from "jsonwebtoken";
import type { CustomRequest, UserTokenPayload } from "../../types/types.js";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      const error = new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );
      next(error);
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      const error = new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );
      next(error);
      return;
    }

    const token = authHeader.replace(/^Bearer \s*/, "");
    const user: UserTokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as UserTokenPayload;

    req.userId =
      user.id; /* Comprueba si la id es valida y se la pasa al resto de usuarios */

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token"
    );
    next(tokenError);
  }
};
