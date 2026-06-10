import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import { loginLimiter } from "../middleware/rateLimit.middleware.js";


const router = Router();

router.get("/login",(req,res)=>{
    res.render("login")
})
router.post("/login", loginLimiter, loginUser);

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

export default router;
