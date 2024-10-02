import express from "express";
import bodyParser from "body-parser";
// import path from "path";
// import dotenv from "dotenv";
import dbConnect from "./utils/dbConnection.js"; // import db connection feature from util folder
import cors from "cors";
import morgan from "morgan";
// const rateLimiter = require("express-rate-limit");
import helmet from "helmet";
// import xss from "xss-clean";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import indexRouter from "./routers/index.js";
// import webHookRouter from "./routers/webHook/webeHook.router.js";
import { appConfig } from "./config/appConfig.js";
const app = express();
// const root_dir = new URL("..", import.meta.url).pathname;
// dotenv.config({ path: path.join(root_dir, `.env`) });
await dbConnect();
const whitelist = appConfig.whiteList.split(",");
app.set("trust proxy", 1); // trust first proxy
const corsOptions = {
  // eslint-disable-next-line consistent-return
  origin(origin, callback) {
    console.log(
      origin,
      "origin",
      whitelist.indexOf(origin) !== -1,
      "wishList",
      whitelist,
    );
    if (!origin) {
      // for mobile app and postman client
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
// Increase the request size limit
app.use(bodyParser.json({ limit: "50mb" })); // for JSON requests
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for URL-encoded requests
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  }),
);
app.use(helmet());
// app.use(xss());
app.use(morgan("tiny"));
app.use("/api/v1", indexRouter);
// app.use(
//   "/api/webhook",
//   express.raw({ type: "application/json" }),
//   webHookRouter,
// );
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log("Server Running on " + `${port}`);
});
