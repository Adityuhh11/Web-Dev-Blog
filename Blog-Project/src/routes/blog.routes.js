import { Router } from "express";
import path from "path";

const router = Router();
const __dirname = path.resolve();


router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/Pages/home.html"))
})
router.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/Pages/about.html"))
})
router.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/Pages/contact.html"))
})
router.get("/archive",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/Pages/archive.html"))
})
router.get("/post/:slug",(req,res)=>{
    console.log("requested post",req.params.slug)
    res.sendFile(path.join(__dirname,"public/Pages/post.html"))
})


export default router;