import mongoose from "mongoose";

export const connectdatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/foodData');
        console.log('Database connected successfully');
    }
    catch (error) {
        console.log('Error connecting to database', error);
        process.exit(1);
    }
}

export const checkDatabaseConnection = async () => {
    const status = mongoose.connection.readyState;
    return status === 1? 'Connected' : 'Disconnected';
}