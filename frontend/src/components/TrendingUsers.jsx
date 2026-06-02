import { useEffect, useState } from "react"
import { getAllUsers } from "../services/userService"
import { useNavigate } from "react-router-dom"

import { searchUsers } from "../services/userService"

function TrendingUsers() {

  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {

    try {

const data = await getAllUsers()
      setUsers(data.slice(0, 5))

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">

      <h2 className="text-2xl font-bold mb-5 text-indigo-400">

        Trending Developers 🔥

      </h2>

      <div className="space-y-4">

        {
          users.map((user) => (

            <div

              key={user._id}

              onClick={() => navigate(`/user/${user._id}`)}

              className="flex items-center gap-4 p-3 hover:bg-slate-700 rounded-xl cursor-pointer transition duration-300"
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
                      user.firstname?.charAt(0)
                    }

                  </div>
                )
              }

              <div>

                <h3 className="font-bold">

                  {user.firstname}

                  {" "}

                  {user.lastname}

                </h3>

                <p className="text-sm text-slate-400">

                  {user.bio || "Developer"}
                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default TrendingUsers