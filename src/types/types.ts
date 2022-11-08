import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
interface RobotStructure {
  id: string;
  name: string;
  image: string;
  speed: number;
  endurance: number;
  createDate: string;
}

export interface UserCredentials {
  username: string;
  password: string;
  _id: string;
}

export interface RegisterData extends UserCredentials {
  email: string;
}
export interface CustomRequest extends Request {
  userId: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export default RobotStructure;
