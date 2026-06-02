import {

  FaHome,

  FaUser,

  FaBell,

  FaEnvelope,

  FaUsers,

  FaUserShield,

  FaRobot,

  FaUserEdit,

  FaCompass,

  FaSignOutAlt,

  FaTimes

} from "react-icons/fa"

import {

  NavLink,

  useNavigate

} from "react-router-dom"

import useAuthStore from "../store/authStore"
function Sidebar({

  openMenu,

  setOpenMenu
}) {

  const navigate = useNavigate()

  const { setUser } = useAuthStore()

  const user = JSON.parse(

    localStorage.getItem("user")
  )

  const menus = [

    {

      name: "Home",

      path: "/home",

      icon: <FaHome />
    },

    {

      name: "Explore",

      path: "/explore",

      icon: <FaCompass />
    },

    {

      name: "Messages",

      path: "/messages",

      icon: <FaEnvelope />
    },

    {

      name: "Notifications",

      path: "/notifications",

      icon: <FaBell />
    },

    {

      name: "Requests",

      path: "/requests",

      icon: <FaUsers />
    },

    {

      name: "Profile",

      path: "/profile",

      icon: <FaUser />
    },

    {

      name: "Edit Profile",

      path: "/edit-profile",

      icon: <FaUserEdit />
    },

    {

      name: "AI Assistant",

      path: "/ai",

      icon: <FaRobot />
    }

  ]

  if (user?.role?.toLowerCase() === "admin") {
    menus.push({
      name: "Admin",
      path: "/admin",
      icon: <FaUserShield />
    })
  }

  const handleLogout = () => {

    localStorage.clear()

    setUser(null)

    navigate("/")
  }

  return (

    <>

      {

        openMenu && (

          <div

            onClick={() =>

              setOpenMenu(false)
            }

            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          ></div>
        )
      }

      <aside

        className={`

          fixed top-0 left-0 h-screen w-72 z-50

          bg-[#0f172a]/75

          backdrop-blur-3xl

          border-r border-white/10

          flex flex-col justify-between

          transition-transform duration-300

          overflow-hidden

          ${openMenu

            ? "translate-x-0"

            : "-translate-x-full md:translate-x-0"
          }

        `}
      >

        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* PROFILE */}

          <div className="p-6 border-b border-white/10">

            <div className="flex items-center gap-4">

              {
                user?.profileImageurl ? (

                  <img

                    src={user.profileImageurl}

                    alt="profile"

                    className="

                      w-16 h-16

                      rounded-full

                      object-cover

                      border-2 border-indigo-500

                    "
                  />

                ) : (

                  <div

                    className="

                      w-16 h-16

                      rounded-full

                      bg-gradient-to-br

                      from-indigo-500

                      to-pink-500

                      flex items-center justify-center

                      text-2xl font-bold

                    "
                  >

                    {
                      user?.firstname?.charAt(0)
                    }

                  </div>
                )
              }

              <div>

                <h2 className="font-bold text-2xl">

                  {user?.firstname}

                </h2>

                <p className="text-slate-400">

                  Full Stack Developer

                </p>

              </div>

            </div>

          </div>

          {/* MENUS */}

          <div className="p-4 space-y-2">

            {
              menus.map((menu, index) => (

                <NavLink

                  to={menu.path}

                  key={index}

                  className={({ isActive }) =>

                    `

                      flex items-center gap-4

                      px-5 py-4

                      rounded-2xl

                      transition duration-300

                      font-medium

                      ${isActive

                        ? "bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/20"

                        : "hover:bg-white/5"
                      }

                    `
                  }
                >

                  <span className="text-indigo-300 text-lg">

                    {menu.icon}

                  </span>

                  {menu.name}

                </NavLink>
              ))
            }

          </div>

        </div>

        {/* LOGOUT */}

        <div className="p-5 border-t border-white/10">

          <button

            onClick={handleLogout}

            className="

              w-full

              bg-gradient-to-r

              from-red-500

              to-pink-500

              hover:from-red-600

              hover:to-pink-600

              transition duration-300

              p-4

              rounded-2xl

              flex items-center justify-center gap-3

              font-semibold

              text-white

            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>
  )
}

export default Sidebar