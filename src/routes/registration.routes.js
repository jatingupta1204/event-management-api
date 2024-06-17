import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteRegistrationById, eventRegistration, getAllRegistration, getRegistrationById } from "../controllers/registration.controller.js";

const router = Router()

router.route("/register").post(verifyJWT, eventRegistration)
router.route("/registrations").get(getAllRegistration)
router.route("/registrations/:id").get(getRegistrationById)
router.route("/registration-delete/:id").delete(verifyJWT, deleteRegistrationById)

export default router