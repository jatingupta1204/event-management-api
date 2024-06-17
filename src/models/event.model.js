import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "Registration"
    }]
}, {timestamps: true})

export const Event = mongoose.model("Event", eventSchema)