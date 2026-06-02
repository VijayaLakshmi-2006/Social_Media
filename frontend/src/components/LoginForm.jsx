import { useState } from "react"

import { useNavigate } from "react-router-dom"

import useAuthStore from "../store/authStore"

import toast from "react-hot-toast"

import { loginUser } from "../services/authService"

import { Link } from "react-router-dom"

function LoginForm() {

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { setUser } = useAuthStore()

  const handleLogin = async () => {

    try {

      const data = await loginUser({

        email,
        password

      })

      setUser(data.payload)
localStorage.setItem(

  "user",

  JSON.stringify(data.payload)
)

localStorage.setItem(

  "token",

  data.token
)
      toast.success("Login successful 🚀")

      if (data.payload?.role?.toLowerCase() === "admin") {
        navigate("/admin")
      } else {
        navigate("/home")
      }

    } catch (err) {

  console.log(

    err.response?.data ||

    err
  )

  toast.error(

    err.response?.data?.message ||

    "Invalid credentials"
  )
}
  }

  return (

    <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">

      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">

        Login

      </h1>

      <div className="space-y-4">

        <input

          type="email"

          placeholder="Enter email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <input

          type="password"

          placeholder="Enter password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <button

          onClick={handleLogin}

          className="w-full bg-indigo-500 p-3 rounded-lg hover:bg-indigo-600 transition"
        >

          Login

        </button>
<p className="text-center text-slate-400 mt-5">

  Don't have an account?

  <Link

    to="/signup"

    className="text-indigo-400 ml-2 hover:underline"
  >

    Signup

  </Link>

</p>
      </div>

    </div>
  )
}

export default LoginForm