import express from "express"
import cors from "cors"
import CookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(CookieParser())

// routes import
import userRouter from "./routes/user.routes.js"
import eventRouter from "./routes/event.routes.js"
import registrationRouter from "./routes/registration.routes.js"

// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/event", eventRouter)
app.use("/api/v1/registration", registrationRouter)

export { app }