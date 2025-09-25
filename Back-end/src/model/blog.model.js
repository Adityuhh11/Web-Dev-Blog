import mongoose from "mongoose";
 
const blogSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    }
})

export const Blog = mongoose.model("Blog", blogSchema)