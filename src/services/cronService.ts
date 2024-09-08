import cron from "node-cron";
import importData from "./importService";
import { updateCronExecutionTime } from "../cron";

cron.schedule("*/5 * * * *", async () => {
  //TODO: Alterar para 00:00
  console.log("Running cron job every 5 minute");
  await importData();
  updateCronExecutionTime();
});
