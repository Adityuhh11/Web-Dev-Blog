import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { loginUser } from "../controllers/user.controller.js";


const router = Router();

router.get("/login",(req,res)=>{
    res.render("login")
})
router.post("/login", loginUser);

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

export default router;
