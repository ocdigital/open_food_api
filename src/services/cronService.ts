import cron from "node-cron";
import importData from "./importService";
import { updateCronExecutionTime } from "../cron";

cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job at 00:00");
  await importData();
  updateCronExecutionTime();
});
