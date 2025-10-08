import dotenv from "dotenv";
import connectDB from "./src/db/index.db.js";
import app from "./app.js";

dotenv.config();





connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 3000,(()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
        console.log(`Local: http://localhost:${process.env.PORT || 3000}`);//You can Click the link in the console and go directly 
    }))
})
.catch((error)=>{
    console.log("MongoDB connection error",error)
})

