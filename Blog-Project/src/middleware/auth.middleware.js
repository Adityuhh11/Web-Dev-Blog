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
export default verifyJWT;