import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/robots", robotRouters);

export default app;
