import express from "express";
import morgan from "morgan";
import robotRouters from "./server/routers/robotRouters.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "https://202209-w6chwe-catalina-tarelli-andrea.netlify.app",
      "http://localhost:4000",
    ],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use("/robots", robotRouters);

export default app;
