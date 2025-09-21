import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Blog-Post`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error",error)
    }
}

export default connectDB
