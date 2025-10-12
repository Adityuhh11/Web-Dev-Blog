import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import asyncHandler from "../utils/asynchandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
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
