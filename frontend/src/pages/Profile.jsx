import { useEffect, useState } from "react"

import RootLayout from "../components/RootLayout"

import ProfileCard from "../components/ProfileCard"

import Feed from "../components/Feed"

import CreatePost from "../components/CreatePost"

import {

  getMyProfile,

  togglePrivacy

} from "../services/userService"

import { getPosts } from "../services/postService"

function Profile() {

  const [user, setUser] = useState(null)

  const [myposts, setMyPosts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchProfile()

  }, [])

  useEffect(() => {

    if (user) {

      fetchPosts()
    }

  }, [user])

  const fetchProfile = async () => {

    try {

      const data = await getMyProfile()

      setUser(data)

    } catch (err) {

      console.log(err)
    }
  }

const fetchPosts = async () => {

  try {

    setLoading(true)

    const data = await getPosts()

    const filtered = data

      .filter(

        (post) => post.user?._id === user?._id
      )

      .sort(

        (a, b) =>

          new Date(b.createdAt) -

          new Date(a.createdAt)
      )

    setMyPosts(filtered)

  } catch (err) {

    console.log(err)

  } finally {

    setLoading(false)
  }
}

  const handlePrivacy = async () => {

    try {

      await togglePrivacy()

      fetchProfile()

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-4xl mx-auto">

        <ProfileCard user={user} />

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

          <button

            onClick={handlePrivacy}

            className={`

              px-6 py-3 rounded-2xl transition duration-300

              ${user?.isPrivate

                ? "bg-red-500 hover:bg-red-600"

                : "bg-green-500 hover:bg-green-600"
              }

            `}
          >

            {

              user?.isPrivate

                ? "Private Account 🔒"

                : "Public Account 🌍"
            }

          </button>

        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl mb-8 shadow-xl">

          <h2 className="text-3xl font-bold text-indigo-400 mb-6">

            Create Post 

          </h2>

<CreatePost

  fetchPosts={() => {

    fetchProfile()

    fetchPosts()
  }}
/>
        </div>

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-indigo-400">

            My Posts 

          </h2>

        </div>

        {

          loading

            ? (

              <p className="text-slate-400">

                Loading posts...
              </p>
            )

            : (

              <Feed

                posts={myposts}

                fetchPosts={fetchPosts}
              />
            )
        }

      </div>

    </RootLayout>
  )
}

export default Profile