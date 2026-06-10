import { Router } from "express";
import { recentBlogs,
            AllBlogs,
            getBlog,
            uploadBlog,
            deleteBlog,
            updateBlog,
            findBlog,
            listDrafts
        } from "../controllers/blog.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { checkAuthStatus } from "../middleware/auth.middleware.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";
const router = Router();
router.use(checkAuthStatus);


import { getAboutPage, getEditAboutPage, updateAboutPage } from "../controllers/page.controller.js";

//Get routes
router.get("/", recentBlogs);
router.get("/create",verifyJWT, (req, res) => {
    res.render("createblog",{ user: req.user });
});
router.get("/update/:id",verifyJWT, findBlog);
router.get("/post/:id", getBlog);
router.get("/archive", AllBlogs);
router.get("/drafts", verifyJWT, listDrafts);

router.get("/about", getAboutPage);
router.get("/edit-about", verifyJWT, getEditAboutPage);
router.post("/edit-about", verifyJWT, csrfProtection, updateAboutPage);
router.get("/contact",  (req,res)=>{
    res.render("contact")
})

//Post routes
router.post("/update/:id", verifyJWT, csrfProtection, updateBlog);
router.post("/createblog", verifyJWT, csrfProtection, uploadBlog);
router.post("/delete/:id", verifyJWT, csrfProtection, deleteBlog);

export default router;