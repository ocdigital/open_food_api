import app from './app';
import { checkDatabaseConnection, connectdatabase } from './config/database';

const PORT = 3000;

connectdatabase().then(async () => {
    console.log('Database status:', await checkDatabaseConnection());
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});

