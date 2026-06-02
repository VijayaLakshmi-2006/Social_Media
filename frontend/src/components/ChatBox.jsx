import { useState } from "react"

function ChatBox() {

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([

    {
      id: 1,
      sender: "Akhil",
      text: "Hey! Interested in collaborating on an AI project?"
    },

    {
      id: 2,
      sender: "You",
      text: "Absolutely! Let's discuss the idea 🚀"
    }

  ])

  const sendMessage = () => {

    if (!message.trim()) return

    setMessages([

      ...messages,

      {
        id: Date.now(),
        sender: "You",
        text: message
      }
    ])

    setMessage("")
  }

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl mb-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-6 text-indigo-400">

        Team Chat 💬

      </h2>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">

        {
          messages.map((msg) => (

            <div

              key={msg.id}

              className={`

                p-4 rounded-2xl max-w-[80%]

                ${msg.sender === "You"

                  ? "bg-indigo-500 ml-auto"

                  : "bg-slate-800"

                }

              `}
            >

              <p className="font-bold mb-1">

                {msg.sender}

              </p>

              <p>

                {msg.text}

              </p>

            </div>
          ))
        }

      </div>

      <div className="flex gap-3 mt-6">

        <input

          type="text"

          placeholder="Type your message..."

          value={message}

          onChange={(e) => setMessage(e.target.value)}

          className="flex-1 bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none"
        />

        <button

          onClick={sendMessage}

          className="bg-indigo-500 px-6 rounded-xl transition duration-300 hover:scale-105 hover:bg-indigo-600"
        >

          Send

        </button>

      </div>

    </div>
  )
}

export default ChatBox