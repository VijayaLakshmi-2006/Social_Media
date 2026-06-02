import LoginForm from "../components/LoginForm"

function Login() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md">

        {/* BRANDING */}

        <div className="text-center mb-10">

          <h1

            className="

              text-6xl

              font-black

              tracking-tight

              bg-gradient-to-r

              from-indigo-300

              via-violet-300

              to-pink-300

              bg-clip-text

              text-transparent

            "
          >

            Connectify

          </h1>

          <p className="text-slate-400 mt-3 text-lg">

            Connect • Create • Collaborate 🚀

          </p>

        </div>

        {/* FORM */}

        <LoginForm />

      </div>

    </div>
  )
}

export default Login