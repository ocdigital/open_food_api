import express, { Application } from 'express';
import { CronService } from './services/CronService';

const app: Application = express();

new CronService();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running',
    status: 'OK',
  });
});

export default app;
