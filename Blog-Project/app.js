import express from "express";
import cors from "cors";
import path from "path";

const app = express()
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// BLOG ROUTES

import blogRouter from "./src/routes/blog.routes.js"
app.use("/", blogRouter);

export default app;

