import asyncHandler from "../utils/asynchandler.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const generateAccessTokenandRefreshToken = (user) =>{
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshTokens();  
//     return {accessToken,refreshToken};
// }
const loginUser =  asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).render("login", { error: "Please provide all fields" });;
        throw new Error("Please provide all the fields")
    }
    const user  = await User.findOne({username});
    if(!user){
        res.status(400).render("login", { error: "Invalid credentials" });
        throw new Error("User not found")
    }
    const isPasswordcorrect = user.comparePassword(password)
    if(!isPasswordcorrect){
        res.status(400);
        throw new Error("Invalid Credentials").render("login", { error: "Invalid credentials" });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshTokens();  
    const options = {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production'
    }
    res.cookie("refreshToken",refreshToken,options)
    res.cookie("accessToken",accessToken,options)
    res.status(200).redirect("/") 
})