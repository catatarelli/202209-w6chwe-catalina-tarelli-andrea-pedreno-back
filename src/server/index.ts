import "../loadEnvironments.js";
import chalk from "chalk";
import debugCreator from "debug";
import app from "./app.js";

const debug = debugCreator(`${process.env.DEBUG}:robots:root`);

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error starting the server: ", error.message));
      reject(error);
    });
  });

export default startServer;
