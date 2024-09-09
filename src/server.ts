import app from './app';
import { connectdatabase } from './config/database';
import { createProductIndex } from './config/elasticsearchClient';

const PORT = 3000;

async function startServer() {
    try {
        await connectdatabase();

        await new Promise(resolve => setTimeout(resolve, 5000));
        await createProductIndex();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize the server:', error);
        process.exit(1); 
    }
}

startServer();
