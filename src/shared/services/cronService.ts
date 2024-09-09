import cron from "node-cron";
import importData from "../../domain/product/services/importService";
import { updateCronExecutionTime } from "../../cron";

cron.schedule("0 0 * * * *", async () => {
  await importData();
  updateCronExecutionTime();
});
