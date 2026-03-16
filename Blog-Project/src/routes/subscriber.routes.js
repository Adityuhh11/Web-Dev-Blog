import { Router } from "express";
import { addSubscriber } from "../controllers/subscriber.controller.js";

const router = Router();

router.post("/subscribe", addSubscriber);

export default router;
