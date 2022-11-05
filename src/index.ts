import "./loadEnvironments.js";
import startServer from "./server/index.js";
import connectDatabase from "./database/index.js";

const databaseUrl = process.env.MONGODB_URL;

const port = process.env.PORT;

await startServer(+port);
await connectDatabase(databaseUrl);
