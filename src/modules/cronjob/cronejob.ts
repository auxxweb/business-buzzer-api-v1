import cron from "node-cron";
// import { orgBillingTrigger } from "./billing.trigger.js";
import dbConnect from "../../utils/dbConnection.js"; // import db connection feature from util folder
import { checkFreePlan } from "./freePlanCheck.js";

void (async () => {
  await dbConnect();

  // Schedule the cron job to run at 11PM UTC every day
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  cron.schedule(
    "0 23 * * *",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      console.log("Running billing trigger...");

      try {
        await checkFreePlan();
        console.log("Billing trigger executed successfully.");
      } catch (error) {
        console.error("Error executing billing trigger:", error);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    },
  );
})();
