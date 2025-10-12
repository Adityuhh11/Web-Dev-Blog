import asyncHandler from "../utils/asynchandler.js";
import {User} from "../model/user.model.js";

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render("login", { error: "Please provide all fields" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.render("login", { error: "Invalid credentials" });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.render("login", { error: "Invalid credentials" });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshTokens();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        return res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        return res.render("login", { error: "An error occurred during login" });
    }
});

export {loginUser}