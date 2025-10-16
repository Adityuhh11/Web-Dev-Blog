import toObjectid from "mongoose";
import {Blog} from "../model/blog.model.js";
import asyncHandler from "../utils/asynchandler.js";

const uploadBlog = asyncHandler(async(req,res)=>{
    const{title,description,content} = req.body
    if(!title || !description || !content){
        res.status(400)
        throw new Error("Please provide all the details")
    }
    const newBlog = await Blog.create({
        title:title,
        description:description,
        content:content,
        owner:req.user.id
    })
    res.redirect(`/post/${newBlog._id}`); 
})

const deleteBlog = asyncHandler(async (req, res) => {
    
    const  blogId  = req.params.id;

    if (!blogId) {
        return res.status(400).render("404", { message: "No blog ID provided." });
    }
    
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
        return res.status(404).render("404", { message: "Blog post not found." });
    }

    return res.redirect("/archive"); 
});

const recentBlogs = asyncHandler(async(req,res)=>{
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5)
    res.render("home", { 
        blogs: blogs ,
    });
})

const AllBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("archive", { 
        blogs: blogs 
    });
});

const getBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blogData = await Blog.findById(blogId).populate("owner", "username");

    if (!blogData) {
        return res.status(404).render('404');
    }

    res.render("post", {
        blog: {
            ...blogData._doc,
            date: blogData.createdAt.toLocaleDateString()
        }
    });
});

const findBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blogData = await Blog.findById(blogId).populate("owner", "name");

    if (!blogData) {
        return res.status(404).render('404');
    }

    res.render("update", {
        blog: {
            ...blogData._doc,
            date: blogData.createdAt.toLocaleDateString()
        }
    });
});

const updateBlog =  asyncHandler(async(req,res)=>{
    const {title,description, content} = req.body
    const blogId= req.params.id;
    const blog = await Blog.findByIdAndUpdate(blogId,{
        title:title,
        description:description,
        content:content
    },
    {new:true})
    res.redirect(`/post/${blog._id}`);

})

export {
    recentBlogs,
    AllBlogs,
    getBlog,
    findBlog,
    uploadBlog,
    deleteBlog,
    updateBlog
}
