import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import { loginLimiter } from "../middleware/rateLimit.middleware.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";


const router = Router();

router.get("/login",(req,res)=>{
    res.render("login")
})
router.post("/login", loginLimiter, csrfProtection, loginUser);

// Logout route
router.post("/logout", csrfProtection, (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

export default router;
