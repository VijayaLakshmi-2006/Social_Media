import {

  useState,

  useEffect,

  useRef

} from "react"

import {

  useParams,

  useNavigate

} from "react-router-dom"

import RootLayout from "../components/RootLayout"

import {

  sendMessage,

  getMessages,

  getUserById,

  getConversations

} from "../services/userService"

import socket from "../socket"

import toast from "react-hot-toast"

function Messages() {

  const { id } = useParams()

  const navigate = useNavigate()

  const loggedUser = JSON.parse(

    localStorage.getItem("user")
  )

  const [text, setText] = useState("")

  const [messages, setMessages] = useState([])

  const [chatUser, setChatUser] = useState(null)

  const [conversations, setConversations] = useState([])

  const messagesEndRef = useRef(null)

  // FETCH CONVERSATIONS

  useEffect(() => {

    fetchConversations()

  }, [])

  // FETCH CHAT + MESSAGES

  useEffect(() => {

    if (id) {

      fetchMessages()

      fetchChatUser()

      fetchConversations()
    }

  }, [id])

  // SOCKET LISTENER

  useEffect(() => {

    socket.off("receive_message")

    socket.on(

      "receive_message",

      (data) => {

        setMessages((prev) => {

          const exists = prev.some(

            (msg) => msg._id === data._id
          )

          if (exists) return prev

          return [

            ...prev,

            data
          ]
        })

        fetchConversations()

        toast.success(

          "New message 💬"
        )
      }
    )

    return () => {

      socket.off("receive_message")
    }

  }, [])

  // AUTO SCROLL

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth"
    })

  }, [messages])

  // FETCH CONVERSATIONS

  const fetchConversations = async () => {

    try {

      const data = await getConversations()

      setConversations(data)

    } catch (err) {

      console.log(err)
    }
  }

  // FETCH CHAT USER

  const fetchChatUser = async () => {

    try {

      const data = await getUserById(id)

      setChatUser(data)

    } catch (err) {

      console.log(err)
    }
  }

  // FETCH MESSAGES

  const fetchMessages = async () => {

    try {

      const data = await getMessages(id)

      setMessages(data)

    } catch (err) {

      console.log(err)
    }
  }

  // SEND MESSAGE

  const handleSend = async () => {

    if (!text.trim()) return

    if (!id) {

      toast.error("Select a chat first")

      return
    }

    try {

      const messageData = {

        receiver: id,

        text
      }

      const response = await sendMessage(

        messageData
      )

      socket.emit(

        "send_message",

        response.payload
      )

      setText("")

      fetchMessages()

      fetchConversations()

    } catch (err) {

      console.log(err)

      toast.error(

        err.response?.data?.message || "Failed to send message"
      )
    }
  }

  return (

    <RootLayout>

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-12 gap-6 h-[85vh]">

          {/* LEFT SIDEBAR */}

          <div className="col-span-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 overflow-y-auto">

            <h1 className="text-2xl font-bold text-indigo-400 mb-6">

              Chats 💬

            </h1>

            <div className="space-y-3">

              {
                conversations.map((user) => (

                  <div

                    key={user._id}

                    onClick={() =>

                      navigate(

                        `/messages/${user._id}`
                      )
                    }

                    className={`

                      flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition duration-300

                      ${id === user._id

                        ? "bg-indigo-500"

                        : "bg-slate-900/70 hover:bg-slate-800"
                      }

                    `}
                  >

                    {
                      user?.profileImageurl ? (

                        <img

                          src={user.profileImageurl}

                          alt="profile"

                          className="w-12 h-12 rounded-full object-cover"
                        />

                      ) : (

                        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">

                          {
                            user?.firstname?.charAt(0)
                          }

                        </div>
                      )
                    }

                    <div className="flex-1 flex items-center justify-between">

                      <p className="font-semibold">

                        {user.firstname}

                        {" "}

                        {user.lastname}

                      </p>

                      {
                        user.unreadCount > 0 && (

                          <div className="bg-pink-500 text-white text-xs font-bold min-w-[22px] h-[22px] rounded-full flex items-center justify-center">

                            {user.unreadCount}

                          </div>
                        )
                      }

                    </div>

                  </div>
                ))
              }

            </div>

          </div>

          {/* RIGHT CHAT */}

          <div className="col-span-9 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">

            {/* HEADER */}

            <div className="border-b border-white/10 p-5 flex items-center gap-4">

              {
                chatUser?.profileImageurl ? (

                  <img

                    src={chatUser.profileImageurl}

                    alt="profile"

                    className="w-14 h-14 rounded-full object-cover"
                  />

                ) : (

                  <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">

                    {
                      chatUser?.firstname?.charAt(0)
                    }

                  </div>
                )
              }

              <div>

                <h1 className="text-2xl font-bold text-indigo-400">

                  {chatUser?.firstname}

                  {" "}

                  {chatUser?.lastname}

                </h1>

                <p className="text-green-400 text-sm">

                  Active now
                </p>

              </div>

            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {
                messages.map((msg, index) => {

                  const isMe =

                    msg.sender === loggedUser._id ||

                    msg.sender?._id === loggedUser._id

                  return (

                    <div

                      key={index}

                      className={`

                        flex

                        ${isMe

                          ? "justify-end"

                          : "justify-start"
                        }

                      `}
                    >

                      <div

                        className={`

                          max-w-[70%]

                          px-5 py-3 rounded-2xl

                          ${isMe

                            ? "bg-indigo-500 text-white"

                            : "bg-slate-800 text-slate-200"
                          }

                        `}
                      >

                        {msg.text}

                      </div>

                    </div>
                  )
                })
              }

              <div ref={messagesEndRef}></div>

            </div>

            {/* INPUT */}

            <div className="border-t border-white/10 p-5 flex gap-3">

              <input

                type="text"

                placeholder="Type message..."

                value={text}

                onChange={(e) =>

                  setText(e.target.value)
                }

                className="flex-1 bg-slate-900/70 border border-white/10 p-4 rounded-2xl outline-none"
              />

              <button

                onClick={handleSend}

                className="bg-indigo-500 px-8 rounded-2xl hover:bg-indigo-600 transition duration-300"
              >

                Send 🚀

              </button>

            </div>

          </div>

        </div>

      </div>

    </RootLayout>
  )
}

export default Messages