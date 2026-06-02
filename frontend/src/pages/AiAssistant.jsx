import { useState } from "react"

import RootLayout from "../components/RootLayout"

import api from "../services/api"

function AiAssistant() {

  const [message, setMessage] = useState("")

  const [reply, setReply] = useState("")

  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {

    if (!message.trim()) return

    try {

      setLoading(true)

      const response = await api.post(

        "/chatbot-api/chat",

        { message }
      )

      setReply(response.data.reply)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">

          <h1 className="text-4xl font-bold text-indigo-400 mb-8">

            AI Assistant 🤖

          </h1>

          <textarea

            value={message}

            onChange={(e) => setMessage(e.target.value)}

            placeholder="Ask coding doubts, project ideas, debugging help..."

            className="w-full h-40 bg-slate-900/70 border border-white/10 p-5 rounded-2xl outline-none resize-none text-lg"
          />

          <button

            onClick={handleAsk}

            disabled={loading}

            className="mt-6 bg-indigo-500 px-8 py-4 rounded-2xl hover:bg-indigo-600 transition duration-300 hover:scale-105 disabled:opacity-50"
          >

            {
              loading

                ? "Thinking..."

                : "Send "
            }

          </button>

          {
            reply && (

              <div className="bg-slate-900/70 border border-white/10 p-6 rounded-2xl mt-8">

                <h2 className="text-2xl font-bold text-pink-400 mb-4">

                  AI Reply ✨

                </h2>

                <p className="text-slate-300 whitespace-pre-wrap leading-8 text-lg">

                  {reply}

                </p>

              </div>
            )
          }

        </div>

      </div>

    </RootLayout>
  )
}

export default AiAssistant