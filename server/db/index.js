import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        // Connect to MongoDB with dbName as an option (not appended in the URI)
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,  // Correct way to specify the database
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`❌ MONGODB Connection ERROR: ${error.message}`);
        process.exit(1); // Stop the app if connection fails
    }
};

export default connectDB;
