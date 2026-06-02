import { useEffect, useState } from "react"

import RootLayout from "../components/RootLayout"

import { getAllUsers, deleteUser } from "../services/userService"

import { getAllPosts } from "../services/postService"

import { useNavigate } from "react-router-dom"

function Admin() {

  const [users, setUsers] = useState([])

  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const userStr = localStorage.getItem("user")
    if (userStr) {
      const userObj = JSON.parse(userStr)
      if (userObj.role?.toLowerCase() !== "admin") {
        navigate("/")
        return
      }
    } else {
      navigate("/")
      return
    }

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const usersData = await getAllUsers()

      const postsData = await getAllPosts()

      setUsers(usersData)

      setPosts(postsData)

    } catch (err) {

      console.log(err)
    }
  }

  const handleDelete = async (userid) => {

    try {
      await deleteUser(userid)

      const filteredUsers = users.filter(

        (user) => user._id !== userid
      )

      setUsers(filteredUsers)

    } catch (err) {
      console.log(err)
      alert("Failed to delete user.")
    }
  }

  return (

    <RootLayout>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-indigo-400">

            Admin Dashboard 👑

          </h1>

          <p className="text-slate-400 mt-3 text-lg">

            Manage developers and platform activity.

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {/* TOTAL USERS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

            <h2 className="text-slate-400 text-lg">

              Total Users

            </h2>

            <p className="text-5xl font-bold text-indigo-400 mt-4">

              {users.length}

            </p>

          </div>

          {/* TOTAL POSTS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

            <h2 className="text-slate-400 text-lg">

              Total Posts

            </h2>

            <p className="text-5xl font-bold text-pink-400 mt-4">

              {posts.length}

            </p>

          </div>

          {/* ACTIVE USERS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

            <h2 className="text-slate-400 text-lg">

              Active Developers

            </h2>

            <p className="text-5xl font-bold text-cyan-400 mt-4">

              {users.length}

            </p>

          </div>

          {/* STATUS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

            <h2 className="text-slate-400 text-lg">

              Platform Status

            </h2>

            <p className="text-3xl font-bold text-green-400 mt-6">

              Running 

            </p>

          </div>

        </div>

        {/* POSTS INFO */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl mb-10">

          <h2 className="text-3xl font-bold text-pink-400 mb-8">

            Recent Posts 📝

          </h2>

          {
            posts.length === 0 ? (

              <p className="text-slate-400">

                No posts available.

              </p>

            ) : (

              <div className="space-y-4">

                {
  posts.slice(0, 5).map((post) => (

    <div

      key={post._id}

      className="bg-slate-900/70 border border-white/10 rounded-2xl p-5"
    >

      <h3 className="text-xl font-bold text-white">

        {
          post.content ||
          "New Developer Post 🚀"
        }

      </h3>

      {
        post.image && (

          <img

            src={post.image}

            alt="post"

            className="mt-4 rounded-2xl max-h-72 object-cover"
          />
        )
      }

      <p className="text-indigo-400 mt-4">

        Posted by:

        {" "}

        {post.user?.firstname}

        {" "}

        {post.user?.lastname}

      </p>

      <div className="flex gap-6 mt-4 text-slate-400">

        <p>

          ❤️ {post.likes?.length || 0}

        </p>

        <p>

          💬 {post.replies?.length || 0}

        </p>

      </div>

    </div>
  ))
}
              </div>
            )
          }

        </div>

        {/* USERS */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-indigo-400 mb-8">

            Developers 👨‍💻

          </h2>

          {
            users.length === 0 ? (

              <div className="text-center py-12">

                <h3 className="text-2xl font-bold text-slate-400">

                  No Users Found

                </h3>

              </div>

            ) : (

              <div className="space-y-5">

                {
                  users.map((user) => (

                    <div

                      key={user._id}

                      className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-4">

                        {
                          user.profileImageurl ? (

                            <img

                              src={user.profileImageurl}

                              alt="profile"

                              className="w-16 h-16 rounded-full object-cover"
                            />

                          ) : (

                            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">

                              {
                                user.firstname?.charAt(0)
                              }

                            </div>
                          )
                        }

                        <div>

                          <h3 className="text-xl font-bold">

                            {user.firstname}

                            {" "}

                            {user.lastname}

                          </h3>

                          <p className="text-slate-400">

                            {user.email}

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <button

                        onClick={() =>

                          handleDelete(user._id)
                        }

                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition duration-300"
                      >

                        Remove

                      </button>

                    </div>
                  ))
                }

              </div>
            )
          }

        </div>

      </div>

    </RootLayout>
  )
}

export default Admin