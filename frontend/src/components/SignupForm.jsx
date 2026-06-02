import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

import api from "../services/api"

function SignupForm() {

  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")

  const [lastname, setLastname] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    try {

      await api.post(

        "/auth-api/register",

        {
          firstname,
          lastname,
          email,
          password
        }
      )

      toast.success(

        "Account created 🚀"
      )

      navigate("/")

    } catch (err) {

console.log(

  err.response?.data ||

  err.message
)
      toast.error(

  err.response?.data?.message ||

  "Signup failed"
)
    }
  }

  return (

    <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">

      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">

        Signup

      </h1>

      <div className="space-y-4">

        <input

          type="text"

          placeholder="First name"

          value={firstname}

          onChange={(e) =>

            setFirstname(e.target.value)
          }

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <input

          type="text"

          placeholder="Last name"

          value={lastname}

          onChange={(e) =>

            setLastname(e.target.value)
          }

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <input

          type="email"

          placeholder="Enter email"

          value={email}

          onChange={(e) =>

            setEmail(e.target.value)
          }

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <input

          type="password"

          placeholder="Enter password"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)
          }

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <button

          onClick={handleSignup}

          className="w-full bg-indigo-500 p-3 rounded-lg hover:bg-indigo-600 transition"
        >

          Signup

        </button>

        <p className="text-center text-slate-400 mt-5">

          Already have an account?

          <Link

            to="/"

            className="text-indigo-400 ml-2 hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  )
}

export default SignupForm