import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { Registration } from "../models/registration.model.js";

const registerEvent = asyncHandler(async(req, res) => {
    const organizer = req.user.id
    const {name, description, location, date} = req.body

    if([name, description, location, date].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const eventDate = new Date(date).toString()//mm-dd-yyyy

    const existingEvent = await Event.findOne({
        $and: [{name}, {organizer}]
    })

    if(existingEvent){
        throw new ApiError(409, "Event already exists")
    }

    const event = await Event.create({
        name,
        description,
        location,
        date: eventDate,
        organizer,
    })

    if(!event){
        throw new ApiError(500, "Something went wrong while registering event")
    }

    return res.status(201).json(
        new ApiResponse(200, event, "Event registered successfully")
    )
})

const getAllEvent = asyncHandler(async(req, res) => {
    const event = await Event.find()

    return res
    .status(200)
    .json(new ApiResponse(200, event, "Events fetched successfully"))
})

const getEventById = asyncHandler(async(req, res) => {
    const {id} = req.params
    
    const event = await Event.findById(id)

    if(!event){
        throw new ApiError(404, "Event not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"))
})

const updateEventById = asyncHandler(async(req, res) => {
    const {id} = req.params
    const userId = req.user.id
    const {location, date} = req.body

    if([location, date].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const event = await Event.findOneAndUpdate(
        {
            _id: id,
            organizer: userId
        },
        {
            $set: {
                location,
                date
            }
        },
        {
            new: true
        }
    )

    if(!event){
        throw new ApiError(404, "Event not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, event, "Event details updated successfully"))
})

const deleteEventById = asyncHandler(async(req, res) => {
    const {id} = req.params
    const userId = req.user.id

    console.log(userId);

    const event = await Event.findOneAndDelete(
        {
            _id: id,
            organizer: userId   
        }
    )

    if(!event){
        throw new ApiError(404, "Event not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully"))
})

export {registerEvent, getAllEvent, getEventById, updateEventById, deleteEventById}