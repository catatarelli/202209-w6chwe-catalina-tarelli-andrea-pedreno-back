import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.disable("x-powered-by");

app.use("/robots", robotRouters);

export default app;
