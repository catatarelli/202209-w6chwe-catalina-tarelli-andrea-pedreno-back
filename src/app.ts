import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(morgan("dev"));
app.use(express.json());

app.use("/robots", robotRouters);

export default app;
