import cron from "node-cron";
import importData from "./importService";
import { updateCronExecutionTime } from "../cron";

cron.schedule("*/5 * * * *", async () => {
  await importData();
  updateCronExecutionTime();
});
