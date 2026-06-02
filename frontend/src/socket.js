import { io } from "socket.io-client"

const socket = io(

  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://socialmedia-clone-connectify.onrender.com"
)

export default socket