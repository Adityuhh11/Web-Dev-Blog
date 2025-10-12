import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true , 'password is required']
    },
    refreshToken:{
        type:String
    }

})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password =  bcrypt.hash(this.password,10)
    }
    next()
},{timestamps:true})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id :this._id,
        email:this.email,
        username :this.username,
    },process.env.ACCESS_TOKEN_SECRET,{ expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
userSchema.methods.generateRefreshTokens = function(){
      return jwt.sign({
        _id :this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})}

export const User = mongoose.model("User",userSchema)