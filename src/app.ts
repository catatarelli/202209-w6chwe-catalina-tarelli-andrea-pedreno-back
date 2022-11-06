import type { CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";
import { generalError, notFoundPage } from "./server/middlewares/errors.js";

const app = express();

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/robots", cors(corsOptions), robotRouters);

app.use(notFoundPage);
app.use(generalError);

export default app;
