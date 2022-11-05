import Robot from "../../database/models/Robot.js";
import type { Request, Response } from "express";

const getRobots = async (req: Request, res: Response) => {
  try {
    const robots = await Robot.find();
    if (!robots?.length) {
      res.status(404).json({ message: "No robots found" });
      return;
    }

    res.status(200).json({ robots });
  } catch {
    res.status(500).json({ message: "Error with the database" });
  }
};

export default getRobots;
