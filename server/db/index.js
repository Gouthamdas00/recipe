import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`✅ MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`❌ MONGODB Connection ERROR: ${error.message}`);
        process.exit(1); // Stop the app if connection fails
    }
};

export default connectDB;
