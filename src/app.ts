import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const origin = req.header("Origin");
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  next();
});

app.use("/robots", robotRouters);

export default app;
