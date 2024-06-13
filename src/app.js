import express from "express"
import CookieParser from "cookieparser"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(CookieParser())

export { app }