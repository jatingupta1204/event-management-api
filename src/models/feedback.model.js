import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
}, {timestamps: true})

export const FeedBack = mongoose.model("FeedBack", feedbackSchema)