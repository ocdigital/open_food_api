import mongoose from "mongoose";

export const connectdatabase = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;
        await mongoose.connect(mongoURL);
    } catch (error) {        
        process.exit(1);
    }
}

export const checkDatabaseConnection = async () => {
    const status = mongoose.connection.readyState;
    return status === 1 ? 'Connected' : 'Disconnected';
}


