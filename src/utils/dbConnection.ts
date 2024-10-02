import mongoose from "mongoose";

import { appConfig } from "../config/appConfig.js";

const connect = async (): Promise<any> => {
  await mongoose
    .connect(String(appConfig.mongoUrl))
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connect;
