import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Page = mongoose.model("Page", pageSchema);
