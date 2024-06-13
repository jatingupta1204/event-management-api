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
        type: date,
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
    participant: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps: true})

export const Event = mongoose.model("Event", eventSchema)