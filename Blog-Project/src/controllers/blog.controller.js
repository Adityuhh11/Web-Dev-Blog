import mongoose from "mongoose";
import {Blog} from "../model/blog.model.js";
import asyncHandler from "../utils/asynchandler.js";

const uploadBlog = asynchandler(async(req,res)=>{
    const{title,description,content} = req.body
    if(!title || !description || !content){
        res.status(400)
        throw new Error("Please provide all the details")
    }
    const newBlog = await Blog.create({
        title:title,
        description:description,
        content:content
    })
    res.redirect(`/post/${newBlog._id}`); 
    // res.status(200).json({message:"Blog created successfully", blog:newBlog})
})
const recentBlogs = asyncHandler(async(req,res)=>{
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5)
    res.render("home", { 
        blogs: blogs ,
    });
})

const AllBlogs  = asyncHandler(async(req,res)=>{
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.render("archive", { 
        blogs: blogs 
    });
})

const findBlog = asyncHandler(async (req, res) => {
    const Blogid = req.params.id;
    const blogdata = await Blog.findById(Blogid).populate("owner", "name");

    if (!blogdata) {
        return res.status(404).json({ message: "Blog not found" });
    }

    res.render("post", {
        blog: blogdata
    });
})


export {
    recentBlogs,
    AllBlogs,
    findBlog,
    uploadBlog
}