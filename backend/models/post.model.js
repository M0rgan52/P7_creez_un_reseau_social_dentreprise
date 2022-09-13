const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        posterId: { type: String, required: true },
        message: { type: String, trim: true, maxlength: 1000 },
        picture: { type: String },
        likers: { type: [String], required: true },
        comments: { type: [{ commenterId: String, commenterEmail: String, commenterPrenom: String, text: String, timestamp: Number }], required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("post", postSchema);