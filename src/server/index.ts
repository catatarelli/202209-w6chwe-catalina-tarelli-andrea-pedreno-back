import chalk from "chalk";
import * as dotenv from "dotenv";
import debugCreator from "debug";
import app from "../app.js";

const debug = debugCreator("Things:root");

dotenv.config();

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error: Error) => {
      debug(chalk.red(`There was an error in server ${error.message}`));
      reject(error);
    });
  });

export default startServer;
