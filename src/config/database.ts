import mongoose from "mongoose";
const { Client } = require('@elastic/elasticsearch');

export const connectdatabase = async () => {
    try {
        // Use MONGO_URL from environment variables, default to 'mongodb://mongo:27017/foodData'
        const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/foodData';
        await mongoose.connect(mongoURL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error);
        process.exit(1);
    }
}

export const checkDatabaseConnection = async () => {
    const status = mongoose.connection.readyState;
    return status === 1 ? 'Connected' : 'Disconnected';
}

export const checkElasticsearchConnection = async () => {
    try {
        // Add your Elasticsearch connection logic here
        // For example, you can use the official Elasticsearch client library
        // to establish a connection and check the cluster health
        // Here's an example using the @elastic/elasticsearch library:
        const client = new Client({ node: 'http://elasticsearch:9200' });
        const health = await client.cluster.health();
        return health.status === 'green' ? 'Connected' : 'Disconnected';
    } catch (error) {
        console.log('Error connecting to Elasticsearch', error);
        return 'Disconnected';
    }
}
