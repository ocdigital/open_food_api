import mongoose from 'mongoose';

class Database {
    private static instance: Database;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        const mongoUrl = process.env.MONGO_URL;
        try {
            await mongoose.connect(mongoUrl);
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection failed', error);
            throw error;
        }
    }

    public async checkDatabaseConnection(): Promise<string> {
        const status = mongoose.connection.readyState;
        return status === 1 ? 'Connected' : 'Disconnected';
    }
}

export const connectdatabase = () => Database.getInstance().connect();
export const checkDatabaseConnection = () => Database.getInstance().checkDatabaseConnection();
