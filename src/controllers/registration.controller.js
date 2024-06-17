import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Registration } from "../models/registration.model.js";

const eventRegistration = asyncHandler(async(req, res) => {
    const user = req.user.id
    const {event} = req.body

    if(!user || !event){
        throw new ApiError(400, "All fields are required")
    }

    const existingRegistration = await Registration.findOne({user})

    if(existingRegistration){
        throw new ApiError(409, "User already Registered")
    }

    const registration = await Registration.create({
        user,
        event
    })

    if(!registration){
        throw new ApiError(500, "Something went wrong while registering for event")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, registration, "User registered for event successfully"))
})

const getAllRegistration = asyncHandler(async(req, res) => {
    const registration = await Registration.find()

    return res
    .status(200)
    .json(new ApiResponse(200, registration, "All registrations fetched successfully"))
})

const getRegistrationById = asyncHandler(async(req, res) => {
    const {id} = req.params

    const registration = await Registration.findById(id)

    if(!registration){
        throw new ApiError(404, "Registration not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, registration, "Registration by id fetched successfully"))
})

const deleteRegistrationById = asyncHandler(async(req, res) => {
    const {id} = req.params

    const userId = req.user.id

    const deleteRegistration = await Registration.findOneAndDelete(
        {
            _id: id,
            user: userId
        },
        {
            new: true
        }
    )
    
    if(!deleteRegistration){
        throw new ApiError(404, "Registration not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Registration deleted by id successfully"))
})

export {eventRegistration, getAllRegistration, getRegistrationById, deleteRegistrationById}