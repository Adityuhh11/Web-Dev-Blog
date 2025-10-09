import { Router } from "express";
import { recentBlogs,
            AllBlogs,
            findBlog,
            uploadBlog
        } from "../controllers/blog.controller.js";
import path from "path";

const router = Router();
const __dirname = path.resolve();


router.get("/", recentBlogs,);

router.post("/createblog",uploadBlog);

router.get("/post/:slug", findBlog);

router.get("/archive", AllBlogs);

// router.get("/post",(req,res)=>{
//     res.render(path.join(__dirname, "views/post.ejs"))
// })


router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/contact",  (req,res)=>{
    res.render("contact")
})

export default router;