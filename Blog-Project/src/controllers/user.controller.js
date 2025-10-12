import asyncHandler from "../utils/asynchandler.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const loginUser =  asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("Please provide all the fields")
    }
    const user  = await User.findOne({username});
    if(!user){
        res.status(400);
        throw new Error("User not found")
    }
    const isPasswordcorrect = user.comparePassword(password)
    if(!isPasswordcorrect){
        res.status(400);
        throw new Error("Invalid Credentials")
    }
    
})