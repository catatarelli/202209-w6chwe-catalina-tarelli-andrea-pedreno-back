import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import createDebug from "debug";
import startServer from "./server/index.js";
import connectDatabase from "./database/index.js";

const debug = createDebug("robots:root");

dotenv.config();

const databaseUrl = process.env.MONGODB_URL;

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/robots", (req, res) => {
  res.status(200).json({ message: `list of robots` });
});

app.use(morgan("dev"));

app.listen(port, () => {
  debug(chalk.yellow(`Server listening on port ${port}`));
});

await startServer(+port);
await connectDatabase(databaseUrl);

export default app;
