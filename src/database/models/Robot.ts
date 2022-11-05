import { model, Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
const RobotSchema = new Schema({
  name: String,
  image: String,
  speed: Number,
  endurance: Number,
  createDate: String,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Robot = model("Robot", RobotSchema, "robots");

export default Robot;
