import {

  FaBell,

  FaBars

} from "react-icons/fa"

import {

  useNavigate

} from "react-router-dom"

import useAuthStore from "../store/authStore"

function Navbar({

  openMenu,

  setOpenMenu
}) {

  const { user } = useAuthStore()

  const navigate = useNavigate()

  return (

    <header className="mb-6">

      <div

        className="

          bg-[#0f172a]/70

          backdrop-blur-3xl

          border border-white/10

          rounded-[2rem]

          px-6 py-5

          shadow-[0_10px_60px_rgba(0,0,0,0.45)]

        "
      >

        <div className="flex items-center justify-between">

          {/* LEFT SIDE */}

          <div className="flex items-center gap-4">

            <button

              onClick={() =>

                setOpenMenu(!openMenu)
              }

              className="

                md:hidden

                w-11 h-11

                rounded-2xl

                bg-white/5

                border border-white/10

                flex items-center justify-center

                hover:bg-white/10

                transition duration-300

              "
            >

              <FaBars />

            </button>

            <div>

              <h1

                className="

                  text-4xl

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

              <p className="text-slate-400 text-sm mt-1">

                Welcome back to Connectify 🚀

              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">

            {/* NOTIFICATION */}

            <button

              onClick={() =>

                navigate("/notifications")
              }

              className="

                relative

                w-12 h-12

                rounded-2xl

                bg-white/5

                border border-white/10

                flex items-center justify-center

                hover:bg-white/10

                transition duration-300

              "
            >

              <FaBell className="text-lg" />

              <span

                className="

                  absolute top-2 right-2

                  w-2.5 h-2.5

                  bg-pink-500

                  rounded-full

                "
              ></span>

            </button>

            {/* USER CARD */}

            <div

              className="

                hidden md:flex

                items-center gap-4

                bg-white/5

                border border-white/10

                px-4 py-2

                rounded-2xl

                hover:bg-white/[0.08]

                transition duration-300

              "
            >

              {
                user?.profileImageurl ? (

                  <img

                    src={user.profileImageurl}

                    alt="profile"

                    className="

                      w-12 h-12

                      rounded-full

                      object-cover

                      border-2 border-indigo-500

                    "
                  />

                ) : (

                  <div

                    className="

                      w-12 h-12

                      rounded-full

                      bg-gradient-to-br

                      from-indigo-500

                      to-pink-500

                      flex items-center justify-center

                      font-bold text-lg

                    "
                  >

                    {
                      user?.firstname?.charAt(0)
                    }

                  </div>
                )
              }

              <div>

                <p className="font-semibold text-white">

                  {user?.firstname}

                </p>

                <p className="text-xs text-slate-400">

                  Full Stack Developer

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  )
}

export default Navbar