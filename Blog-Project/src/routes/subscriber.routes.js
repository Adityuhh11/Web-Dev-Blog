import { Router } from "express";
import { addSubscriber } from "../controllers/subscriber.controller.js";
import { subscribeLimiter } from "../middleware/rateLimit.middleware.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";

const router = Router();

router.post("/subscribe", subscribeLimiter, csrfProtection, addSubscriber);

export default router;
