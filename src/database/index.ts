import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("Robots:database:root");

const connectDatabase = async (url: string) => {
  try {
    await mongoose.connect(url, { dbName: "robots" });
    debug(chalk.blue("Connected to database"));
  } catch (error: unknown) {
    debug(chalk.red(`Error on connection`, (error as Error).message));
  }
};

export default connectDatabase;
