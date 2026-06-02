import { useEffect, useState } from "react"

import { useParams, useNavigate } from "react-router-dom"

import RootLayout from "../components/RootLayout"

import Loader from "../components/Loader"

import Feed from "../components/Feed"

import {
  followUser,
  getUserById
} from "../services/userService"

import {
  getPosts
} from "../services/postService"

function UserProfile() {

  const { id } = useParams()

  const navigate = useNavigate()

  const loggedUser = JSON.parse(

    localStorage.getItem("user")
  )

  const [user, setUser] = useState(null)

  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {

    fetchUser()

  }, [id])

  const fetchUser = async () => {

    try {

      setLoading(true)

      const userdata = await getUserById(id)

      setUser(userdata)

      // already following

      if (

        userdata?.followers?.includes(
          loggedUser?._id
        )
      ) {

        setIsFollowing(true)

      } else {

        setIsFollowing(false)
      }

      // user posts

      const allposts = await getPosts()

      const filteredposts = allposts

        .filter(
          (post) => post.user?._id === id
        )

        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )

      setPosts(filteredposts)

    } catch (err) {

      console.log(

        err.response?.data || err
      )

    } finally {

      setLoading(false)
    }
  }

  const handleFollow = async () => {

    try {

      if (!user) return

      const response = await followUser(
        user._id
      )

      console.log(response)

      // FOLLOW

      if (

        response.message ===
        "followed successfully"
      ) {

        setIsFollowing(true)
      }

      // UNFOLLOW

      else if (

        response.message ===
        "unfollowed successfully"
      ) {

        setIsFollowing(false)
      }

      fetchUser()

    } catch (err) {

      console.log(

        err.response?.data || err
      )
    }
  }

  if (loading) {

    return <Loader />
  }

  return (

    <RootLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">

          <div className="flex flex-col items-center text-center">

            {
              user?.profileImageurl ? (

                <img
                  src={user.profileImageurl}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />

              ) : (

                <div className="w-32 h-32 rounded-full bg-indigo-500 flex items-center justify-center text-5xl font-bold">

                  {
                    user?.firstname?.charAt(0)
                  }

                </div>
              )
            }

            <h1 className="text-4xl font-bold mt-6">

              {user?.firstname}

              {" "}

              {user?.lastname}

            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-2xl">

              {
                user?.bio ||

                "Passionate developer building innovative projects."
              }

            </p>

            <div className="flex gap-8 mt-6">

              <div>

                <p className="text-2xl font-bold text-indigo-400">

                  {user?.followers?.length || 0}

                </p>

                <p className="text-slate-400">

                  Followers

                </p>

              </div>

              <div>

                <p className="text-2xl font-bold text-pink-400">

                  {user?.following?.length || 0}

                </p>

                <p className="text-slate-400">

                  Following

                </p>

              </div>

            </div>

            <div className="flex gap-4 mt-8 flex-wrap justify-center">

              {
                loggedUser?._id !== id && (

                  <button

                    onClick={handleFollow}

                    className={`

                      px-8 py-3 rounded-2xl transition duration-300 hover:scale-105

                      ${isFollowing

                        ? "bg-green-500 hover:bg-red-500"

                        : "bg-indigo-500 hover:bg-indigo-600"
                      }

                    `}
                  >

                    {

                      isFollowing

                        ? "Unfollow ❌"

                        : "Follow 🚀"
                    }

                  </button>
                )
              }

              <button

                onClick={() => {

                  if (!user) return

                  navigate(
                    `/messages/${user._id}`
                  )
                }}

                className="bg-pink-500 px-8 py-3 rounded-2xl hover:bg-pink-600 transition duration-300 hover:scale-105"
              >

                Message 💬

              </button>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold text-indigo-400 mb-6">

            Posts 🚀

          </h2>

          <Feed posts={posts} />

        </div>

      </div>

    </RootLayout>
  )
}

export default UserProfile