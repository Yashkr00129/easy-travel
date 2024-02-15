import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

const connectDb = () => mongoose.connect(MONGO_DB_URL);

export default connectDb;
