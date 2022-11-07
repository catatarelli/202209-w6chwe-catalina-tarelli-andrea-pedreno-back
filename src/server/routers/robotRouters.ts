import express from "express";
import { getRobots, deleteRobotById } from "../controllers/robotControllers.js";

// eslint-disable-next-line new-cap
const robotRouters = express.Router();

robotRouters.get("/", getRobots);
robotRouters.delete("/delete/:robotId", deleteRobotById);

export default robotRouters;
