import exp from "express"

import mongoose from "mongoose"

import cookieParser from "cookie-parser"

import cors from "cors"

import { config } from "dotenv"

import { createServer } from "http"

import { Server } from "socket.io"

// import APIs

import { authapp } from "./api/auth_api.js"

import { userapp } from "./api/user_api.js"

import { postapp } from "./api/post_api.js"

import { notificationapp } from "./api/notification_api.js"

import { requestapp } from "./api/request_api.js"

import { messageapp } from "./api/message_api.js"

import chatbotRoutes from "./api/chatbot_api.js"

import adminroute from "./api/admin_api.js"

const app = exp()

config()

// MIDDLEWARE

app.use(exp.json())

app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://social-media-clone-connectify.vercel.app",
  "https://socialmedia-clone-connectify.onrender.com",
  "https://social-media-clone-6yorg3rbz-cognitiveking2007s-projects.vercel.app"
];

app.use(cors({

  origin: allowedOrigins,

  credentials: true
}))

app.use(

  "/uploads",

  exp.static("uploads")
)

// DATABASE CONNECTION

mongoose.connect(process.env.DB_URL)

  .then(() => {

    console.log("DB connected successfully")
  })

  .catch((err) => {

    console.log(

      "DB connection error:",

      err.message
    )
  })

// ROOT ROUTE

app.get("/", (req, res) => {

  res.send("Server is running")

})

// ROUTES

app.use("/auth-api", authapp)

app.use("/user-api", userapp)

app.use("/post-api", postapp)

app.use("/notifications-api", notificationapp)

app.use("/request-api", requestapp)

app.use("/chatbot-api", chatbotRoutes)

app.use("/message-api", messageapp)

app.use("/admin-api", adminroute)

// SOCKET SERVER

const httpServer = createServer(app)

const io = new Server(httpServer, {

  cors: {

    origin: allowedOrigins,

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
  }
})

io.on("connection", (socket) => {

  console.log(

    "User connected:",

    socket.id
  )

  socket.on(

    "send_message",

    (data) => {

      socket.broadcast.emit(

        "receive_message",

        data
      )
    }
  )

  socket.on("disconnect", () => {

    console.log(

      "User disconnected"
    )
  })
})

// SERVER START

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`
  )
})
