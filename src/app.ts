import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { router } from "./routes";
import { handleAsyncErrors } from "./middlewares/errors.middleware";

//Instance of express 
const app = express();

//Handle diferent origins of request
app.use(cors());

//HTTP request logger middleware with the dev format
app.use(morgan("dev"));

//Mount router with inital /v1/ + ROUTER defined in routes.ts archive
app.use("/v1/", router);

//Use de middleware error in the api
app.use(handleAsyncErrors);

export { app };
