import { Router } from "express";
import { addSubscriber } from "../controllers/subscriber.controller.js";
import { subscribeLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post("/subscribe", subscribeLimiter, addSubscriber);

export default router;
