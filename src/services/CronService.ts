import cron from 'node-cron';
import { CRON_SCHEDULE } from '../config/cronConfig';


export class CronService {
    constructor() {
        this.scheduleCronJobs();
    }

    private scheduleCronJobs() {
        cron.schedule(CRON_SCHEDULE, () => {
            console.log('Running cron job');
        this.testFunction();
        });
    }

    private testFunction() {
        console.log('Test function executed at:', new Date().toISOString());
    }
}