import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express()
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// Make user login status available to all views
import { checkAuthStatus } from "./src/middleware/auth.middleware.js";
app.use(checkAuthStatus);

// BLOG ROUTES
import blogRouter from "./src/routes/blog.routes.js"
app.use("/", blogRouter);
// USER ROUTES
import userRouter from "./src/routes/user.routes.js"
app.use("/", userRouter);

export default app;

