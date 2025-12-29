import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import asyncHandler from "../utils/asynchandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // 1. Check for Master API Key (for n8n)
        const masterApiKey = req.headers['x-master-key'];
        if (masterApiKey && masterApiKey === process.env.MASTER_API_KEY) {
            // Fetch your admin user manually so req.user exists for the controller
            const admin = await User.findOne({ username: "Aditya" }); // or use your specific admin username
            req.user = admin;
            return next();
        }
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.redirect("/login");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            return res.redirect("/login");
        }
        req.user = user;
        
        next();

    } catch (error) {
        return res.redirect("/login");
    }
});


const checkAuthStatus = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        
        if (!token) {
            res.locals.isLoggedIn = false;
            return next();
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.locals.isLoggedIn = false;
            } else {
                res.locals.isLoggedIn = true;
                res.locals.user = user; 
            }
            next();
        });
    } catch (error) {
        res.locals.isLoggedIn = false;
        next();
    }
};

export { verifyJWT, checkAuthStatus };
