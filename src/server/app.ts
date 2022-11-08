import express from "express";
import morgan from "morgan";
import robotRouters from "./routers/robotRouters.js";
import cors from "cors";
import { generalError, notFoundPage } from "./middlewares/errors.js";
import usersRouter from "./routers/usersRouter.js";
import { auth } from "./middlewares/auth.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://202209-w6chwe-catalina-tarelli-andrea.netlify.app",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
  })
);
app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/robots", auth, robotRouters);

app.disable("x-powered-by");

app.use(notFoundPage);
app.use(generalError);

export default app;
