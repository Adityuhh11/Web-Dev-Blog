import asyncHandler from "../utils/asynchandler.js";
import { Subscriber } from "../model/subscriber.model.js";

const addSubscriber = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: "Subscribed successfully" });
});

export { addSubscriber };
