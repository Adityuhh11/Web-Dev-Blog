import { Router } from "express";
import { recentBlogs,
            AllBlogs
                        } from "../controllers/blog.controller.js";
import path from "path";

const router = Router();
const __dirname = path.resolve();


router.get("/", recentBlogs);


router.get("/about",(req,res)=>{
    res.render(path.join(__dirname, "views/about.ejs"))
})

router.get("/contact",(req,res)=>{
    res.render(path.join(__dirname, "views/contact.ejs"))
})

router.get("/archive", AllBlogs);

router.get("/post",(req,res)=>{
    res.render(path.join(__dirname, "views/post.ejs"))
})

router.get("/post/:slug",(req,res)=>{
    console.log("requested post",req.params.slug)
    res.render(path.join(__dirname,"views/post.ejs"))
})


export default router;