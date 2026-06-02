import { useEffect, useState } from "react"

import RootLayout from "../components/RootLayout"

import {

  getFollowRequests,

  acceptFollowRequest,

  rejectFollowRequest

} from "../services/userService"

function Requests() {

  const [requests, setRequests] = useState([])

  useEffect(() => {

    fetchRequests()

  }, [])

  const fetchRequests = async () => {

    try {

      const data = await getFollowRequests()

      setRequests(data)

    } catch (err) {

      console.log(err)
    }
  }

  const handleAccept = async (id) => {

    try {

      await acceptFollowRequest(id)

      fetchRequests()

    } catch (err) {

      console.log(err)
    }
  }

  const handleReject = async (id) => {

    try {

      await rejectFollowRequest(id)

      fetchRequests()

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-2xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">

          <h1 className="text-3xl font-bold mb-8 text-indigo-400">

            Follow Requests

          </h1>

          <div className="space-y-5">

            {
              requests.map((user) => (

                <div

                  key={user._id}

                  className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl flex items-center justify-between"
                >

                  <div className="flex items-center gap-4">

                    {
                      user?.profileImageurl ? (

                        <img

                          src={user.profileImageurl}

                          alt="profile"

                          className="w-14 h-14 rounded-full object-cover"
                        />

                      ) : (

                        <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">

                          {
                            user.firstname?.charAt(0)
                          }

                        </div>
                      )
                    }

                    <div>

                      <h2 className="font-bold text-lg">

                        {user.firstname}

                        {" "}

                        {user.lastname}

                      </h2>

                      <p className="text-slate-400">

                        {user.bio}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <button

                      onClick={() => handleAccept(user._id)}

                      className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                    >

                      Accept

                    </button>

                    <button

                      onClick={() => handleReject(user._id)}

                      className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >

                      Reject

                    </button>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </RootLayout>
  )
}

export default Requests