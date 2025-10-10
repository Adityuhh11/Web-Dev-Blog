import { Router } from "express";
import { recentBlogs,
            AllBlogs,
            findBlog,
            uploadBlog,
            deleteBlog
        } from "../controllers/blog.controller.js";
import path from "path";

const router = Router();
const __dirname = path.resolve();


router.get("/", recentBlogs);


router.get("/create", (req, res) => {
    res.render("createblog");
});

router.post("/createblog", uploadBlog);

router.post("/delete/:id", deleteBlog);


router.get("/post/:id", findBlog);

router.get("/archive", AllBlogs);

router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/contact",  (req,res)=>{
    res.render("contact")
})

export default router;