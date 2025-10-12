import { Router } from "express";
import { recentBlogs,
            AllBlogs,
            findBlog,
            uploadBlog,
            deleteBlog
        } from "../controllers/blog.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { checkAuthStatus } from "../middleware/auth.middleware.js";
const router = Router();
router.use(checkAuthStatus);

router.get("/", recentBlogs);

router.get("/create",verifyJWT, (req, res) => {
    res.render("createblog");
});
router.post("/createblog", verifyJWT,uploadBlog);
router.post("/delete/:id",verifyJWT, deleteBlog);


router.get("/post/:id", findBlog);

router.get("/archive", AllBlogs);

router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/contact",  (req,res)=>{
    res.render("contact")
})

export default router;