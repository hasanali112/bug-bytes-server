import mongoose from "mongoose";
import config from "./app/config";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.database_url as string);
    console.log(
      `MongoDB Connected successfully: ${connection.connection.port}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
