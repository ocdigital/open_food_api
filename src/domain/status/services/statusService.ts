import { checkDatabaseConnection } from "../../../config/database";
import { getCronInfo } from "../../../../src/cron";

const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

const formatMemoryUsage = (memoryUsage: NodeJS.MemoryUsage) => {
    const totalMemoryInMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);

    return totalMemoryInMB + ' MB';
}

export const getApiStatusService = async () => {
    const dbStatus = await checkDatabaseConnection();
    const lastCronExecution = getCronInfo();
    const uptime = formatUptime(process.uptime());
    const memoryUsage = formatMemoryUsage(process.memoryUsage());

    return {
        api: 'Details API',
        dbStatus,
        lastCronExecution,
        uptime,
        memoryUsage
    };
}

