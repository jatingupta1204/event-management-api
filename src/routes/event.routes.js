import { Router } from "express";
import { deleteEventById, getAllEvent, getEventById, registerEvent, updateEventById } from "../controllers/event.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(verifyJWT, verifyAdmin, registerEvent)
router.route("/events").get(getAllEvent)
router.route("/events/:id").get(getEventById)
router.route("/event-update/:id").post(verifyJWT, verifyAdmin, updateEventById)
router.route("/event-delete/:id").post(verifyJWT, verifyAdmin, deleteEventById)

export default router