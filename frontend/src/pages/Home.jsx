import { useEffect, useState } from "react"

import Loader from "../components/Loader"

import RootLayout from "../components/RootLayout"

import Feed from "../components/Feed"

import TrendingUsers from "../components/TrendingUsers"

import { getMyProfile } from "../services/userService"

import { getPosts } from "../services/postService"

import useAuthStore from "../store/authStore"

function Home() {

  const { user } = useAuthStore()

  const [loading, setLoading] = useState(true)

  const [posts, setPosts] = useState([])

  const [profile, setProfile] = useState(null)

  useEffect(() => {

    fetchProfile()

    fetchPosts()

  }, [])

  const fetchPosts = async () => {

    try {

      setLoading(true)

      const data = await getPosts()

      const filtered = data

  .filter(

    (post) => post.user?._id !== user?._id
  )

  .sort(

    (a, b) =>

      new Date(b.createdAt) -

      new Date(a.createdAt)
  )

setPosts(filtered)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  const fetchProfile = async () => {

    try {

      const data = await getMyProfile()

      setProfile(data)

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl mb-8 shadow-2xl">

          <h1 className="text-4xl font-bold">

            Welcome back,

            {" "}

            {user?.firstname} 🚀

          </h1>

          <p className="mt-4 text-lg text-slate-200">

            Collaborate, build projects, connect with developers and grow your network.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition duration-300">

            <h2 className="text-slate-400">

              Total Posts

            </h2>

            <p className="text-4xl font-bold mt-3 text-indigo-400">

              {posts.length}

            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-pink-500/20 transition duration-300">

            <h2 className="text-slate-400">

              Connections

            </h2>

            <p className="text-4xl font-bold mt-3 text-pink-400">

              {profile?.followers?.length || 0}

            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-green-500/20 transition duration-300">

            <h2 className="text-slate-400">

              Follow Requests

            </h2>

            <p className="text-4xl font-bold mt-3 text-green-400">

              {profile?.followRequests?.length || 0}

            </p>

          </div>

        </div>

        <div className="mb-8">

          <TrendingUsers />

        </div>

        <div className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-white/10 backdrop-blur-xl p-8 rounded-3xl mb-8 shadow-2xl">

          <p className="text-pink-400 font-bold mb-3">

            🚀 Featured Innovation

          </p>

          <h2 className="text-3xl font-bold">

            AI Powered Student Collaboration Platform

          </h2>

          <p className="mt-4 text-slate-300 text-lg">

            Connect developers, discover teammates, build projects together and collaborate using AI-enhanced networking tools.
          </p>

        </div>

        <h2 className="text-3xl font-bold mb-6 text-indigo-400">

          Community Feed 🌍

        </h2>

        {
          loading

            ? <Loader />

            : <Feed
                posts={posts}
                fetchPosts={fetchPosts}
              />
        }

      </div>

    </RootLayout>
  )
}

export default Home