import express from "express";
import getRobots from "../controllers/robotControllers.js";

// eslint-disable-next-line new-cap
const robotRouters = express.Router();

robotRouters.get("/", getRobots);

export default robotRouters;
