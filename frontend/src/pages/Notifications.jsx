import { useEffect, useState } from "react"

import RootLayout from "../components/RootLayout"

import {

  getNotifications,

  markAsRead

} from "../services/notificationService"

function Notifications() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {

    fetchNotifications()

  }, [])

  const fetchNotifications = async () => {

    try {

      const data = await getNotifications()

      // only unread notifications

      const unreadNotifications = data.filter(

        (item) => item.isread === false
      )

      setNotifications(unreadNotifications)

    } catch (err) {

      console.log(err)
    }
  }

  // MARK AS READ + REMOVE

  const handleMarkAsRead = async (id) => {

    try {

      await markAsRead(id)

      setNotifications((prev) =>

        prev.filter(

          (item) => item._id !== id
        )
      )

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-indigo-400">

          Notifications 

        </h1>

        {
          notifications.length === 0 ? (

            <div className="bg-slate-800/70 border border-white/10 p-12 rounded-3xl text-center shadow-xl">

              <h2 className="text-3xl font-bold text-indigo-400">

                No Notifications !!

              </h2>

              <p className="text-slate-400 mt-4 text-lg">

                Likes, comments, follows and updates will appear here.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {
                notifications.map((item) => (

                  <div

                    key={item._id}

                    className="p-6 rounded-3xl border border-indigo-500/40 bg-indigo-900/50 transition duration-300 shadow-lg"
                  >

                    <div className="flex items-start justify-between gap-4">

                      {/* LEFT */}

                      <div className="flex items-start gap-4">

                        {
                          item.sender?.profileImageurl ? (

                            <img

                              src={item.sender.profileImageurl}

                              alt="profile"

                              className="w-14 h-14 rounded-full object-cover"
                            />

                          ) : (

                            <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">

                              {
                                item.sender?.firstname?.charAt(0)
                              }

                            </div>
                          )
                        }

                        <div>

                          <p className="text-lg leading-relaxed">

                            <span className="font-bold text-indigo-300">

                              {item.sender?.firstname}

                              {" "}

                              {item.sender?.lastname}

                            </span>

                            {" "}

                            {item.message}

                          </p>

                          <p className="text-sm text-slate-400 mt-2">

                            {
                              new Date(

                                item.createdAt
                              ).toLocaleString()
                            }

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <button

                        onClick={() =>

                          handleMarkAsRead(

                            item._id
                          )
                        }

                        className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-xl transition duration-300 whitespace-nowrap"
                      >

                        Mark as Read

                      </button>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </RootLayout>
  )
}

export default Notifications