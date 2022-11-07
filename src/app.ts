import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";
import { generalError, notFoundPage } from "./server/middlewares/errors.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/robots", robotRouters);

app.disable("x-powered-by");

app.use(notFoundPage);
app.use(generalError);

export default app;
