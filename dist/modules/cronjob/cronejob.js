/* eslint-disable @typescript-eslint/no-misused-promises */
import cron from "node-cron";
import path from "path";
import { fork } from "child_process";
import dbConnect from "../../utils/dbConnection.js";
import { checkFreePlan } from "./freePlanCheck.js";
void (async () => {
  try {
    await dbConnect();
    // Schedule the cron job to run daily at 11 PM UTC
    cron.schedule(
      "0 23 * * *",
      async () => {
        console.log("Running billing trigger...");
        try {
          await checkFreePlan();
          console.log("Billing trigger executed successfully.");
        } catch (error) {
          console.error("Error executing billing trigger:", error);
        }
        // Fork a worker process for additional tasks
        try {
          const workerPath = path.resolve("src/modules/cronjob/cronejob.js");
          const planWorker = fork(workerPath);
          planWorker.on("message", (message) => {
            console.log("Message from worker:", message);
          });
          planWorker.on("error", (err) => {
            console.error("Worker process error:", err);
          });
          planWorker.on("exit", (code) => {
            console.log(`Worker process exited with code ${code}`);
          });
        } catch (error) {
          console.error("Error starting worker process:", error);
        }
      },
      {
        scheduled: true,
        timezone: "UTC",
      },
    );
    console.log("Cron job scheduled.");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
})();
