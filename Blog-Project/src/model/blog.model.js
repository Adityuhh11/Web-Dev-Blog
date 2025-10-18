import mongoose from "mongoose";
 
const blogSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index: true 
    },
    content:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        index: true 
    }, 
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

blogSchema.index({ title: "text", description: "text" });


export const Blog = mongoose.model("Blog", blogSchema)
// category:{
    //     type:String,
    //     required:true,
    // },