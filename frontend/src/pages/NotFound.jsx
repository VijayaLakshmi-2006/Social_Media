import { useNavigate } from "react-router-dom"

function NotFound() {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-8xl font-bold text-indigo-500">

        404

      </h1>

      <h2 className="text-3xl font-bold mt-4">

        Page Not Found 🌌

      </h2>

      <p className="text-slate-400 mt-4 text-center">

        The page you are looking for drifted into another galaxy.
      </p>

      <button

        onClick={() => navigate("/home")}

        className="mt-8 bg-indigo-500 px-6 py-3 rounded-xl hover:bg-indigo-600 transition"
      >

        Go Home

      </button>

    </div>
  )
}

export default NotFound