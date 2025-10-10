import mongoose from "mongoose";

const connectDB = async()=>{
      console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error",error)
    }
}

export default connectDB
