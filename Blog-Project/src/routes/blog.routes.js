import { Router } from "express";
import { recentBlogs,
            AllBlogs,
            getBlog,
            uploadBlog,
            deleteBlog,
            updateBlog,
            findBlog
        } from "../controllers/blog.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { checkAuthStatus } from "../middleware/auth.middleware.js";
const router = Router();
router.use(checkAuthStatus);


//Get routes
router.get("/", recentBlogs);
router.get("/create",verifyJWT, (req, res) => {
    res.render("createblog",{ user: req.user });
});
router.get("/update/:id",verifyJWT, findBlog)
router.get("/post/:id", getBlog);
router.get("/archive", AllBlogs);
router.get("/about",(req,res)=>{
    res.render("about")
})
router.get("/contact",  (req,res)=>{
    res.render("contact")
})

//Post routes
router.post("/update/:id",verifyJWT,updateBlog)
router.post("/createblog", verifyJWT,uploadBlog);
router.post("/delete/:id",verifyJWT, deleteBlog);

export default router;