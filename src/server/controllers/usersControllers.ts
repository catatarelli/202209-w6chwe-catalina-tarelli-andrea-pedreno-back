import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import jwt from "jsonwebtoken";
import type {
  RegisterData,
  UserCredentials,
  UserTokenPayload,
} from "../../types/types.js";
import bcrypt from "bcryptjs";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError("No data found", 404, "No data found");

    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password is incorrect",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(
    tokenPayload,
    process.env.JWT_SECRET,
    /* Environment.jwtSecret, */
    { expiresIn: "2d" }
  );

  res.status(200).json({ accesToken: token });
  /* Try { } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  } */
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ user: { id: newUser._id, username, email } });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "General error"
    );
    next(customError);
  }
};
