import mongoose from "mongoose";
import { Client } from '@elastic/elasticsearch';

export const connectdatabase = async () => {
    try {
        const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/foodData';
        await mongoose.connect(mongoURL);
    } catch (error) {        
        process.exit(1);
    }
}

export const checkDatabaseConnection = async () => {
    const status = mongoose.connection.readyState;
    return status === 1 ? 'Connected' : 'Disconnected';
}

export const checkElasticsearchConnection = async () => {
    try {
        const client = new Client({ node: 'http://elasticsearch:9200' });
        const health = await client.cluster.health();
        return health.status === 'green' ? 'Connected' : 'Disconnected';
    } catch (error) {
        return 'Disconnected';
    }
}
