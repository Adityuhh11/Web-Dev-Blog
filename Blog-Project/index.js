import express from "express";
import dotenv from "dotenv";
import connectDB from "../Blog-Project/src/db/index.db.js";
import path from "path"
dotenv.config();
const app = express()


const __dirname = path.resolve(); // Get the absolute path of the project
app.use(express.static(path.join(__dirname, './public')));


connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 3000,(()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    }))
})
.catch((error)=>{
    console.log("MongoDB connection error",error)
})

