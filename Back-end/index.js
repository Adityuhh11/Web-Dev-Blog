import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
dotenv.config();
const app = express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT,(()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    }))
})
.catch((error)=>{
    console.log("MongoDB connection error",error)
})

