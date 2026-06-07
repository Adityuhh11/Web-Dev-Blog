import mongoose from "mongoose";
 
const blogSchema =  new mongoose.Schema({
    title:{
        type:String,
        index: true 
    },
    content:{
        type:String,
        default: ""
    },
    description:{
        type:String,
        index: true,
        default: ""
    }, 
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
        index: true
    }
},{timestamps:true});

blogSchema.index({ title: "text", description: "text" });


export const Blog = mongoose.model("Blog", blogSchema)
// category:{
    //     type:String,
    //     required:true,
    // },
